import { getAllListings } from "../api/listings.js";

export function initFilters(listingsData) {
  const filterMenu = document.getElementById("filter-menu");
  const filterBtn = document.querySelector(".filter-btn");
  const closeBtn = document.getElementById("close-filter-btn");
  const tagsContainer = document.querySelector("#filter-tags");
  const searchInput = document.querySelector("#search");

  if (!filterMenu || !filterBtn) return;

  // Build a tag map from listings
  async function buildTags() {
    let listings = listingsData;

    // If no listings provided, fetch fresh ones
    if (!listings) {
      listings = await getAllListings();
    }

    const tagMap = {};

    listings.forEach((listing) => {
      (listing.tags || []).forEach((t) => {
        tagMap[t] = (tagMap[t] || 0) + 1;
      });
    });

    tagsContainer.innerHTML = "";

    Object.entries(tagMap).forEach(([tag, count]) => {
      const el = document.createElement("p");
      el.textContent = `${tag} (${count})`;
      el.className = "cursor-pointer hover:underline";

      el.addEventListener("click", () => {
        window.location.href = `/listings?tag=${encodeURIComponent(tag)}`;
      });

      tagsContainer.appendChild(el);
    });
  }

  buildTags();

  // Toggle open/close
  filterBtn.addEventListener("click", () => {
    filterMenu.classList.toggle("hidden");
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      filterMenu.classList.add("hidden");
    });
  }

  // Search logic
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const q = searchInput.value.trim();
        if (q) {
          window.location.href = `/listings?search=${encodeURIComponent(q)}`;
        }
      }
    });
  }
}
