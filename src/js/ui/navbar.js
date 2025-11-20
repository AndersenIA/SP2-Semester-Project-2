import { getUser } from "../utils/storage";

export function renderNavbar() {
  const user = getUser();

  const nav = document.getElementById("navbar");

  if (!nav) return;

  if (user) {
    // Logged in
    nav.innerHTML = `
      <div class="flex items-center">
        <a href="/index.html">
          <img
            class="h-16 cursor-pointer"
            src="/img/logo auction house without background cropped.png"
            alt="auction house logo"
          />
        </a>
      </div>
      <h2 class="hidden md:block text-2xl pl-5 font-julius text-center">
        The Auction House
      </h2>
      <div class="flex items-center justify-between w-24">
      <a href="../profile/index.html">
        <img
            class="h-10 rounded-4xl border-2 border-main cursor-pointer"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="profile picture"
          />
          </a>
          <ion-icon id="menu-btn" class="text-main text-3xl cursor-pointer" name="menu-outline"></ion-icon>
      </div>
      <div id="menu" class="absolute top-0 -right-96 border-2 border-main border-t-0 border-r-0 rounded-bl-3xl h-62 w-62 bg-white/30 backdrop-blur-3xl transition-all duration-150"></div>
    `;
  } else {
    // Logged out
    nav.innerHTML = `
      <div class="flex items-center">
        <a href="/index.html">
          <img
            class="h-16 cursor-pointer"
            src="/img/logo auction house without background cropped.png"
            alt="auction house logo"
          />
        </a>
      </div>
      <h2 class="hidden md:block text-2xl pl-5 font-julius text-center">
        The Auction House
      </h2>
      <div>
        <p id="login-btn" class="cursor-pointer">Login/sign up</p>
      </div>
    `;
  }
}
