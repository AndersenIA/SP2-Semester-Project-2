import { getUser } from "../utils/storage.js";
import { API, API_KEY } from "../../../config.js";

export async function initProfilePage() {
  const user = getUser();
  if (!user) {
    console.warn("User not logged in");
    renderLoggedOutProfile();
    return;
  }

  const username = user.name;
  const url = `${API}/auction/profiles/${username}?_listings=true&_wins=true`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
    });

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
      console.warn("No profile data returned");
      renderLoggedOutProfile();
      return;
    }

    renderProfileInfo(data);
    renderUserListings(data.listings || []);
  } catch (error) {
    console.error("Error loading profile:", error);
    renderLoggedOutProfile();
  }
}

function renderProfileInfo(profile) {
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
        <p class="cursor-pointer hover:underline">Edit profile</p>
        <p class="cursor-pointer hover:underline">Deposit</p>
        <p class="cursor-pointer hover:underline">Create new listing</p>
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
    .map(
      (listing) => `
      <div class="border p-4 rounded-xl mb-4">
        <h3 class="text-xl font-bold">${listing.title}</h3>
        <img class="h-40 rounded-xl mt-2" src="${
          listing.media[0]?.url || "/img/default.jpg"
        }" />
        <p>${listing.description}</p>
        <p class="text-sm text-gray-600">Bids: ${listing._count?.bids || 0}</p>
      </div>
    `
    )
    .join("");
}

// Render a fallback UI when not logged in or API fails
function renderLoggedOutProfile() {
  const container =
    document.getElementById("profile-info") ||
    document.getElementById("profile-page");
  if (!container) return;

  container.innerHTML = `
    <p class="text-center text-xl py-10">You need to log in to view your profile.</p>
  `;

  const listingsContainer = document.getElementById("profile-listings");
  if (listingsContainer) listingsContainer.innerHTML = "";
}
