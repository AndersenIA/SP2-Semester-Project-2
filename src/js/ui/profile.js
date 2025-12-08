import { getUser } from "../utils/storage.js";
import { API, API_KEY } from "../../../config.js";

export async function initProfilePage() {
  const params = new URLSearchParams(window.location.search);
  const profileId = params.get("id"); // ID from URL
  const loggedInUser = getUser();

  console.log("Profile ID from URL:", profileId);
  console.log("Logged-in user:", loggedInUser);

  if (!loggedInUser) {
    console.warn("No logged-in user. Cannot view profiles.");
    renderLoggedOutProfile();
    return;
  }

  let url;
  let isOwnProfile = false;
  const headers = {
    "X-Noroff-API-Key": API_KEY,
    Authorization: `Bearer ${loggedInUser.accessToken}`,
  };

  if (profileId) {
    url = `${API}/auction/profiles/${profileId}?_listings=true&_wins=true`;
    if (profileId === loggedInUser.name) isOwnProfile = true;
  } else {
    url = `${API}/auction/profiles/${loggedInUser.name}?_listings=true&_wins=true`;
    isOwnProfile = true;
  }

  try {
    console.log("Fetching profile from:", url);
    const response = await fetch(url, { headers });

    if (!response.ok) {
      console.error(
        "Failed to load profile:",
        response.status,
        response.statusText
      );
      renderLoggedOutProfile();
      return;
    }

    const { data } = await response.json();
    if (!data) {
      console.warn("No profile data returned.");
      renderLoggedOutProfile();
      return;
    }

    console.log("Profile data received:", data);

    renderProfileInfo(data, isOwnProfile);
    renderUserListings(data.listings || []);
    enableListingClicks();
  } catch (error) {
    console.error("Error loading profile:", error);
    renderLoggedOutProfile();
  }
}

function renderProfileInfo(profile, isOwnProfile = false) {
  const container =
    document.getElementById("profile-info") ||
    document.getElementById("profile-page");
  if (!container) return;

  container.innerHTML = `
    <div class="flex justify-between items-center px-5 md:px-24 lg:px-80 py-10 border-b-2 border-main">
      <div class="flex items-center p-2 border-2 border-main rounded-2xl">
        <img
          class="h-24 rounded-full border-2 border-main cursor-pointer mr-5"
          src="${profile.avatar?.url || "/img/default-avatar.jpg"}"
          alt="${profile.avatar?.alt || profile.name}"
        />
        <div>
          <h2 class="text-2xl">${profile.name}</h2>
          <p>${profile._count?.wins || 0} auctions won</p>
          <p>${profile._count?.listings || 0} listings</p>
        </div>
      </div>

      <div>
        ${
          isOwnProfile
            ? `<p class="cursor-pointer hover:underline">Edit profile</p>
               <p class="cursor-pointer hover:underline">Deposit</p>
               <p id="create-listing-profile-btn" class="cursor-pointer hover:underline">Create new listing</p>`
            : ""
        }
      </div>
    </div>
  `;
}

function renderUserListings(listings) {
  const container = document.getElementById("profile-listings");
  if (!container) return;

  if (!listings.length) {
    container.innerHTML = "<p>No listings yet.</p>";
    return;
  }

  container.innerHTML = listings
    .map((listing) => {
      const now = new Date();
      const endsAt = new Date(listing.endsAt);
      const diff = endsAt - now;
      const remaining =
        diff > 0
          ? `${Math.floor(diff / (1000 * 60 * 60))}h ${Math.floor(
              (diff / (1000 * 60)) % 60
            )}m left`
          : "Expired";

      return `
        <div data-id="${listing.id}"
          class="listing-card h-64 w-44 lg:h-96 lg:w-64 overflow-hidden border border-main rounded-3xl shadow-xl my-5 mx-12 md:mx-5 place-self-center transition-all duration-300 hover:-translate-y-5 hover:shadow-2xl cursor-pointer grid grid-rows-2"
        >
          <div class="pb-3 overflow-hidden">
            <img
              src="${
                listing.media?.[0]?.url || "./public/img/Placeholder-img.png"
              }"
              alt="${listing.media?.[0]?.alt || listing.title}"
            />
          </div>
          <div class="px-3 pt-5 flex flex-col justify-between">
            <h3 class="text-2xl">${listing.title}</h3>
            <div class="flex justify-between py-5">
              <p>Bids: ${listing._count?.bids || 0}</p>
              <h4>${remaining}</h4>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderLoggedOutProfile() {
  const container =
    document.getElementById("profile-info") ||
    document.getElementById("profile-page");
  if (!container) return;

  container.innerHTML = `
    <p class="text-center text-xl py-10">You need to log in to view this profile.</p>
  `;

  const listingsContainer = document.getElementById("profile-listings");
  if (listingsContainer) listingsContainer.innerHTML = "";
}

function enableListingClicks() {
  document.querySelectorAll(".listing-card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      if (!id) return;
      window.location.href = `/post/index.html?id=${id}`;
    });
  });
}
