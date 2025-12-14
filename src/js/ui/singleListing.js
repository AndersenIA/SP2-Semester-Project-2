import { API } from "../../../config.js";
import { openBidModal } from "./modals/bidModal.js";
import { getUser } from "../utils/storage.js";
import { openEditListingModal } from "./modals/editListingModal.js";

export async function initPostPage() {
  // Get listing ID from URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const loggedInUser = getUser();

  if (!id) {
    console.error("Missing listing ID");
    return;
  }

  // Elements
  const image = document.getElementById("listing-main-image");
  const title = document.getElementById("listing-title");
  const remaining = document.getElementById("listing-remaining");
  const price = document.getElementById("listing-price");
  const mainTitle = document.getElementById("listing-main-title");
  const mainDesc = document.getElementById("listing-main-desc");
  const mainTags = document.getElementById("listing-main-tags");

  const sellerAvatar = document.getElementById("seller-avatar");
  const sellerName = document.getElementById("seller-name");
  const sellerAuctions = document.getElementById("seller-auctions");
  const sellerListings = document.getElementById("seller-listings");
  const sellerLink = document.getElementById("seller-profile-link");

  // Initialize the bid modal AFTER the button exists
  openBidModal(id);

  try {
    const res = await fetch(
      `${API}/auction/listings/${id}?_seller=true&_bids=true`
    );
    const { data } = await res.json();

    const placeBidBtn = document.getElementById("place-bid-btn");

    // If user owns this listing → show EDIT instead
    if (loggedInUser && loggedInUser.name === data.seller.name) {
      placeBidBtn.textContent = "Edit listing";

      // Remove bid modal click (if added)
      placeBidBtn.replaceWith(placeBidBtn.cloneNode(true));
      const editBtn = document.getElementById("place-bid-btn");

      editBtn.addEventListener("click", () => {
        openEditListingModal(data);
      });
    } else {
      // Normal bid button behaviour
      placeBidBtn.addEventListener("click", () => openBidModal(id));
    }

    // Fill listing info
    title.textContent = data.title;
    image.src = data.media?.[0]?.url || "/public/img/Placeholder-img.png";

    mainTitle.textContent = data.title;
    mainDesc.textContent = data.description || "No description provided.";

    if (data.tags && data.tags.length > 0) {
      mainTags.textContent = data.tags.join(", ");
    } else {
      mainTags.textContent = "No tags";
    }

    const now = new Date();
    const ends = new Date(data.endsAt);
    const diff = ends - now;
    remaining.textContent =
      diff > 0
        ? `${Math.floor(diff / (1000 * 60 * 60))}h ${Math.floor(
            (diff / (1000 * 60)) % 60
          )}m remaining`
        : "Expired";

    // Highest bid
    const bids = data.bids || [];
    const highest = bids.length ? bids[bids.length - 1].amount : 0;
    price.textContent = `${highest} EUR`;
    document.getElementById("current-bid").textContent = `${highest} EUR`;

    // Render bid history
    const bidHistoryContainer = document.getElementById("bid-history");
    bidHistoryContainer.innerHTML = bids.length
      ? [...bids]
          .reverse()
          .map((bid) => {
            const bidder = bid.bidder?.name || "Unknown";
            const date = new Date(bid.created).toLocaleString();
            return `<div class="flex justify-between px-3 py-2 border-b border-gray-200">
                    <span><strong>${bid.amount} EUR</strong> by ${bidder}</span>
                    <span class="text-sm text-gray-500">${date}</span>
                  </div>`;
          })
          .join("")
      : `<p class="p-3 text-gray-500">No bids yet</p>`;

    // Seller info
    sellerAvatar.src = data.seller.avatar?.url || "/img/default.jpg";
    sellerName.textContent = data.seller.name;
    sellerAuctions.textContent = `${data.seller.wins || 0} auctions joined`;
    sellerListings.textContent = `${data.seller.listings || 0} listings`;

    const goToProfile = () => {
      const sellerNameId = data.seller.name;
      if (sellerNameId) window.location.href = `/profile?id=${sellerNameId}`;
    };

    [sellerLink, sellerAvatar, sellerName].forEach((el) =>
      el.addEventListener("click", (e) => {
        e.preventDefault();
        goToProfile();
      })
    );
  } catch (err) {
    console.error(err);
  }
}
