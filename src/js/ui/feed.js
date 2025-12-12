import { getAllListings } from "../api/listings.js";
import { renderFeedItems } from "../ui/renderFeed.js";
import { renderPopularItems } from "./renderFeed.js";
import { toggleFilterMenu } from "./modals/filterMenu.js";

export async function loadFeed() {
  try {
    const listings = await getAllListings();

    // Call your existing feed renderer
    renderFeedItems(listings);
    renderPopularItems(listings);
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("click", (e) => {
  const card = e.target.closest("[data-id]");
  if (!card) return;

  const id = card.dataset.id;
  window.location.href = `/post/index.html?id=${id}`;
});

const searchInput = document.querySelector("#search");
const filterButton = document.querySelector("button"); // your filter button

filterButton.addEventListener("click", () => {
  toggleFilterMenu();
});

// Redirect on search
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `/listings/index.html?search=${encodeURIComponent(
        query
      )}`;
    }
  }
});
