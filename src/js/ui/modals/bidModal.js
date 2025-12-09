import { API, API_KEY } from "../../../../config";
import { getUser } from "../../utils/storage";

export function openBidModal(listingId) {
  if (!listingId) {
    console.error("No listing ID provided to modal");
    return;
  }

  const bidBtn = document.getElementById("place-bid-btn");
  const bidModal = document.getElementById("bid-modal");

  if (!bidBtn || !bidModal) return;

  // Show/hide modal
  const toggleModal = () => {
    bidModal.classList.toggle("hidden");
    bidModal.classList.toggle("flex");
    document.body.classList.toggle("overflow-hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Inject HTML once
  bidModal.innerHTML = `
    <div class="border-2 border-main w-96 h-fit pb-12 bg-white rounded-3xl">
      <div class="flex justify-between py-5 px-5 border-b-2 border-b-main">
        <h2>Bid on listing!</h2>
        <ion-icon id="close-bid-modal" class="text-2xl text-main cursor-pointer" name="close-outline"></ion-icon>
      </div>
      <div>
        <h2 class="font-julius px-5 text-center pt-5">Place your bid</h2>
        <form id="bid-form" class="flex flex-col px-5 py-5">
          <label for="bid">Bid</label>
          <input type="number" name="bid" id="bid" placeholder="Bid..." required min="1"
                 class="border border-main py-1 px-2 w-full mb-5 bg-gray-200 rounded-xl"/>
          <button class="border border-main py-1 px-2 w-fit self-center text-2xl rounded-xl hover:bg-main hover:text-white cursor-pointer" type="submit">Bid</button>
        </form>
        <p id="bid-error" class="text-red-600 px-5 pt-2 text-center"></p>
      </div>
    </div>
  `;

  // Grab elements after injection
  const closeBidBtn = document.getElementById("close-bid-modal");
  const bidForm = document.getElementById("bid-form");
  const bidError = document.getElementById("bid-error");

  bidBtn.addEventListener("click", toggleModal);
  closeBidBtn.addEventListener("click", toggleModal);

  bidForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const amount = Number(document.getElementById("bid").value);
    const user = getUser();
    const token = user?.accessToken;

    if (!token) {
      bidError.textContent = "You must be logged in to bid.";
      return;
    }

    try {
      const res = await fetch(`${API}/auction/listings/${listingId}/bids`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) {
        const err = await res.json();
        bidError.textContent =
          err.errors?.[0]?.message || "Could not place bid.";
        return;
      }

      toggleModal();
      location.reload();
    } catch (err) {
      bidError.textContent = "Something went wrong. Try again!";
    }
  });
}
