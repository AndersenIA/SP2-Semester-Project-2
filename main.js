import { initUI } from "./src/js/ui/initUI.js";
import { loadFeed } from "./src/js/ui/feed.js";
import { getUser } from "./src/js/utils/storage.js";

initUI();

// Feed
const feed = document.getElementById("feed");
if (feed) loadFeed();

// Wait for DOM before running page-specific code
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (path.startsWith("/profile")) {
    import("./src/js/ui/profile.js").then(({ initProfilePage }) => {
      initProfilePage();
    });
  }

  if (path.startsWith("/post")) {
    import("./src/js/ui/singleListing.js").then(({ initPostPage }) => {
      initPostPage();
    });
  }
});
