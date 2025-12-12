import { getAllListings } from "../api/listings.js";
import { renderFeedItems } from "../ui/renderFeed.js";
import { renderPopularItems } from "./renderFeed.js";
import { toggleFilterMenu } from "./modals/filterMenu.js";
import { getUser } from "../utils/storage.js";
import { initLoginModal, openLoginModal } from "./modals/loginModal.js";

export function setupStartBiddingButtons() {
  const buttons = document.querySelectorAll(".start-bidding-btn");
  if (!buttons.length) return;

  const user = getUser();

  if (user) {
    // Logged in → hide all "Start bidding!" buttons
    buttons.forEach((btn) => (btn.style.display = "none"));
  } else {
    // Not logged in → open login modal on click
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        openLoginModal(); // <-- just open the modal
      });
    });
  }
}

// Call this once at the top-level to initialize the modal
initLoginModal();

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
const filterButton = document.querySelector("button");

// Only attach filter button listener if it exists
if (filterButton) {
  filterButton.addEventListener("click", () => {
    toggleFilterMenu();
  });
}

// Only attach search listener if search bar exists
if (searchInput) {
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
}
