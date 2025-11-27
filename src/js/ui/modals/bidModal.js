export function openBidModal() {
  const bidBtn = document.getElementById("place-bid-btn");
  const bidModal = document.getElementById("bid-modal");

  if (!bidBtn || !bidModal) return;

  function openModal() {
    bidModal.classList.toggle("hidden");
    bidModal.classList.toggle("flex");
    document.body.classList.toggle("overflow-hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  bidBtn.addEventListener("click", () => console.log("Bid btn clicked"));
}

// export function initLoginModal() {
//   const loginBtn = document.getElementById("login-btn");
//   const loginModal = document.getElementById("login-modal");

//   if (!loginBtn || !loginModal) return;

//   function openModal() {
//     loginModal.classList.toggle("hidden");
//     loginModal.classList.toggle("flex");
//     document.body.classList.toggle("overflow-hidden");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }

//   loginModal.innerHTML = `
//     <div class="border-2 border-main w-96 h-fit pb-12 bg-white rounded-3xl">
//         <div class="flex justify-between py-5 px-5 border-b-2 border-b-main">
//           <h2>Welcome, Log in or sign up!</h2>
//           <ion-icon
//             id="close-login-modal"
//             class="text-2xl text-main cursor-pointer"
//             name="close-outline"
//           ></ion-icon>
//         </div>
//         <p class="py-5 px-5">
//           Dont have an account?
//           <span id="signup-btn" class="underline text-main cursor-pointer">Sign up!</span>
//         </p>
//         <div>
//           <h2 class="font-julius px-5">log in</h2>
//           <form class="flex flex-col px-5 py-5" action="login">
//             <label for="email">Email</label>
//             <input
//               class="border border-main py-1 px-2 w-full mb-5 bg-gray-200 rounded-xl"
//               type="email"
//               name="email"
//               id="email"
//               placeholder="Email..."
//             />
//             <label for="password">Password</label>
//             <input
//               class="border border-main py-1 px-2 w-full mb-16 bg-gray-200 rounded-xl"
//               type="password"
//               name="password"
//               id="password"
//               placeholder="Password..."
//             />
//             <button
//               class="border border-main py-1 px-2 w-fit self-center text-2xl rounded-xl hover:bg-main hover:text-white cursor-pointer"
//               type="submit"
//             >
//               Log in
//             </button>
//           </form>
//         </div>
//       </div>
//   `;

//   const closeLoginModal = document.getElementById("close-login-modal");
//   loginBtn.addEventListener("click", () => openModal());
//   closeLoginModal.addEventListener("click", () => openModal());
// }
