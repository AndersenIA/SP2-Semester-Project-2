import { getAllListings } from "../../api/listings.js";

export function toggleFilterMenu() {
  const filterBtn = document.getElementById("filter-btn"); // Your filter button
  const filterMenu = document.getElementById("filter-menu");

  if (!filterBtn || !filterMenu) return;

  // Only inject menu HTML once
  if (!filterMenu.innerHTML.trim()) {
    filterMenu.innerHTML = `
      <div class="py-3 px-3 flex flex-col h-full">
        <div class="flex items-center justify-between pb-5">
          <h2 class="font-julius text-lg">Filter by Tag</h2>
          <ion-icon id="close-filter-btn" class="text-2xl cursor-pointer" name="close-outline"></ion-icon>
        </div>
        <div id="filter-tags" class="flex flex-col gap-2"></div>
      </div>
    `;
  }

  const closeBtn = document.getElementById("close-filter-btn");
  const tagsContainer = document.getElementById("filter-tags");

  async function populateTags() {
    const listings = await getAllListings();
    const tagMap = {};

    listings.forEach((l) =>
      (l.tags || []).forEach((t) => {
        tagMap[t] = (tagMap[t] || 0) + 1;
      })
    );

    tagsContainer.innerHTML = "";
    Object.entries(tagMap).forEach(([tag, count]) => {
      const tagEl = document.createElement("p");
      tagEl.textContent = `${tag} (${count})`;
      tagEl.className = "cursor-pointer hover:underline";
      tagEl.addEventListener("click", () => {
        window.location.href = `/listings/index.html?tag=${encodeURIComponent(
          tag
        )}`;
      });
      tagsContainer.appendChild(tagEl);
    });
  }

  populateTags();

  // Toggle visibility
  filterBtn.addEventListener("click", () => {
    filterMenu.classList.toggle("left-0");
  });

  closeBtn.addEventListener("click", () => {
    filterMenu.classList.remove("left-0");
  });
}
