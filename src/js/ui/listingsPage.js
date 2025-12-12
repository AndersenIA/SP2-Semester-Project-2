// src/js/listings/listingsPage.js
import { getAllListings } from "../api/listings.js";
import { renderFeedItems } from "../ui/renderFeed.js";
import { initFilters } from "./filters.js";

export async function initListingsPage() {
  try {
    const listings = await getAllListings();

    // Read query params
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("search")?.toLowerCase() || "";
    const tagQuery = params.get("tag") || "";

    let filteredListings = [...listings];

    // Filter by tag
    if (tagQuery) {
      filteredListings = filteredListings.filter((listing) =>
        listing.tags?.includes(tagQuery)
      );
    }

    // Filter by search
    if (searchQuery) {
      filteredListings = filteredListings.filter(
        (listing) =>
          listing.title.toLowerCase().includes(searchQuery) ||
          listing.description?.toLowerCase().includes(searchQuery)
      );
    }

    showActiveFilter(tagQuery, searchQuery);
    renderFeedItems(filteredListings);
    initFilters(listings); // For dropdown menu
  } catch (err) {
    console.error("Failed to load listings:", err);
    const feedContainer = document.querySelector("#soon-grid");
    if (feedContainer)
      feedContainer.innerHTML = "<p>Failed to load listings.</p>";
  }
}

function showActiveFilter(tag, search) {
  const container = document.getElementById("active-filter");
  if (!container) return;

  container.innerHTML = ""; // clear old

  if (!tag && !search) return;

  const filterText = tag ? `Tag: ${tag}` : `Search: ${search}`;

  container.innerHTML = `
    <button 
      id="clear-filter-btn"
      class="border border-main bg-main text-white rounded-xl px-3 py-1 text-sm cursor-pointer"
    >
      ${filterText} ✕
    </button>
  `;

  document.getElementById("clear-filter-btn").addEventListener("click", () => {
    window.location.href = "/listings/index.html";
  });
}
