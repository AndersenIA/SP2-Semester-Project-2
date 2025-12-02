import { API, API_KEY } from "../../../config.js";

export async function getAllListings() {
  const res = await fetch(`${API}/auction/listings`);

  if (!res.ok) {
    throw new Error("Failed to fetch listings");
  }

  const data = await res.json();
  return data.data; // return only the listings array
}

export async function getUserListings(username) {
  const url = `${API}/auction/listings?limit=100&_seller=true&_bids=true&seller=${username}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to load user listings.");
  }

  const data = await response.json();
  return data.data; // Noroff returns { data: [...] }
}
