import { renderNavbar } from "./navbar.js";
import { initLoginModal } from "./modals/loginModal.js";
import { toggleMenu } from "./modals/menumodal.js";
import { signupModal } from "./modals/registermodal.js";
import { openPostInfo } from "./modals/postInfoModal.js";
import { openBidModal } from "./modals/bidModal.js";
// import { CreateListingModal } from "./modals/createListingModal.js";
import { initAllListingsPage } from "./initAllListingsPage.js";
import { toggleFilterMenu } from "./modals/filterMenu.js";
import { setupStartBiddingButtons } from "./feed.js";

export function initUI() {
  renderNavbar();
  initLoginModal();
  toggleMenu();
  signupModal();
  openPostInfo();
  openBidModal();
  initAllListingsPage();

  // Only call filter menu if button exists
  const filterBtn = document.querySelector("button");
  if (filterBtn) {
    import("./modals/filterMenu.js").then(({ toggleFilterMenu }) => {
      toggleFilterMenu();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupStartBiddingButtons();
  });
}
