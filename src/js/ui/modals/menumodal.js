import { logout } from "../../utils/storage.js";
import { initUI } from "../initUI.js";
import { CreateListingModal } from "./createListingModal.js";

export function toggleMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");

  if (!menuBtn || !menu) return;

  // Inject menu HTML only if empty
  if (!menu.innerHTML.trim()) {
    menu.innerHTML = `
      <div class="py-3 px-3">
        <div class="flex items-center justify-between pb-5">
          <h2 class="font-julius">Menu</h2>
          <ion-icon id="close-menu-btn" class="text-2xl cursor-pointer" name="close-outline"></ion-icon>
        </div>
        <div class="flex flex-col h-40">
          <a href="../profile/index.html"><p class="cursor-pointer hover:underline">Profile</p></a>
          <p class="cursor-pointer hover:underline">All auctions</p>
          <p id="create-listing-menu-btn" class="cursor-pointer hover:underline">Create listing</p>
          <button id="logout-btn" class="w-fit border border-main rounded-xl py-1 px-2 hover:bg-main hover:text-white mt-auto ml-auto cursor-pointer">Log out</button>
        </div>
      </div>
    `;
  }

  const closeBtn = document.getElementById("close-menu-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const createBtn = document.getElementById("create-listing-menu-btn");

  // Toggle menu
  menuBtn.addEventListener("click", () => menu.classList.toggle("right-0"));
  closeBtn.addEventListener("click", () => menu.classList.remove("right-0"));

  // Logout
  logoutBtn.addEventListener("click", () => {
    logout();
    initUI();
    menu.classList.remove("right-0");
  });

  // Open Create Listing modal
  if (createBtn) {
    createBtn.addEventListener("click", () => {
      menu.classList.remove("right-0");
      CreateListingModal();
    });
  }
}
