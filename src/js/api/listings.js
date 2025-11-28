console.log("listings.js imported");

const BASE_URL = "https://v2.api.noroff.dev";

export async function getAllListings() {
  const res = await fetch(`${BASE_URL}/auction/listings`);

  if (!res.ok) {
    throw new Error("Failed to fetch listings");
  }

  const data = await res.json();
  return data.data; // return only the listings array
}
