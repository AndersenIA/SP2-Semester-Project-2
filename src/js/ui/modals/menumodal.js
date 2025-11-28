import { logout } from "../../utils/storage";
import { initUI } from "../initUI";

export function toggleMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");

  if (!menuBtn || !menu) return;

  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("right-0");

    menu.innerHTML = `
      <div class="py-3 px-3">
        <div class="flex items-center justify-between pb-5">
          <h2 class="font-julius">Menu</h2>
          <ion-icon id="close-menu-btn" class="text-2xl cursor-pointer" name="close-outline"></ion-icon>
        </div>
        <div class="flex flex-col h-40">
          <a href="../profile/index.html"><p class="cursor-pointer hover:underline">Profile</p></a>
          <p class="cursor-pointer hover:underline">All auctions</p>
          <p class="cursor-pointer hover:underline">Add listing</p>
          <button id="logout-btn" class="w-fit border border-main rounded-xl py-1 px-2 hover:bg-main hover:text-white mt-auto ml-auto cursor-pointer">Log out</button>
        </div>
      </div>
    `;

    // Close menu
    document.getElementById("close-menu-btn").addEventListener("click", () => {
      menu.classList.remove("right-0");
    });

    // Logout button
    document.getElementById("logout-btn").addEventListener("click", () => {
      logout();
      initUI();
      menu.classList.remove("right-0");
    });
  });
}
