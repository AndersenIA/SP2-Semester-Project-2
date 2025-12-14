import { getUser } from "../utils/storage";

export function renderNavbar() {
  const user = getUser();
  const nav = document.getElementById("navbar");
  if (!nav) return;

  nav.innerHTML = `
    <div class="flex items-center justify-between w-full">
      <a href="/index.html">
        <img class="h-16 cursor-pointer" src="/img/logo auction house without background cropped.png" alt="auction house logo" />
      </a>
      <h2 class="hidden md:block text-2xl pl-5 font-julius text-center">The Auction House</h2>
      ${
        user
          ? `<div class="flex items-center justify-between w-42">
                <a href="/profile?id=${user.name}">
                  <img class="h-10 rounded-4xl border-2 border-main cursor-pointer" src="${
                    user.avatar?.url ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=580"
                  }" alt="profile picture" />
                </a>
                <p class="text-xl">1000<span class="text-2xl">€</span></p>
                <ion-icon id="menu-btn" class="text-main text-3xl cursor-pointer" name="menu-outline"></ion-icon>
             </div>
             <div id="menu" class="absolute top-0 -right-96 border-2 border-main border-t-0 border-r-0 rounded-bl-3xl h-62 w-62 bg-white/30 backdrop-blur-3xl transition-all duration-150"></div>`
          : `<p id="login-btn" class="cursor-pointer">Login/sign up</p>`
      }
    </div>
  `;
}
