import { initUI } from "./src/js/ui/initUI.js";
import { loadFeed } from "./src/js/ui/feed.js";
import { initProfilePage } from "./src/js/ui/profile.js";
import { getUser } from "./src/js/utils/storage.js";

// Initialize navbar, menu modal, login modal, etc.
initUI();

// Only load the feed if the page actually has the feed container
const feed = document.getElementById("feed");
if (feed) {
  loadFeed();
}

// // Load profile page if user is logged in and on profile page
// if (window.location.pathname.includes("profile/index.html")) {
//   const user = getUser();
//   if (user) {
//     import("./src/js/ui/profile.js").then(({ initProfilePage }) => {
//       initProfilePage();
//     });
//   }
// }

if (window.location.pathname.startsWith("/profile")) {
  import("./src/js/ui/profile.js").then(({ initProfilePage }) => {
    initProfilePage();
  });
}
