// src/js/ui/initUI.js
import { renderNavbar } from "./navbar.js";
import { initLoginModal } from "./modals/loginModal.js";
import { toggleMenu } from "./modals/menumodal.js";
import { signupModal } from "./modals/registermodal.js";
import { openPostInfo } from "./modals/postInfoModal.js";
import { openBidModal } from "./modals/bidModal.js";
import { CreateListingModal } from "./modals/createListingModal.js";

export function initUI() {
  renderNavbar();
  initLoginModal();
  toggleMenu();
  signupModal();
  openPostInfo();
  openBidModal();
  CreateListingModal();
}
