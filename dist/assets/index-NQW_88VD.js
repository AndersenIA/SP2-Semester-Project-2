(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}})();const _="modulepreload",$=function(t){return"/"+t},w={},g=function(e,r,o){let n=Promise.resolve();if(r&&r.length>0){let c=function(a){return Promise.all(a.map(d=>Promise.resolve(d).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),l=s?.nonce||s?.getAttribute("nonce");n=c(r.map(a=>{if(a=$(a),a in w)return;w[a]=!0;const d=a.endsWith(".css"),f=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${f}`))return;const m=document.createElement("link");if(m.rel=d?"stylesheet":_,d||(m.as="script"),m.crossOrigin="",m.href=a,l&&m.setAttribute("nonce",l),document.head.appendChild(m),d)return new Promise((M,T)=>{m.addEventListener("load",M),m.addEventListener("error",()=>T(new Error(`Unable to preload CSS for ${a}`)))})}))}function i(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return n.then(s=>{for(const l of s||[])l.status==="rejected"&&i(l.reason);return e().catch(i)})};function h(){try{const t=localStorage.getItem("user");return t?JSON.parse(t):null}catch(t){return console.error("Failed to parse user from localStorage:",t),null}}function S(){localStorage.removeItem("user")}function E(){const t=h(),e=document.getElementById("navbar");e&&(e.innerHTML=`
    <div class="flex items-center justify-between w-full">
      <a href="/index.html">
        <img class="h-16 cursor-pointer" src="/img/logo auction house without background cropped.png" alt="auction house logo" />
      </a>
      <h2 class="hidden md:block text-2xl pl-5 font-julius text-center">The Auction House</h2>
      ${t?`<div class="flex items-center justify-between w-42">
                <a href="../profile/index.html">
                  <img class="h-10 rounded-4xl border-2 border-main cursor-pointer" src="${t.avatar?.url||"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=580"}" alt="profile picture" />
                </a>
                <p class="text-xl">1000<span class="text-2xl">€</span></p>
                <ion-icon id="menu-btn" class="text-main text-3xl cursor-pointer" name="menu-outline"></ion-icon>
             </div>
             <div id="menu" class="absolute top-0 -right-96 border-2 border-main border-t-0 border-r-0 rounded-bl-3xl h-62 w-62 bg-white/30 backdrop-blur-3xl transition-all duration-150"></div>`:'<p id="login-btn" class="cursor-pointer">Login/sign up</p>'}
    </div>
  `)}const A=Object.freeze(Object.defineProperty({__proto__:null,renderNavbar:E},Symbol.toStringTag,{value:"Module"})),p="https://v2.api.noroff.dev",y="256948ee-1587-49c0-8d73-333e88b66a60";async function j(t){try{const e=await fetch(`${p}/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!e.ok){const o=await e.json();throw new Error(o.error||"Registration failed")}return(await e.json()).data}catch(e){throw console.error("Register error:",e),e}}async function k({email:t,password:e}){try{const r=await fetch(`${p}/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e})});if(!r.ok){const n=await r.json();throw console.error("Login API error:",n),new Error(n.error||"Login failed")}return(await r.json()).data}catch(r){throw console.error("Login error:",r),r}}let u;function I(){u=document.getElementById("login-modal");const t=document.getElementById("login-btn");if(!u)return;u.innerHTML.trim()||(u.innerHTML=`
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
    `);const e=document.getElementById("close-login-modal");function r(){u.classList.remove("hidden"),u.classList.add("flex"),document.body.classList.add("overflow-hidden"),window.scrollTo({top:0,behavior:"smooth"})}function o(){u.classList.add("hidden"),u.classList.remove("flex"),document.body.classList.remove("overflow-hidden")}t&&t.addEventListener("click",r),e&&e.addEventListener("click",o);const n=document.getElementById("login-form");n&&n.addEventListener("submit",async i=>{i.preventDefault();const s={email:document.getElementById("login-email").value,password:document.getElementById("login-password").value};try{const l=await k(s);localStorage.setItem("user",JSON.stringify(l));const{renderNavbar:c}=await g(async()=>{const{renderNavbar:a}=await Promise.resolve().then(()=>A);return{renderNavbar:a}},void 0);if(c(),o(),window.location.pathname.includes("profile/index.html")){const{initProfilePage:a}=await g(async()=>{const{initProfilePage:d}=await import("./profile-BNwQwMi1.js");return{initProfilePage:d}},[]);a()}}catch(l){alert("Login failed: "+l.message),console.error("Login error:",l)}})}function D(){u&&(u.classList.remove("hidden"),u.classList.add("flex"),document.body.classList.add("overflow-hidden"),window.scrollTo({top:0,behavior:"smooth"}))}function O(){const t=document.getElementById("listing-modal");if(!t)return;t.classList.remove("hidden"),t.classList.add("flex"),window.scrollTo({top:0,behavior:"smooth"}),t.innerHTML=`
    <div class="border-2 border-main w-96 h-fit pb-12 bg-white rounded-3xl mx-auto my-auto">
      <div class="flex justify-between py-5 px-5 border-b-2 border-b-main">
        <h2>Create new listing!</h2>
        <ion-icon id="close-create-listing-modal" class="text-2xl text-main cursor-pointer" name="close-outline"></ion-icon>
      </div>
      
      <div>
        <h2 class="font-julius px-5 pt-5 text-center">Add new listing</h2>
        <form id="create-listing-form" class="flex flex-col px-5 py-5">
          <label for="title">Title</label>
          <input type="text" id="listing-title" placeholder="Title..." class="border border-main py-1 px-2 w-full mb-5 bg-gray-200 rounded-xl" required>

          <label for="description">Description</label>
          <input type="text" id="listing-desc" placeholder="Description..." class="border border-main py-1 px-2 w-full mb-5 bg-gray-200 rounded-xl">

          <label for="endsAt">End Date</label>
          <input type="datetime-local" id="listing-endsAt" class="border border-main py-1 px-2 w-full mb-5 bg-gray-200 rounded-xl" required>

          <label for="image-url">Image URL (optional)</label>
          <input type="text" id="listing-image-url" placeholder="Paste image URL..." class="border border-main py-1 px-2 w-full mb-16 bg-gray-200 rounded-xl">

          <label for="tags">Tags</label>
          <input type="text" name="tags" id="tags" placeholder="Enter tags separated by spaces..." class="border border-main py-1 px-2 w-full mb-5 bg-gray-200 rounded-xl">

          <button type="submit" class="border border-main py-1 px-2 w-fit self-center text-2xl rounded-xl hover:bg-main hover:text-white cursor-pointer">Create</button>
        </form>
      </div>
    </div>
  `,document.getElementById("close-create-listing-modal").addEventListener("click",()=>{t.classList.add("hidden"),t.classList.remove("flex"),t.innerHTML=""}),document.getElementById("create-listing-form").addEventListener("submit",async r=>{r.preventDefault();const o=document.getElementById("listing-title").value.trim(),n=document.getElementById("listing-desc").value.trim(),i=document.getElementById("listing-endsAt").value,s=document.getElementById("listing-image-url").value.trim(),l=document.getElementById("tags").value.trim().split(/[\s,]+/).filter(Boolean);if(!o||!i)return alert("Title and End Date are required!");const c=JSON.parse(localStorage.getItem("user"));if(!c)return alert("You must be logged in.");const a={title:o,description:n,endsAt:new Date(i).toISOString(),media:s?[{url:s,alt:o}]:[],tags:l};try{const d=await fetch(`${p}/auction/listings`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${c.accessToken}`,"X-Noroff-API-Key":y},body:JSON.stringify(a)});if(!d.ok){const f=await d.json();throw new Error(f.error||"Failed to create listing")}if(alert("Listing created successfully!"),t.classList.add("hidden"),t.classList.remove("flex"),t.innerHTML="",window.location.pathname.includes("profile/index.html")){const{initProfilePage:f}=await g(async()=>{const{initProfilePage:m}=await import("./profile-BNwQwMi1.js");return{initProfilePage:m}},[]);f()}}catch(d){alert("Error creating listing: "+d.message),console.error(d)}})}function H(){const t=document.getElementById("menu-btn"),e=document.getElementById("menu");if(!t||!e)return;e.innerHTML.trim()||(e.innerHTML=`
      <div class="py-3 px-3">
        <div class="flex items-center justify-between pb-5">
          <h2 class="font-julius">Menu</h2>
          <ion-icon id="close-menu-btn" class="text-2xl cursor-pointer" name="close-outline"></ion-icon>
        </div>
        <div class="flex flex-col h-40">
          <a href="../profile/index.html"><p class="cursor-pointer hover:underline">Profile</p></a>
          <a href="../listings/index.html"><p class="cursor-pointer hover:underline">All auctions</p></a>
          <p id="create-listing-menu-btn" class="cursor-pointer hover:underline">Create listing</p>
          <button id="logout-btn" class="w-fit border border-main rounded-xl py-1 px-2 hover:bg-main hover:text-white mt-auto ml-auto cursor-pointer">Log out</button>
        </div>
      </div>
    `);const r=document.getElementById("close-menu-btn"),o=document.getElementById("logout-btn"),n=document.getElementById("create-listing-menu-btn");t.addEventListener("click",()=>e.classList.toggle("right-0")),r.addEventListener("click",()=>e.classList.remove("right-0")),o.addEventListener("click",()=>{S(),P(),e.classList.remove("right-0")}),n&&n.addEventListener("click",()=>{e.classList.remove("right-0"),O()})}function C(){const t=document.getElementById("signup-btn"),e=document.getElementById("signup-modal"),r=document.getElementById("login-modal");if(!t||!e)return;function o(){r&&!r.classList.contains("hidden")&&(r.classList.add("hidden"),r.classList.remove("flex"),document.body.classList.remove("overflow-hidden")),e.classList.toggle("hidden"),e.classList.toggle("flex"),document.body.classList.toggle("overflow-hidden"),window.scrollTo({top:0,behavior:"smooth"})}e.innerHTML=`
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
        <form id="register-form" class="flex flex-col px-5 py-5">
          <label for="name">Account name</label>
          <input
            class="border border-main py-1 px-2 w-full mb-5 bg-gray-200 rounded-xl"
            type="name"
            name="name"
            id="register-name"
            placeholder="Account name..." />
          <label for="email">Email</label>
          <input
            class="border border-main py-1 px-2 w-full mb-5 bg-gray-200 rounded-xl"
            type="email"
            name="email"
            id="register-email"
            placeholder="Email..." />
          <label for="password">Password</label>
          <input
            class="border border-main py-1 px-2 w-full mb-16 bg-gray-200 rounded-xl"
            type="password"
            name="password"
            id="register-password"
            minlength="8"
            placeholder="Password..." />
          <button
            class="border border-main py-1 px-2 w-fit self-center text-2xl rounded-xl hover:bg-main hover:text-white cursor-pointer"
            type="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  `;const n=document.getElementById("close-signup-modal"),i=document.getElementById("login-link");t.addEventListener("click",o),n.addEventListener("click",o),i.addEventListener("click",()=>{e.classList.add("hidden"),e.classList.remove("flex"),r&&(r.classList.remove("hidden"),r.classList.add("flex"),document.body.classList.add("overflow-hidden"))}),document.getElementById("register-form").addEventListener("submit",async l=>{l.preventDefault();const c={name:document.getElementById("register-name").value,email:document.getElementById("register-email").value,password:document.getElementById("register-password").value,bio:"",venueManager:!1};try{const a=await j(c);console.log("User registered:",a),alert("Registration successful!"),e.classList.add("hidden"),e.classList.remove("flex"),document.body.classList.remove("overflow-hidden")}catch(a){alert("Registration failed: "+a.message)}})}function N(){const t=document.getElementById("mobile-post-info"),e=document.getElementById("mobile-info-div"),r=document.getElementById("post-full-info"),o=document.getElementById("close-info-btn");if(!t||!r)return;function n(){e.classList.toggle("hidden"),r.classList.toggle("right-0")}t.addEventListener("click",()=>n()),o.addEventListener("click",()=>n())}async function v(){const t=h(),e=t?{Authorization:`Bearer ${t.accessToken}`,"X-Noroff-API-Key":y}:{"X-Noroff-API-Key":y},r=t?`${p}/auction/listings?_seller=true&_bids=true&_active=true`:`${p}/auction/listings?_bids=true&_active=true`,o=await fetch(r,{headers:e});if(!o.ok)throw new Error("Failed to fetch listings");const n=await o.json(),i=new Date;return n.data.filter(s=>new Date(s.endsAt)>i)}function x(t){const e=new Date(t).getTime(),r=Date.now();let o=e-r;if(o<=0)return"Expired";const n=Math.floor(o/(1e3*60*60*24));o-=n*24*60*60*1e3;const i=Math.floor(o/(1e3*60*60));o-=i*60*60*1e3;const s=Math.floor(o/(1e3*60));o-=s*60*1e3;const l=Math.floor(o/1e3);return n>0?`${n}d ${i}h ${s}m`:i>0?`${i}h ${s}m`:s>0?`${s}m ${l}s`:`${l}s`}async function q(){const t=document.querySelector("#all-listings");if(t)try{const e=await v();if(!e.length){t.innerHTML="<p class='text-center py-10'>No active listings</p>";return}const r=e.sort((n,i)=>new Date(n.endsAt)-new Date(i.endsAt));t.innerHTML='<div id="soon-grid" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5 py-10"></div>';const o=document.querySelector("#soon-grid");r.forEach(n=>{const i=x(n.endsAt);o.innerHTML+=`
        <div 
          data-id="${n.id}"
          class="h-64 w-44 lg:h-96 lg:w-64 overflow-hidden border border-main rounded-3xl shadow-xl my-5 mx-auto transition-all duration-300 hover:-translate-y-5 hover:shadow-2xl cursor-pointer grid grid-rows-2"
        >
          <div class="pb-3 overflow-hidden">
            <img
              src="${n.media?.[0]?.url||"/public/img/Placeholder-img.png"}"
              alt="${n.media?.[0]?.alt||n.title}"
              class="object-cover w-full h-full"
            />
          </div>
          <div class="px-3 pt-5 flex flex-col justify-between">
            <h3 class="text-2xl">${n.title}</h3>
            <div class="flex justify-between py-5">
              <p>Bids: ${n._count?.bids||0}</p>
              <h4>${i}</h4>
            </div>
          </div>
        </div>
      `}),o.querySelectorAll("[data-id]").forEach(n=>{n.addEventListener("click",()=>{window.location.href=`/post/index.html?id=${n.dataset.id}`})})}catch(e){console.error("Error loading listings:",e),t.innerHTML="<p class='text-center py-10'>Failed to load listings.</p>"}}function B(){const t=document.getElementById("filter-btn"),e=document.getElementById("filter-menu");if(!t||!e)return;e.innerHTML.trim()||(e.innerHTML=`
      <div class="py-3 px-3 flex flex-col h-full">
        <div class="flex items-center justify-between pb-5">
          <h2 class="font-julius text-lg">Filter by Tag</h2>
          <ion-icon id="close-filter-btn" class="text-2xl cursor-pointer" name="close-outline"></ion-icon>
        </div>
        <div id="filter-tags" class="flex flex-col gap-2"></div>
      </div>
    `);const r=document.getElementById("close-filter-btn"),o=document.getElementById("filter-tags");async function n(){const i=await v(),s={};i.forEach(l=>(l.tags||[]).forEach(c=>{s[c]=(s[c]||0)+1})),o.innerHTML="",Object.entries(s).forEach(([l,c])=>{const a=document.createElement("p");a.textContent=`${l} (${c})`,a.className="cursor-pointer hover:underline",a.addEventListener("click",()=>{window.location.href=`/listings/index.html?tag=${encodeURIComponent(l)}`}),o.appendChild(a)})}n(),t.addEventListener("click",()=>{e.classList.toggle("left-0")}),r.addEventListener("click",()=>{e.classList.remove("left-0")})}const R=Object.freeze(Object.defineProperty({__proto__:null,toggleFilterMenu:B},Symbol.toStringTag,{value:"Module"}));function F(t){const e=document.querySelector("#soon-grid");e.innerHTML="",[...t].sort((o,n)=>new Date(o.endsAt)-new Date(n.endsAt)).forEach(o=>{const n=x(o.endsAt);e.innerHTML+=`
      <div 
        data-id="${o.id}"
        class="h-64 w-44 lg:h-96 lg:w-64 overflow-hidden border border-main rounded-3xl shadow-xl my-5 mx-12 md:mx-5 place-self-center transition-all duration-300 hover:-translate-y-5 hover:shadow-2xl cursor-pointer grid grid-rows-2"
      >
        <div class="pb-3 overflow-hidden">
          <img
            src="${o.media?.[0]?.url||"/public/img/Placeholder-img.png"}"
            alt="${o.media?.[0]?.alt||o.title}"
          />
        </div>
        <div class="px-3 pt-5 flex flex-col justify-between">
          <h3 class="text-2xl">${o.title}</h3>
          <div class="flex justify-between py-5">
            <p>Bids: ${o._count?.bids||0}</p>
            <h4>${n}</h4>
          </div>
        </div>
      </div>
    `})}function U(t){const e=document.querySelector("#popular-grid");e.innerHTML="",[...t].sort((n,i)=>(i._count?.bids||0)-(n._count?.bids||0)).slice(0,4).forEach(n=>{const i=x(n.endsAt);e.innerHTML+=`
      <div 
        data-id="${n.id}"
        class="h-64 w-44 lg:h-96 lg:w-64 overflow-hidden border border-main rounded-3xl shadow-xl my-5 mx-12 md:mx-5 place-self-center transition-all duration-300 hover:-translate-y-5 hover:shadow-2xl cursor-pointer grid grid-rows-2"
      >
        <div class="pb-3 overflow-hidden">
          <img
            src="${n.media?.[0]?.url||"/public/img/Placeholder-img.png"}"
            alt="${n.media?.[0]?.alt||n.title}"
          />
        </div>
        <div class="px-3 pt-5 flex flex-col justify-between">
          <h3 class="text-2xl">${n.title}</h3>
          <div class="flex justify-between py-5">
            <p>Bids: ${n._count?.bids||0}</p>
            <h4>${i}</h4>
          </div>
        </div>
      </div>
    `})}function J(){const t=document.querySelectorAll(".start-bidding-btn");if(!t.length)return;h()?t.forEach(r=>r.style.display="none"):t.forEach(r=>{r.addEventListener("click",()=>{D()})})}I();async function K(){try{const t=await v();F(t),U(t)}catch(t){console.error(t)}}document.addEventListener("click",t=>{const e=t.target.closest("[data-id]");if(!e)return;const r=e.dataset.id;window.location.href=`/post/index.html?id=${r}`});const b=document.querySelector("#search"),L=document.querySelector("button");L&&L.addEventListener("click",()=>{B()});b&&b.addEventListener("keypress",t=>{if(t.key==="Enter"){const e=b.value.trim();e&&(window.location.href=`/listings/index.html?search=${encodeURIComponent(e)}`)}});function P(){E(),I(),H(),C(),N(),q(),document.querySelector("button")&&g(async()=>{const{toggleFilterMenu:e}=await Promise.resolve().then(()=>R);return{toggleFilterMenu:e}},void 0).then(({toggleFilterMenu:e})=>{e()}),document.addEventListener("DOMContentLoaded",()=>{J()})}P();const V=document.getElementById("feed");V&&K();window.location.pathname.includes("profile/index.html")&&h()&&g(async()=>{const{initProfilePage:e}=await import("./profile-BNwQwMi1.js");return{initProfilePage:e}},[]).then(({initProfilePage:e})=>{e()});export{p as A,O as C,y as a,h as g};
