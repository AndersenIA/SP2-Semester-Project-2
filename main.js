import { renderNavbar } from "./src/js/ui/navbar.js";
import { initLoginModal } from "./src/js/ui/modals/loginModal.js";
import { toggleMenu } from "./src/js/ui/menumodal.js";
import { signupModal } from "./src/js/ui/modals/registermodal.js";

// Testing the navbar when I user is not logged in
localStorage.removeItem("user");
// Testing navbar when user is logged in
localStorage.setItem(
  "user",
  JSON.stringify({
    name: "Anders",
    email: "anders@example.com",
  })
);

renderNavbar();
initLoginModal();
signupModal();
// toggleMenu();
