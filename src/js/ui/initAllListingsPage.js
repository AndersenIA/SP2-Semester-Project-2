import { getAllListings } from "../api/listings";
import { timeRemaining } from "../utils/timeRemaining";

export async function initAllListingsPage() {
  const container = document.querySelector("#all-listings");
  if (!container) return;

  try {
    // Get all future listings
    const listings = await getAllListings();

    if (!listings.length) {
      container.innerHTML =
        "<p class='text-center py-10'>No active listings</p>";
      return;
    }

    // Sort by ending soonest
    const sorted = listings.sort(
      (a, b) => new Date(a.endsAt) - new Date(b.endsAt)
    );

    // Display listings
    container.innerHTML = `<div id="soon-grid" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5 py-10"></div>`;
    const grid = document.querySelector("#soon-grid");

    sorted.forEach((item) => {
      const remaining = timeRemaining(item.endsAt);
      grid.innerHTML += `
        <div 
          data-id="${item.id}"
          class="h-64 w-44 lg:h-96 lg:w-64 overflow-hidden border border-main rounded-3xl shadow-xl my-5 mx-auto transition-all duration-300 hover:-translate-y-5 hover:shadow-2xl cursor-pointer grid grid-rows-2"
        >
          <div class="pb-3 overflow-hidden">
            <img
              src="${item.media?.[0]?.url || "/public/img/Placeholder-img.png"}"
              alt="${item.media?.[0]?.alt || item.title}"
              class="object-cover w-full h-full"
            />
          </div>
          <div class="px-3 pt-5 flex flex-col justify-between">
            <h3 class="text-2xl">${item.title}</h3>
            <div class="flex justify-between py-5">
              <p>Bids: ${item._count?.bids || 0}</p>
              <h4>${remaining}</h4>
            </div>
          </div>
        </div>
      `;
    });

    // Clickable listings
    grid.querySelectorAll("[data-id]").forEach((card) => {
      card.addEventListener("click", () => {
        window.location.href = `/post?id=${card.dataset.id}`;
      });
    });
  } catch (err) {
    console.error("Error loading listings:", err);
    container.innerHTML =
      "<p class='text-center py-10'>Failed to load listings.</p>";
  }
}
