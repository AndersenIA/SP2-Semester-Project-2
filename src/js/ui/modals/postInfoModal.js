export function openPostInfo() {
  const openInfoBtn = document.getElementById("mobile-post-info");
  const mobileInfoDiv = document.getElementById("mobile-info-div");
  const postFullInfo = document.getElementById("post-full-info");
  const closeInfoBtn = document.getElementById("close-info-btn");

  function toggleClasses() {
    mobileInfoDiv.classList.toggle("hidden");
    postFullInfo.classList.toggle("right-0");
  }

  openInfoBtn.addEventListener("click", () => toggleClasses());

  closeInfoBtn.addEventListener("click", () => toggleClasses());
}
