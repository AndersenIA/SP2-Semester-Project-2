import { API, API_KEY } from "../../../../config";

export function openEditListingModal(listing) {
  const modal = document.getElementById("bid-modal"); // reuse same modal container
  modal.innerHTML = `
    <div class="bg-white p-5 border-2 border-main rounded-2xl w-96 h-fit">
      <div class="flex justify-between">
        <h2 class="text-xl mb-3">Edit Listing</h2>
        <ion-icon id="close-edit-bid-modal" class="text-2xl text-main cursor-pointer" name="close-outline"></ion-icon>
      </div>
      
      <label>Title</label>
      <input id="edit-title" class="border p-2 w-full mb-3 rounded-2xl" value="${
        listing.title
      }" />

      <label>Description</label>
      <textarea id="edit-description" class="border p-2 w-full mb-3 rounded-2xl">${
        listing.description || ""
      }</textarea>
      
      <label>Tags (comma separated)</label>
      <input id="edit-tags" class="border p-2 w-full mb-3 rounded-2xl" value="${
        listing.tags?.join(", ") || ""
      }" />
      
      <div class="flex justify-between mt-5">
        <button id="save-listing" class="border-2 border-main px-3 py-1 rounded-lg hover:bg-main hover:text-white">Save</button>
        <button id="delete-listing" class="border-2 border-red-600 text-red-600 px-3 py-1 rounded-lg hover:bg-red-600 hover:text-white">Delete</button>
      </div>
    </div>
  `;

  modal.classList.toggle("hidden");
  modal.classList.toggle("flex");
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Close modal button
  document
    .getElementById("close-edit-bid-modal")
    .addEventListener("click", () => {
      modal.classList.add("hidden");
      modal.innerHTML = ""; // optional: clears modal to avoid duplicate listeners
    });

  // Save listing
  document
    .getElementById("save-listing")
    .addEventListener("click", async () => {
      const updated = {
        title: document.getElementById("edit-title").value,
        description: document.getElementById("edit-description").value,
        tags: document
          .getElementById("edit-tags")
          .value.split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const token = JSON.parse(localStorage.getItem("user")).accessToken;

      const res = await fetch(`${API}/auction/listings/${listing.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify(updated),
      });

      if (res.ok) {
        alert("Listing updated!");
        window.location.reload();
      }
    });

  // Delete listing
  document
    .getElementById("delete-listing")
    .addEventListener("click", async () => {
      const token = JSON.parse(localStorage.getItem("user")).accessToken;

      if (!confirm("Are you sure you want to delete this listing?")) return;

      const res = await fetch(`${API}/auction/listings/${listing.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
        },
      });

      if (res.ok) {
        alert("Listing deleted.");
        window.location.href = "/index.html";
      }
    });
}
