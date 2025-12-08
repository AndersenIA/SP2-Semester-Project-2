import { API, API_KEY } from "../../../config.js";
import { getUser } from "../utils/storage.js";

// Public: fetch all listings (only future listings)
export async function getAllListings() {
  const res = await fetch(`${API}/auction/listings`);

  if (!res.ok) {
    throw new Error("Failed to fetch listings");
  }

  const data = await res.json();
  // Filter out expired listings
  const now = new Date();
  return data.data.filter((listing) => new Date(listing.endsAt) > now);
}

// Fetch listings for a specific user (authenticated)
export async function getUserListings(username) {
  const user = getUser();
  if (!user) throw new Error("User not logged in");

  const url = `${API}/auction/listings?limit=100&_seller=true&_bids=true&seller=${username}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load user listings.");
  }

  const data = await response.json();
  const now = new Date();
  // Filter out expired listings
  return data.data.filter((listing) => new Date(listing.endsAt) > now);
}
