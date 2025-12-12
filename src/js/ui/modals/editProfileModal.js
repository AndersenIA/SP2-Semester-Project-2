// src/js/ui/modals/editProfileModal.js
import { API, API_KEY } from "../../../../config.js";
import { getUser } from "../../utils/storage.js";

export function EditProfileModal(profile) {
  const modal = document.getElementById("profile-modal");
  if (!modal) return;

  // Inject modal HTML
  modal.innerHTML = `
    <div class="bg-white w-96 p-5 rounded-3xl border-2 border-main">
      <div class="flex justify-between items-center mb-5">
        <h2 class="text-xl">Edit Profile</h2>
        <ion-icon id="close-edit-profile-modal" class="text-2xl cursor-pointer text-main" name="close-outline"></ion-icon>
      </div>

      <form id="edit-profile-form" class="flex flex-col">
        <label for="edit-bio">Bio</label>
        <textarea id="edit-bio" class="border p-2 mb-3 rounded-xl" rows="4">${
          profile.bio || ""
        }</textarea>

        <label for="edit-avatar">Avatar URL</label>
        <input id="edit-avatar" type="text" value="${
          profile.avatar?.url || ""
        }" class="border p-2 mb-3 rounded-xl"/>

        <button type="submit" class="border border-main py-1 px-3 rounded-xl hover:bg-main hover:text-white cursor-pointer">Save</button>
      </form>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Close modal
  document
    .getElementById("close-edit-profile-modal")
    .addEventListener("click", () => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      modal.innerHTML = "";
    });

  // Handle form submission
  document
    .getElementById("edit-profile-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const user = getUser();
      if (!user) return alert("You must be logged in.");

      const updatedProfile = {
        bio: document.getElementById("edit-bio").value.trim(),
        avatar: { url: document.getElementById("edit-avatar").value.trim() },
      };

      try {
        const res = await fetch(`${API}/auction/profiles/${user.name}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
            "X-Noroff-API-Key": API_KEY,
          },
          body: JSON.stringify(updatedProfile),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to update profile");
        }

        alert("Profile updated successfully!");
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        modal.innerHTML = "";
        window.location.reload(); // refresh to see updated info
      } catch (err) {
        console.error("Error updating profile:", err);
        alert("Error: " + err.message);
      }
    });
}
