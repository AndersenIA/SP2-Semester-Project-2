import { renderNavbar } from "./src/js/ui/navbar.js";
import { initLoginModal } from "./src/js/ui/modals/loginModal.js";
import { toggleMenu } from "./src/js/ui/modals/menumodal.js";
import { signupModal } from "./src/js/ui/modals/registermodal.js";
import { openPostInfo } from "./src/js/ui/modals/postInfoModal.js";

// Testing the navbar when I user is not logged in
localStorage.removeItem("user");
// Testing navbar when user is logged in
localStorage.setItem(
  "user",
  JSON.stringify({
    name: "test",
    email: "test@example.com",
  })
);

renderNavbar();
initLoginModal();
signupModal();
toggleMenu();
openPostInfo();
