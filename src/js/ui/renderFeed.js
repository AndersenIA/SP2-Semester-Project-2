import { timeRemaining } from "../utils/timeRemaining";

export function renderFeedItems(listings) {
  const feedContainer = document.querySelector("#soon-grid");
  feedContainer.innerHTML = "";

  const sorted = [...listings].sort(
    (a, b) => new Date(a.endsAt) - new Date(b.endsAt)
  );

  sorted.forEach((item) => {
    const remaining = timeRemaining(item.endsAt);

    feedContainer.innerHTML += `
      <div 
        data-id="${item.id}"
        class="h-64 w-44 lg:h-96 lg:w-64 overflow-hidden border border-main rounded-3xl shadow-xl my-5 mx-12 md:mx-5 place-self-center transition-all duration-300 hover:-translate-y-5 hover:shadow-2xl cursor-pointer grid grid-rows-2"
      >
        <div class="pb-3 overflow-hidden">
          <img
            src="${item.media?.[0]?.url || "/public/img/Placeholder-img.png"}"
            alt="${item.media?.[0]?.alt || item.title}"
          />
        </div>
        <div class="px-3 pt-5 flex flex-col justify-between">
          <h3 class="text-2xl">${item.title}</h3>
          <div class="flex justify-between py-5">
            <p>Bids: ${item._count?.bids || 0}</p>
            <h4>${remaining}</h4>
          </div>
        </div>
      </div>
    `;
  });
}

export function renderPopularItems(listings) {
  const popularContainer = document.querySelector("#popular-grid");
  popularContainer.innerHTML = "";

  const sorted = [...listings].sort(
    (a, b) => (b._count?.bids || 0) - (a._count?.bids || 0)
  );

  const top4 = sorted.slice(0, 4);

  top4.forEach((item) => {
    const remaining = timeRemaining(item.endsAt);

    popularContainer.innerHTML += `
      <div 
        data-id="${item.id}"
        class="h-64 w-44 lg:h-96 lg:w-64 overflow-hidden border border-main rounded-3xl shadow-xl my-5 mx-12 md:mx-5 place-self-center transition-all duration-300 hover:-translate-y-5 hover:shadow-2xl cursor-pointer grid grid-rows-2"
      >
        <div class="pb-3 overflow-hidden">
          <img
            src="${item.media?.[0]?.url || "/public/img/Placeholder-img.png"}"
            alt="${item.media?.[0]?.alt || item.title}"
          />
        </div>
        <div class="px-3 pt-5 flex flex-col justify-between">
          <h3 class="text-2xl">${item.title}</h3>
          <div class="flex justify-between py-5">
            <p>Bids: ${item._count?.bids || 0}</p>
            <h4>${remaining}</h4>
          </div>
        </div>
      </div>
    `;
  });
}
