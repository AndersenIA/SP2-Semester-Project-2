// // src/js/listings/filters.js
// export function initFilters(listings) {
//   const searchInput = document.getElementById("search");
//   const filterBtn = document.querySelector("button");

//   let activeTag = null;

//   // Create filter dropdown container
//   const filterContainer = document.createElement("div");
//   filterContainer.classList.add(
//     "absolute",
//     "bg-white",
//     "border",
//     "border-main",
//     "p-3",
//     "hidden",
//     "z-50",
//     "rounded-xl",
//     "mt-2"
//   );
//   document.body.appendChild(filterContainer);

//   function getTagsWithCounts(listings) {
//     const tagMap = {};
//     listings.forEach((listing) => {
//       listing.tags?.forEach((tag) => {
//         tagMap[tag] = (tagMap[tag] || 0) + 1;
//       });
//     });
//     return tagMap;
//   }

//   function renderFilterDropdown() {
//     filterContainer.innerHTML = "";
//     const tags = getTagsWithCounts(listings);

//     Object.entries(tags).forEach(([tag, count]) => {
//       const tagBtn = document.createElement("button");
//       tagBtn.classList.add(
//         "border",
//         "border-main",
//         "rounded-md",
//         "px-2",
//         "py-1",
//         "m-1",
//         "hover:bg-main",
//         "hover:text-white",
//         "transition"
//       );
//       tagBtn.textContent = `${tag} (${count})`;

//       tagBtn.addEventListener("click", () => {
//         // Navigate to listings page with tag as query parameter
//         window.location.href = `/listings/index.html?tag=${encodeURIComponent(
//           tag
//         )}`;
//       });

//       filterContainer.appendChild(tagBtn);
//     });

//     // Show all listings button
//     const clearBtn = document.createElement("button");
//     clearBtn.classList.add(
//       "border",
//       "border-main",
//       "rounded-md",
//       "px-2",
//       "py-1",
//       "m-1",
//       "hover:bg-main",
//       "hover:text-white",
//       "transition"
//     );
//     clearBtn.textContent = "Show All";
//     clearBtn.addEventListener("click", () => {
//       window.location.href = "/listings/index.html";
//     });
//     filterContainer.appendChild(clearBtn);
//   }

//   // Event listeners
//   searchInput.addEventListener("keypress", (e) => {
//     if (e.key === "Enter") {
//       const query = searchInput.value.trim();
//       if (query) {
//         // Navigate to listings page with search query
//         window.location.href = `/listings/index.html?search=${encodeURIComponent(
//           query
//         )}`;
//       }
//     }
//   });

//   filterBtn.addEventListener("click", () => {
//     renderFilterDropdown();
//     const rect = filterBtn.getBoundingClientRect();
//     filterContainer.style.top = rect.bottom + window.scrollY + "px";
//     filterContainer.style.left = rect.left + window.scrollX + "px";
//     filterContainer.classList.toggle("hidden");
//   });

//   document.addEventListener("click", (e) => {
//     if (!filterBtn.contains(e.target) && !filterContainer.contains(e.target)) {
//       filterContainer.classList.add("hidden");
//     }
//   });
// }
