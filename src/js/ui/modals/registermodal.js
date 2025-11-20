export function signupModal() {
  const signupBtn = document.getElementById("signup-btn");
  const signupModal = document.getElementById("signup-modal");
  const loginModal = document.getElementById("login-modal");

  if (!signupBtn || !signupModal) return;

  function openModal() {
    // Close login modal
    if (loginModal && !loginModal.classList.contains("hidden")) {
      loginModal.classList.add("hidden");
      loginModal.classList.remove("flex");
      document.body.classList.remove("overflow-hidden");
    }

    // Open signup modal
    signupModal.classList.toggle("hidden");
    signupModal.classList.toggle("flex");
    document.body.classList.toggle("overflow-hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  signupModal.innerHTML = `
    <div class="border-2 border-main w-96 h-fit pb-12 bg-white rounded-3xl">
      <div class="flex justify-between py-5 px-5 border-b-2 border-b-main">
        <h2>Sign up!</h2>
        <ion-icon
          id="close-signup-modal"
          class="text-2xl text-main cursor-pointer"
          name="close-outline"></ion-icon>
      </div>
      <p class="py-5 px-5">
        Already have an account?
        <span id="login-link" class="underline text-main cursor-pointer">Log in!</span>
      </p>
      <div>
        <h2 class="font-julius px-5">Sign up</h2>
        <form class="flex flex-col px-5 py-5" action="signup">
        <label for="name">Account name</label>
          <input
            class="border border-main py-1 px-2 w-full mb-5 bg-gray-200 rounded-xl"
            type="name"
            name="name"
            id="name"
            placeholder="Account name..." />
          <label for="email">Email</label>
          <input
            class="border border-main py-1 px-2 w-full mb-5 bg-gray-200 rounded-xl"
            type="email"
            name="email"
            id="email"
            placeholder="Email..." />
          <label for="password">Password</label>
          <input
            class="border border-main py-1 px-2 w-full mb-16 bg-gray-200 rounded-xl"
            type="password"
            name="password"
            id="password"
            placeholder="Password..." />
          <button
            class="border border-main py-1 px-2 w-fit self-center text-2xl rounded-xl hover:bg-main hover:text-white cursor-pointer"
            type="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  `;

  const closeSignupModal = document.getElementById("close-signup-modal");
  const loginLink = document.getElementById("login-link");

  signupBtn.addEventListener("click", openModal);
  closeSignupModal.addEventListener("click", openModal);

  // Switch back to login modal
  loginLink.addEventListener("click", () => {
    signupModal.classList.add("hidden");
    signupModal.classList.remove("flex");
    // Open login modal
    if (loginModal) {
      loginModal.classList.remove("hidden");
      loginModal.classList.add("flex");
      document.body.classList.add("overflow-hidden");
    }
  });
}
