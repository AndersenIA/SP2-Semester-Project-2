import { API, API_KEY } from "../../../../config.js";

export function CreateListingModal() {
  const createModal = document.getElementById("listing-modal");
  if (!createModal) return;

  // Show modal
  createModal.classList.remove("hidden");
  createModal.classList.add("flex");
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Inject HTML
  createModal.innerHTML = `
    <div class="border-2 border-main w-96 h-fit pb-12 bg-white rounded-3xl mx-auto my-auto">
      <div class="flex justify-between py-5 px-5 border-b-2 border-b-main">
        <h2>Create new listing!</h2>
        <ion-icon id="close-create-listing-modal" class="text-2xl text-main cursor-pointer" name="close-outline"></ion-icon>
      </div>
      
      <div>
        <h2 class="font-julius px-5 pt-5 text-center">Add new listing</h2>
        <form id="create-listing-form" class="flex flex-col px-5 py-5">
          <label for="title">Title</label>
          <input type="text" id="listing-title" placeholder="Title..." class="border border-main py-1 px-2 w-full mb-5 bg-gray-200 rounded-xl" required>

          <label for="description">Description</label>
          <input type="text" id="listing-desc" placeholder="Description..." class="border border-main py-1 px-2 w-full mb-5 bg-gray-200 rounded-xl">

          <label for="endsAt">End Date</label>
          <input type="datetime-local" id="listing-endsAt" class="border border-main py-1 px-2 w-full mb-5 bg-gray-200 rounded-xl" required>

          <label for="image-url">Image URL (optional)</label>
          <input type="text" id="listing-image-url" placeholder="Paste image URL..." class="border border-main py-1 px-2 w-full mb-16 bg-gray-200 rounded-xl">

          <label for="tags">Tags</label>
          <input type="text" name="tags" id="tags" placeholder="Enter tags separated by spaces..." class="border border-main py-1 px-2 w-full mb-5 bg-gray-200 rounded-xl">

          <button type="submit" class="border border-main py-1 px-2 w-fit self-center text-2xl rounded-xl hover:bg-main hover:text-white cursor-pointer">Create</button>
        </form>
      </div>
    </div>
  `;

  // Close button
  document
    .getElementById("close-create-listing-modal")
    .addEventListener("click", () => {
      createModal.classList.add("hidden");
      createModal.classList.remove("flex");
      createModal.innerHTML = "";
    });

  // Form submission
  const form = document.getElementById("create-listing-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("listing-title").value.trim();
    const description = document.getElementById("listing-desc").value.trim();
    const endsAtInput = document.getElementById("listing-endsAt").value;
    const imageUrl = document.getElementById("listing-image-url").value.trim();
    const tags = document
      .getElementById("tags")
      .value.trim()
      .split(/[\s,]+/)
      .filter(Boolean);

    if (!title || !endsAtInput)
      return alert("Title and End Date are required!");

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("You must be logged in.");

    const listingData = {
      title,
      description,
      endsAt: new Date(endsAtInput).toISOString(),
      media: imageUrl ? [{ url: imageUrl, alt: title }] : [],
      tags,
    };

    try {
      const res = await fetch(`${API}/auction/listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify(listingData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create listing");
      }

      alert("Listing created successfully!");
      createModal.classList.add("hidden");
      createModal.classList.remove("flex");
      createModal.innerHTML = "";

      if (window.location.pathname.includes("profile/index.html")) {
        const { initProfilePage } = await import("../profile.js");
        initProfilePage();
      }
    } catch (err) {
      alert("Error creating listing: " + err.message);
      console.error(err);
    }
  });
}
