// src/js/listings/listingsPage.js
import { getAllListings } from "./listings.js";
import { renderFeedItems } from "./renderFeed.js";
import { initFilters } from "./filters.js";

export async function initListingsPage() {
  try {
    const listings = await getAllListings();

    // Apply query params if any
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("search")?.toLowerCase() || "";
    const tagQuery = params.get("tag") || "";

    let filteredListings = [...listings];

    if (tagQuery) {
      filteredListings = filteredListings.filter((listing) =>
        listing.tags?.includes(tagQuery)
      );
    }

    if (searchQuery) {
      filteredListings = filteredListings.filter(
        (listing) =>
          listing.title.toLowerCase().includes(searchQuery) ||
          listing.description?.toLowerCase().includes(searchQuery)
      );
    }

    renderFeedItems(filteredListings);
    initFilters(listings); // still show full list for filter dropdown
  } catch (err) {
    console.error("Failed to load listings:", err);
    const feedContainer = document.querySelector("#soon-grid");
    if (feedContainer)
      feedContainer.innerHTML = "<p>Failed to load listings.</p>";
  }
}
