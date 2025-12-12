// import { loginUser } from "../../api/auth.js";

// export function initLoginModal() {
//   const loginBtn = document.getElementById("login-btn");
//   const loginModal = document.getElementById("login-modal");

//   if (!loginBtn || !loginModal) return;

//   // Inject HTML only once
//   loginModal.innerHTML = `
//     <div class="border-2 border-main w-96 h-fit pb-12 bg-white rounded-3xl">
//         <div class="flex justify-between py-5 px-5 border-b-2 border-b-main">
//           <h2>Welcome, Log in or sign up!</h2>
//           <ion-icon id="close-login-modal" class="text-2xl text-main cursor-pointer" name="close-outline"></ion-icon>
//         </div>
//         <p class="py-5 px-5">
//           Don't have an account?
//           <span id="signup-btn" class="underline text-main cursor-pointer">Sign up!</span>
//         </p>
//         <div>
//           <h2 class="font-julius px-5">Log in</h2>
//           <form id="login-form" class="flex flex-col px-5 py-5" action="login">
//             <label for="email">Email</label>
//             <input type="email" id="login-email" placeholder="Email..." class="border border-main py-1 px-2 w-full mb-5 bg-gray-200 rounded-xl" required>
//             <label for="password">Password</label>
//             <input type="password" id="login-password" placeholder="Password..." class="border border-main py-1 px-2 w-full mb-16 bg-gray-200 rounded-xl" required>
//             <button type="submit" class="border border-main py-1 px-2 w-fit self-center text-2xl rounded-xl hover:bg-main hover:text-white cursor-pointer">Log in</button>
//           </form>
//         </div>
//       </div>
//   `;

//   const closeLoginModal = document.getElementById("close-login-modal");

//   function openModal() {
//     loginModal.classList.toggle("hidden");
//     loginModal.classList.toggle("flex");
//     document.body.classList.toggle("overflow-hidden");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }

//   loginBtn.addEventListener("click", openModal);
//   closeLoginModal.addEventListener("click", openModal);

//   const loginForm = document.getElementById("login-form");
//   loginForm.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const credentials = {
//       email: document.getElementById("login-email").value,
//       password: document.getElementById("login-password").value,
//     };

//     try {
//       const user = await loginUser(credentials);
//       localStorage.setItem("user", JSON.stringify(user));

//       // ✅ Re-render only the navbar
//       const { renderNavbar } = await import("../navbar.js");
//       renderNavbar();

//       // 2️⃣ Close modal
//       const loginModal = document.getElementById("login-modal");
//       loginModal.classList.add("hidden");
//       loginModal.classList.remove("flex");
//       document.body.classList.remove("overflow-hidden");

//       // ✅ Refresh profile page if we are on it
//       if (window.location.pathname.includes("profile/index.html")) {
//         const { initProfilePage } = await import("../profile.js");
//         initProfilePage();
//       }
//     } catch (error) {
//       alert("Login failed: " + error.message);
//       console.error("Login error:", error);
//     }
//   });
// }

import { loginUser } from "../../api/auth.js";

let loginModalElement; // keep reference to modal

export function initLoginModal() {
  loginModalElement = document.getElementById("login-modal");
  const loginBtn = document.getElementById("login-btn");

  if (!loginModalElement) return;

  // Inject HTML only once
  if (!loginModalElement.innerHTML.trim()) {
    loginModalElement.innerHTML = `
      <div class="border-2 border-main w-96 h-fit pb-12 bg-white rounded-3xl">
        <div class="flex justify-between py-5 px-5 border-b-2 border-b-main">
          <h2>Welcome, Log in or sign up!</h2>
          <ion-icon id="close-login-modal" class="text-2xl text-main cursor-pointer" name="close-outline"></ion-icon>
        </div>
        <p class="py-5 px-5">
          Don't have an account?
          <span id="signup-btn" class="underline text-main cursor-pointer">Sign up!</span>
        </p>
        <div>
          <h2 class="font-julius px-5">Log in</h2>
          <form id="login-form" class="flex flex-col px-5 py-5">
            <label for="email">Email</label>
            <input type="email" id="login-email" placeholder="Email..." class="border border-main py-1 px-2 w-full mb-5 bg-gray-200 rounded-xl" required>
            <label for="password">Password</label>
            <input type="password" id="login-password" placeholder="Password..." class="border border-main py-1 px-2 w-full mb-16 bg-gray-200 rounded-xl" required>
            <button type="submit" class="border border-main py-1 px-2 w-fit self-center text-2xl rounded-xl hover:bg-main hover:text-white cursor-pointer">Log in</button>
          </form>
        </div>
      </div>
    `;
  }

  const closeLoginModalBtn = document.getElementById("close-login-modal");

  // Open modal
  function openModal() {
    loginModalElement.classList.remove("hidden");
    loginModalElement.classList.add("flex");
    document.body.classList.add("overflow-hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Close modal
  function closeModal() {
    loginModalElement.classList.add("hidden");
    loginModalElement.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
  }

  // Attach listeners
  if (loginBtn) loginBtn.addEventListener("click", openModal);
  if (closeLoginModalBtn)
    closeLoginModalBtn.addEventListener("click", closeModal);

  // Handle login form
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const credentials = {
        email: document.getElementById("login-email").value,
        password: document.getElementById("login-password").value,
      };

      try {
        const user = await loginUser(credentials);
        localStorage.setItem("user", JSON.stringify(user));

        // Re-render navbar
        const { renderNavbar } = await import("../navbar.js");
        renderNavbar();

        // Close modal
        closeModal();

        // Refresh profile page if on it
        if (window.location.pathname.includes("profile/index.html")) {
          const { initProfilePage } = await import("../profile.js");
          initProfilePage();
        }
      } catch (error) {
        alert("Login failed: " + error.message);
        console.error("Login error:", error);
      }
    });
  }
}

// Function to open modal externally
export function openLoginModal() {
  if (loginModalElement) {
    loginModalElement.classList.remove("hidden");
    loginModalElement.classList.add("flex");
    document.body.classList.add("overflow-hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
