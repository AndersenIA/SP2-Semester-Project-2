import{A as g,b as h,a as A,o as E}from"./main-D9sgWMsp.js";function N(i){const t=document.getElementById("bid-modal");t.innerHTML=`
    <div class="bg-white p-5 border-2 border-main rounded-2xl w-96 h-fit">
      <div class="flex justify-between">
        <h2 class="text-xl mb-3">Edit Listing</h2>
        <ion-icon id="close-edit-bid-modal" class="text-2xl text-main cursor-pointer" name="close-outline"></ion-icon>
      </div>
      
      <label>Title</label>
      <input id="edit-title" class="border p-2 w-full mb-3 rounded-2xl" value="${i.title}" />

      <label>Description</label>
      <textarea id="edit-description" class="border p-2 w-full mb-3 rounded-2xl">${i.description||""}</textarea>
      
      <label>Tags (comma separated)</label>
      <input id="edit-tags" class="border p-2 w-full mb-3 rounded-2xl" value="${i.tags?.join(", ")||""}" />
      
      <div class="flex justify-between mt-5">
        <button id="save-listing" class="border-2 border-main px-3 py-1 rounded-lg hover:bg-main hover:text-white">Save</button>
        <button id="delete-listing" class="border-2 border-red-600 text-red-600 px-3 py-1 rounded-lg hover:bg-red-600 hover:text-white">Delete</button>
      </div>
    </div>
  `,t.classList.toggle("hidden"),t.classList.toggle("flex"),window.scrollTo({top:0,behavior:"smooth"}),document.getElementById("close-edit-bid-modal").addEventListener("click",()=>{t.classList.add("hidden"),t.innerHTML=""}),document.getElementById("save-listing").addEventListener("click",async()=>{const o={title:document.getElementById("edit-title").value,description:document.getElementById("edit-description").value,tags:document.getElementById("edit-tags").value.split(",").map(a=>a.trim()).filter(Boolean)},l=JSON.parse(localStorage.getItem("user")).accessToken;(await fetch(`${g}/auction/listings/${i.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${l}`,"X-Noroff-API-Key":h},body:JSON.stringify(o)})).ok&&(alert("Listing updated!"),window.location.reload())}),document.getElementById("delete-listing").addEventListener("click",async()=>{const o=JSON.parse(localStorage.getItem("user")).accessToken;if(!confirm("Are you sure you want to delete this listing?"))return;(await fetch(`${g}/auction/listings/${i.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${o}`,"X-Noroff-API-Key":h}})).ok&&(alert("Listing deleted."),window.location.href="/index.html")})}async function D(){const t=new URLSearchParams(window.location.search).get("id"),o=A();if(!t){console.error("Missing listing ID");return}const l=document.getElementById("listing-main-image"),u=document.getElementById("listing-title"),a=document.getElementById("listing-remaining"),x=document.getElementById("listing-price"),v=document.getElementById("listing-main-title"),w=document.getElementById("listing-main-desc"),p=document.getElementById("listing-main-tags"),b=document.getElementById("seller-avatar"),y=document.getElementById("seller-name"),I=document.getElementById("seller-auctions"),B=document.getElementById("seller-listings"),L=document.getElementById("seller-profile-link");E(t);try{const r=await fetch(`${g}/auction/listings/${t}?_seller=true&_bids=true`),{data:e}=await r.json(),d=document.getElementById("place-bid-btn");o&&o.name===e.seller.name?(d.textContent="Edit listing",d.replaceWith(d.cloneNode(!0)),document.getElementById("place-bid-btn").addEventListener("click",()=>{N(e)})):d.addEventListener("click",()=>E(t)),u.textContent=e.title,l.src=e.media?.[0]?.url||"/public/img/Placeholder-img.png",v.textContent=e.title,w.textContent=e.description||"No description provided.",e.tags&&e.tags.length>0?p.textContent=e.tags.join(", "):p.textContent="No tags";const $=new Date,c=new Date(e.endsAt)-$;a.textContent=c>0?`${Math.floor(c/(1e3*60*60))}h ${Math.floor(c/(1e3*60)%60)}m remaining`:"Expired";const s=e.bids||[],f=s.length?s[s.length-1].amount:0;x.textContent=`${f} EUR`,document.getElementById("current-bid").textContent=`${f} EUR`;const k=document.getElementById("bid-history");k.innerHTML=s.length?[...s].reverse().map(n=>{const m=n.bidder?.name||"Unknown",T=new Date(n.created).toLocaleString();return`<div class="flex justify-between px-3 py-2 border-b border-gray-200">
                    <span><strong>${n.amount} EUR</strong> by ${m}</span>
                    <span class="text-sm text-gray-500">${T}</span>
                  </div>`}).join(""):'<p class="p-3 text-gray-500">No bids yet</p>',b.src=e.seller.avatar?.url||"/img/default.jpg",y.textContent=e.seller.name,I.textContent=`${e.seller.wins||0} auctions joined`,B.textContent=`${e.seller.listings||0} listings`;const C=()=>{const n=e.seller.name;n&&(window.location.href=`/profile?id=${n}`)};[L,b,y].forEach(n=>n.addEventListener("click",m=>{m.preventDefault(),C()}))}catch(r){console.error(r)}}export{D as initPostPage};
