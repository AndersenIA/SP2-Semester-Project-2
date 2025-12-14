import{a as u,A as d,b as f,C as m}from"./main-D9sgWMsp.js";function g(t){const e=document.getElementById("profile-modal");e&&(e.innerHTML=`
    <div class="bg-white w-96 p-5 rounded-3xl border-2 border-main">
      <div class="flex justify-between items-center mb-5">
        <h2 class="text-xl">Edit Profile</h2>
        <ion-icon id="close-edit-profile-modal" class="text-2xl cursor-pointer text-main" name="close-outline"></ion-icon>
      </div>

      <form id="edit-profile-form" class="flex flex-col">
        <label for="edit-bio">Bio</label>
        <textarea id="edit-bio" class="border p-2 mb-3 rounded-xl" rows="4">${t.bio||""}</textarea>

        <label for="edit-avatar">Avatar URL</label>
        <input id="edit-avatar" type="text" value="${t.avatar?.url||""}" class="border p-2 mb-3 rounded-xl"/>

        <button type="submit" class="border border-main py-1 px-3 rounded-xl hover:bg-main hover:text-white cursor-pointer">Save</button>
      </form>
    </div>
  `,e.classList.remove("hidden"),e.classList.add("flex"),window.scrollTo({top:0,behavior:"smooth"}),document.getElementById("close-edit-profile-modal").addEventListener("click",()=>{e.classList.add("hidden"),e.classList.remove("flex"),e.innerHTML=""}),document.getElementById("edit-profile-form").addEventListener("submit",async n=>{n.preventDefault();const o=u();if(!o)return alert("You must be logged in.");const s={bio:document.getElementById("edit-bio").value.trim(),avatar:{url:document.getElementById("edit-avatar").value.trim()}};try{const i=await fetch(`${d}/auction/profiles/${o.name}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o.accessToken}`,"X-Noroff-API-Key":f},body:JSON.stringify(s)});if(!i.ok){const r=await i.json();throw new Error(r.error||"Failed to update profile")}alert("Profile updated successfully!"),e.classList.add("hidden"),e.classList.remove("flex"),e.innerHTML="",window.location.reload()}catch(i){console.error("Error updating profile:",i),alert("Error: "+i.message)}}))}async function L(){const e=new URLSearchParams(window.location.search).get("id"),n=u();if(!n){console.warn("No logged-in user. Cannot view profiles."),l();return}let o,s=!1;const i={"X-Noroff-API-Key":f,Authorization:`Bearer ${n.accessToken}`};e?(o=`${d}/auction/profiles/${e}?_listings=true&_wins=true&_bids=true`,e===n.name&&(s=!0)):(o=`${d}/auction/profiles/${n.name}?_listings=true&_wins=true&_bids=true`,s=!0);try{const r=await fetch(o,{headers:i});if(!r.ok){console.error("Failed to load profile:",r.status,r.statusText),l();return}const{data:a}=await r.json();if(!a){console.warn("No profile data returned."),l();return}b(a,s),h(),x(a),v(),await w(a.listings||[]),y()}catch(r){console.error("Error loading profile:",r),l()}}function b(t,e=!1){const n=document.getElementById("profile-info")||document.getElementById("profile-page");n&&(n.innerHTML=`
    <div class="flex flex-col px-5 md:px-24 lg:px-80 py-10 border-b-2 border-main">
      <div class="flex justify-between items-center">
        <div class="flex items-center p-2 border-2 border-main rounded-2xl">
          <img
            class="h-24 rounded-full border-2 border-main cursor-pointer mr-5"
            src="${t.avatar?.url||"/img/default-avatar.jpg"}"
            alt="${t.avatar?.alt||t.name}"
          />
          <div>
            <h2 class="text-2xl">${t.name}</h2>
            <p>${t._count?.wins||0} auctions won</p>
            <p>${t._count?.listings||0} listings</p>
          </div>
        </div>

        <div>
          ${e?`<p id="edit_profile_btn" class="cursor-pointer hover:underline">Edit profile</p>
                 <p class="cursor-pointer hover:underline">Deposit</p>
                 <p id="create-listing-profile-btn" class="cursor-pointer hover:underline">Create new listing</p>`:""}
        </div>
      </div>

      <!-- Bio Section -->
      <div class="mt-5 px-3">
        <p id="profile-bio" class="text-xl">${t.bio||"This user has no bio."}</p>
      </div>
    </div>
  `)}function v(){const t=Array.from(document.querySelectorAll("p")).find(e=>e.textContent.trim()==="Deposit");t&&t.addEventListener("click",()=>{alert("Deposit functionality is not implemented yet. Stay tuned!")})}function h(){const t=document.getElementById("create-listing-profile-btn");t&&t.addEventListener("click",()=>{m()})}function x(t){const e=document.getElementById("edit_profile_btn");e&&e.addEventListener("click",()=>{g(t)})}async function w(t){const e=document.getElementById("profile-listings");if(e){if(!t.length){e.innerHTML="<p>No listings yet.</p>";return}e.innerHTML="";for(const n of t){const i=(await(await fetch(`${d}/auction/listings/${n.id}?_bids=true`)).json()).data,r=new Date,c=new Date(i.endsAt)-r,p=c>0?`${Math.floor(c/(1e3*60*60))}h ${Math.floor(c/(1e3*60)%60)}m left`:"Expired";e.innerHTML+=`
      <div data-id="${i.id}"
        class="listing-card h-64 w-44 lg:h-96 lg:w-64 overflow-hidden border border-main rounded-3xl shadow-xl my-5 mx-12 md:mx-5 cursor-pointer grid grid-rows-2"
      >
        <div class="pb-3 overflow-hidden">
          <img
            src="${i.media?.[0]?.url||"./public/img/Placeholder-img.png"}"
            alt="${i.media?.[0]?.alt||i.title}"
          />
        </div>
        <div class="px-3 pt-1 lg:pt-5 flex flex-col justify-between">
          <h3 class="lg:text-2xl">${i.title}</h3>
          <div class="flex justify-between py-5">
            <p>Bids: ${i._count?.bids||0}</p>
            <h4>${p}</h4>
          </div>
        </div>
      </div>
    `}}}function l(){const t=document.getElementById("profile-info")||document.getElementById("profile-page");if(!t)return;t.innerHTML=`
    <p class="text-center text-xl py-10">You need to log in to view this profile.</p>
  `;const e=document.getElementById("profile-listings");e&&(e.innerHTML="")}function y(){document.querySelectorAll(".listing-card").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.id;e&&(window.location.href=`/post?id=${e}`)})})}export{L as initProfilePage};
