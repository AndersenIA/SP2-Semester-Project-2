const loginBtn = document.getElementById("login-btn");
const loginModal = document.getElementById("login-modal");
const closeLoginModal = document.getElementById("close-login-modal");

function openModal() {
  loginModal.classList.toggle("hidden");
  loginModal.classList.toggle("flex");
  document.body.classList.toggle("overflow-hidden");
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

loginBtn.addEventListener("click", function () {
  console.log("Login clicked");
  openModal();
});

closeLoginModal.addEventListener("click", () => openModal());
