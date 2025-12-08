import { API } from "../../../config";

// Get listing ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log("Listing ID from URL:", id);

if (!id) console.error("Missing listing ID");

// Elements
const image = document.getElementById("listing-main-image");
const title = document.getElementById("listing-title");
const remaining = document.getElementById("listing-remaining");
const price = document.getElementById("listing-price");

const sellerAvatar = document.getElementById("seller-avatar");
const sellerName = document.getElementById("seller-name");
const sellerAuctions = document.getElementById("seller-auctions");
const sellerListings = document.getElementById("seller-listings");
const sellerLink = document.getElementById("seller-profile-link");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log("DOM fully loaded, fetching listing...");
    const res = await fetch(`${API}/auction/listings/${id}?_seller=true`);
    const { data } = await res.json();
    console.log("Listing data received:", data);

    // Fill listing info
    title.textContent = data.title;
    image.src = data.media?.[0]?.url || "/public/img/Placeholder-img.png";

    const now = new Date();
    const ends = new Date(data.endsAt);
    const diff = ends - now;
    remaining.textContent =
      diff > 0
        ? `${Math.floor(diff / (1000 * 60 * 60))}h ${Math.floor(
            (diff / (1000 * 60)) % 60
          )}m remaining`
        : "Expired";

    const bids = data.bids || [];
    const highest = bids.length ? bids[bids.length - 1].amount : 0;
    price.textContent = `${highest} EUR`;

    // Seller info
    sellerAvatar.src = data.seller.avatar?.url || "/img/default.jpg";
    sellerName.textContent = data.seller.name;
    sellerAuctions.textContent = `${data.seller.wins || 0} auctions joined`;
    sellerListings.textContent = `${data.seller.listings || 0} listings`;

    console.log("Adding click listeners to seller elements...");

    const goToProfile = () => {
      const sellerNameId = data.seller.name;
      console.log("Go to profile clicked! Seller identifier:", sellerNameId);
      if (sellerNameId) {
        window.location.href = `/profile/index.html?id=${sellerNameId}`;
      } else {
        console.warn("Seller identifier is missing");
      }
    };

    // Add click listeners
    sellerLink.addEventListener("click", (e) => {
      e.preventDefault(); // prevent default #
      console.log("Seller link clicked");
      goToProfile();
    });

    sellerAvatar.addEventListener("click", () => {
      console.log("Seller avatar clicked");
      goToProfile();
    });

    sellerName.addEventListener("click", () => {
      console.log("Seller name clicked");
      goToProfile();
    });

    console.log("All event listeners attached!");
  } catch (err) {
    console.error(err);
  }
});
