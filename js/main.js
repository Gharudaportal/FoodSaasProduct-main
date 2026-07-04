import{c as T}from"./chunks/index-CkZU_ZFb.js";const k="https://hfqmlmfmfnsifwjkjlix.supabase.co",B="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmcW1sbWZtZm5zaWZ3amtqbGl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxODA5MTgsImV4cCI6MjA5ODc1NjkxOH0.0HqMpiYA4cbrJswZ-XIdAF2eH26kTc-KvUIIrE0wKCk",f=T(k,B);let p=[],w=[],n={},l=JSON.parse(localStorage.getItem("homemadeCart"))||[];function O(){const e=document.querySelector(".loading-screen");e&&setTimeout(()=>{e.classList.add("hidden")},500)}async function A(){try{const{data:e,error:t}=await f.from("settings").select("*").eq("id",1).maybeSingle();if(t)throw t;e&&(n=e,N())}catch(e){console.error("Error loading settings:",e)}}async function M(){try{const{data:e,error:t}=await f.from("menu_items").select("*").order("id",{ascending:!0});if(t)throw t;e&&(p=e.map(a=>({id:a.id,name:a.name,description:a.description,price:parseFloat(a.price),category:a.category,isVeg:a.is_veg,isAvailable:a.is_available,image:a.image,rating:parseFloat(a.rating)})),E(p),F())}catch(e){console.error("Error loading menu:",e)}}async function D(){try{const{data:e,error:t}=await f.from("categories").select("*").order("id",{ascending:!0});if(t)throw t;e&&(w=e,j())}catch(e){console.error("Error loading categories:",e)}}function N(){if(!n.business_name)return;document.title=n.business_name+" - "+n.tagline,document.querySelectorAll(".brand-name").forEach(s=>{s.textContent=n.business_name}),document.querySelectorAll(".contact-number").forEach(s=>{s.textContent=n.contact_number,s.tagName==="A"&&(s.href="tel:"+n.contact_number)}),document.querySelectorAll(".whatsapp-number").forEach(s=>{s.textContent=n.whatsapp_number,s.tagName==="A"&&(s.href="https://wa.me/"+n.whatsapp_number.replace(/\D/g,""))}),document.querySelectorAll(".business-address").forEach(s=>{s.textContent=n.address});const e=document.querySelector(".hero-title");if(e&&n.hero){const s=typeof n.hero=="string"?JSON.parse(n.hero):n.hero;e.innerHTML=s.title.replace("Delivered Daily","<span>Delivered Daily</span>")}const t=document.querySelector(".hero-subtitle");if(t&&n.hero){const s=typeof n.hero=="string"?JSON.parse(n.hero):n.hero;t.textContent=s.subtitle}const a=document.querySelector(".about-title");if(a&&n.about){const s=typeof n.about=="string"?JSON.parse(n.about):n.about;a.textContent=s.title}const o=document.querySelector(".about-description");if(o&&n.about){const s=typeof n.about=="string"?JSON.parse(n.about):n.about;o.textContent=s.description}const r=document.querySelector(".about-features");if(r&&n.about){const s=typeof n.about=="string"?JSON.parse(n.about):n.about;s.features&&(r.innerHTML=s.features.map(c=>`
                <div class="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="100">
                    <div class="feature-box">
                        <div class="icon"><i class="fas ${c.icon}"></i></div>
                        <h4>${c.title}</h4>
                        <p>${c.description}</p>
                    </div>
                </div>
            `).join(""))}const i=document.querySelector(".testimonials-container");if(i&&n.testimonials){const s=typeof n.testimonials=="string"?JSON.parse(n.testimonials):n.testimonials;i.innerHTML=s.map((c,u)=>`
            <div class="col-lg-3 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="${u*100}">
                <div class="testimonial-card">
                    <div class="quote-icon"><i class="fas fa-quote-left"></i></div>
                    <p class="text">${c.text}</p>
                    <div class="stars">
                        ${Array(c.rating).fill('<i class="fas fa-star"></i>').join("")}
                        ${Array(5-c.rating).fill('<i class="far fa-star"></i>').join("")}
                    </div>
                    <div class="author">
                        <img src="${c.image}" alt="${c.name}" loading="lazy">
                        <div>
                            <p class="author-name">${c.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        `).join("")}const d=document.querySelector(".gallery-container");if(d&&n.gallery){const s=typeof n.gallery=="string"?JSON.parse(n.gallery):n.gallery;d.innerHTML=s.map((c,u)=>`
            <div class="col-lg-4 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="${u*100}">
                <div class="gallery-item" onclick="openLightbox('${c}')">
                    <img src="${c}" alt="Gallery Image" loading="lazy">
                    <div class="gallery-overlay">
                        <i class="fas fa-search-plus"></i>
                    </div>
                </div>
            </div>
        `).join("")}const g=document.querySelector(".hero-stats");if(g&&n.hero){const s=typeof n.hero=="string"?JSON.parse(n.hero):n.hero;s.stats&&(g.innerHTML=s.stats.map((c,u)=>`
                <div class="col-6 col-md-3" data-aos="fade-up" data-aos-delay="${u*150}">
                    <div class="stat-item">
                        <span class="stat-number" data-target="${c.value}">0</span>
                        <span class="stat-label">${c.label}</span>
                    </div>
                </div>
            `).join(""),X())}}function E(e){const t=document.getElementById("menuContainer");if(t){if(e.length===0){t.innerHTML=`
            <div class="col-12 text-center py-5">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--gray-400);"></i>
                <p class="mt-3 text-muted">No items found matching your criteria.</p>
            </div>
        `;return}t.innerHTML=e.map((a,o)=>`
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4" data-aos="fade-up" data-aos-delay="${o%4*100}">
            <div class="food-card">
                <div class="card-img-wrapper">
                    <img src="${a.image}" alt="${a.name}" loading="lazy" onerror="this.src='https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'">
                    <span class="badge-${a.isVeg?"veg":"nonveg"}">${a.isVeg?"Veg":"Non-Veg"}</span>
                    ${a.isAvailable?"":'<span class="badge-soldout">Sold Out</span>'}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${a.name}</h5>
                    <p class="card-text">${a.description}</p>
                    <div class="card-footer-custom">
                        <span class="price">₹${a.price}</span>
                        <button class="btn-add-cart" onclick="addToCart(${a.id})" ${a.isAvailable?"":"disabled"}>
                            <i class="fas fa-cart-plus me-1"></i> Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join("")}}function F(){const e=document.getElementById("featuredMenuContainer");if(!e||!p.length)return;const t=p.slice(0,8);e.innerHTML=t.map((a,o)=>`
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4" data-aos="fade-up" data-aos-delay="${o%4*100}">
            <div class="food-card">
                <div class="card-img-wrapper">
                    <img src="${a.image}" alt="${a.name}" loading="lazy" onerror="this.src='https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'">
                    <span class="badge-${a.isVeg?"veg":"nonveg"}">${a.isVeg?"Veg":"Non-Veg"}</span>
                    ${a.isAvailable?"":'<span class="badge-soldout">Sold Out</span>'}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${a.name}</h5>
                    <p class="card-text">${a.description}</p>
                    <div class="card-footer-custom">
                        <span class="price">₹${a.price}</span>
                        <button class="btn-add-cart" onclick="addToCart(${a.id})" ${a.isAvailable?"":"disabled"}>
                            <i class="fas fa-cart-plus me-1"></i> Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join("")}function j(){const e=document.getElementById("categoryFilters");!e||!w.length||(e.innerHTML=`
        <button class="filter-btn active" data-category="all" onclick="filterByCategory('all')">All</button>
        ${w.map(t=>`
            <button class="filter-btn" data-category="${t.name}" onclick="filterByCategory('${t.name}')">${t.name}</button>
        `).join("")}
    `)}let $="all",S="all",b="";function _(e){$=e,C(),document.querySelectorAll("#categoryFilters .filter-btn").forEach(t=>{t.classList.toggle("active",t.dataset.category===e)})}function J(e){S=e,C(),document.querySelectorAll("#vegFilters .filter-btn").forEach(t=>{t.classList.toggle("active",t.dataset.veg===e)})}function H(e){b=e.toLowerCase(),C()}function C(){let e=p;$!=="all"&&(e=e.filter(t=>t.category===$)),S!=="all"&&(e=e.filter(t=>t.isVeg===(S==="veg"))),b&&(e=e.filter(t=>t.name.toLowerCase().includes(b)||t.description.toLowerCase().includes(b))),E(e)}function P(e){const t=p.find(o=>o.id===e);if(!t||!t.isAvailable)return;const a=l.find(o=>o.id===e);a?a.quantity++:l.push({id:t.id,name:t.name,price:t.price,image:t.image,quantity:1}),h(),y(),m(`${t.name} added to cart!`,"success")}function q(e){l=l.filter(t=>t.id!==e),h(),y(),x()}function V(e,t){const a=l.find(o=>o.id===e);if(a){if(a.quantity+=t,a.quantity<=0){q(e);return}h(),y(),x()}}function h(){localStorage.setItem("homemadeCart",JSON.stringify(l))}function y(){const e=l.reduce((t,a)=>t+a.quantity,0);document.querySelectorAll(".cart-count").forEach(t=>{t.textContent=e,t.style.display=e>0?"flex":"none"})}function I(){return l.reduce((e,t)=>e+t.price*t.quantity,0)}function x(){const e=document.getElementById("cartItemsContainer"),t=document.getElementById("cartSummary");if(e){if(l.length===0){e.innerHTML=`
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p class="text-muted">Browse our menu and add some delicious items!</p>
                <a href="menu.html" class="btn btn-primary-custom mt-3">Browse Menu</a>
            </div>
        `,t&&(t.style.display="none");return}if(e.innerHTML=l.map(a=>`
        <div class="cart-item">
            <div class="row align-items-center">
                <div class="col-3 col-md-2">
                    <img src="${a.image}" alt="${a.name}">
                </div>
                <div class="col-5 col-md-4">
                    <p class="item-name mb-1">${a.name}</p>
                    <p class="item-price mb-0">₹${a.price}</p>
                </div>
                <div class="col-4 col-md-3">
                    <div class="quantity-control">
                        <button onclick="updateQuantity(${a.id}, -1)"><i class="fas fa-minus"></i></button>
                        <span class="quantity">${a.quantity}</span>
                        <button onclick="updateQuantity(${a.id}, 1)"><i class="fas fa-plus"></i></button>
                    </div>
                </div>
                <div class="col-md-2 text-md-end mt-2 mt-md-0">
                    <span class="fw-bold">₹${a.price*a.quantity}</span>
                </div>
                <div class="col-md-1 text-md-end mt-2 mt-md-0">
                    <button class="btn btn-link text-danger" onclick="removeFromCart(${a.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join(""),t){t.style.display="block";const a=I(),o=a>500?0:40,r=a+o;document.getElementById("cartSubtotal").textContent="₹"+a,document.getElementById("cartDelivery").textContent=o===0?"Free":"₹"+o,document.getElementById("cartTotal").textContent="₹"+r}}}function z(){const e=document.getElementById("checkoutItems");if(!e)return;e.innerHTML=l.map(r=>`
        <div class="order-item">
            <span>${r.name} x ${r.quantity}</span>
            <span>₹${r.price*r.quantity}</span>
        </div>
    `).join("");const t=I(),a=t>500?0:40,o=t+a;document.getElementById("checkoutSubtotal").textContent="₹"+t,document.getElementById("checkoutDelivery").textContent=a===0?"Free":"₹"+a,document.getElementById("checkoutTotal").textContent="₹"+o}function U(e){document.querySelectorAll(".payment-method").forEach(t=>{t.classList.remove("selected")}),document.getElementById("payment_"+e).closest(".payment-method").classList.add("selected")}async function Y(){var g,s,c;const e=document.getElementById("customerName").value.trim(),t=document.getElementById("customerMobile").value.trim(),a=document.getElementById("deliveryAddress").value.trim();if(!e||!t||!a){m("Please fill in all required fields","error");return}if(l.length===0){m("Your cart is empty","error");return}const o="HD"+(1e3+Math.floor(Math.random()*9e3)),r=((g=document.querySelector('input[name="paymentMethod"]:checked'))==null?void 0:g.value)||"Cash On Delivery",i=((s=document.getElementById("landmark"))==null?void 0:s.value)||"",d=((c=document.getElementById("orderNotes"))==null?void 0:c.value)||"";try{const{error:u}=await f.from("orders").insert({order_id:o,customer_name:e,mobile:t,address:a,landmark:i,notes:d,payment_method:r,status:"New",items:l.map(v=>({id:v.id,name:v.name,price:v.price,quantity:v.quantity})),total:I(),date:new Date().toISOString().split("T")[0],time:new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})});if(u)throw u;await Z({name:e,mobile:t,address:a,landmark:i}),l=[],h(),y(),window.location.href="order-success.html?orderId="+o}catch(u){console.error("Error placing order:",u),m("Failed to place order. Please try again.","error")}}async function Z(e){try{const{data:t}=await f.from("customers").select("*").eq("mobile",e.mobile).maybeSingle();t?await f.from("customers").update({name:e.name,address:e.address,landmark:e.landmark,orders_count:(t.orders_count||0)+1}).eq("id",t.id):await f.from("customers").insert({name:e.name,mobile:e.mobile,address:e.address,landmark:e.landmark,orders_count:1})}catch(t){console.error("Error saving customer:",t)}}async function Q(){const e=document.getElementById("trackOrderId").value.trim().toUpperCase();if(!e){m("Please enter an order number","warning");return}try{const{data:t,error:a}=await f.from("orders").select("*").eq("order_id",e).maybeSingle();if(a)throw a;if(!t){m("Order not found. Please check the order number.","error");return}R(t)}catch(t){console.error("Error tracking order:",t),m("Failed to track order. Please try again.","error")}}function R(e){const t=document.getElementById("trackingResult");if(!t)return;const a=["New","Accepted","Preparing","Ready","Out For Delivery","Delivered"],o=a.indexOf(e.status),r=typeof e.items=="string"?JSON.parse(e.items):e.items;t.innerHTML=`
        <div class="tracking-card mt-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 class="mb-1">Order #${e.order_id}</h4>
                    <p class="text-muted mb-0">Placed on ${e.date} at ${e.time}</p>
                </div>
                <span class="badge-status ${e.status.toLowerCase().replace(/\s/g,"-")}">${e.status}</span>
            </div>
            <div class="status-timeline">
                ${a.map((i,d)=>`
                    <div class="timeline-item ${d<=o?"active":""} ${d<o?"completed":""}">
                        <div class="dot"></div>
                        <div class="status-label">${i}</div>
                        <div class="status-time">${d<=o?"Completed":"Pending"}</div>
                    </div>
                `).join("")}
            </div>
            <div class="mt-4 pt-4 border-top">
                <h5>Order Items</h5>
                ${r.map(i=>`
                    <div class="d-flex justify-content-between py-2">
                        <span>${i.name} x ${i.quantity}</span>
                        <span>₹${i.price*i.quantity}</span>
                    </div>
                `).join("")}
                <div class="d-flex justify-content-between pt-3 border-top fw-bold">
                    <span>Total</span>
                    <span>₹${e.total}</span>
                </div>
            </div>
        </div>
    `}function W(e){const t=document.getElementById("lightbox"),a=document.getElementById("lightboxImg");t&&a&&(a.src=e,t.classList.add("active"),document.body.style.overflow="hidden")}function L(){const e=document.getElementById("lightbox");e&&(e.classList.remove("active"),document.body.style.overflow="")}function X(){document.querySelectorAll(".stat-number[data-target]").forEach(t=>{const a=parseInt(t.dataset.target),r=a/(2e3/16);let i=0;const d=()=>{i+=r,i<a?(t.textContent=Math.floor(i).toLocaleString(),requestAnimationFrame(d)):t.textContent=a.toLocaleString()};d()})}function m(e,t="info"){const a=document.querySelector(".toast-container")||G(),o=document.createElement("div");o.className=`custom-toast ${t}`;const r={success:"fa-check-circle",error:"fa-times-circle",warning:"fa-exclamation-triangle",info:"fa-info-circle"};o.innerHTML=`
        <i class="fas ${r[t]||r.info}"></i>
        <span>${e}</span>
    `,a.appendChild(o),setTimeout(()=>{o.style.animation="slideOut 0.3s ease forwards",setTimeout(()=>o.remove(),300)},3e3)}function G(){const e=document.createElement("div");return e.className="toast-container",document.body.appendChild(e),e}function K(){const e=document.querySelector(".navbar");e&&(window.scrollY>50?e.classList.add("scrolled"):e.classList.remove("scrolled"))}function ee(){const e=document.querySelector(".back-to-top");e&&(window.scrollY>500?e.classList.add("visible"):e.classList.remove("visible"))}function te(){window.scrollTo({top:0,behavior:"smooth"})}function ae(e){e.preventDefault();const t=e.target,a=t.querySelector('[name="name"]').value.trim(),o=t.querySelector('[name="email"]').value.trim(),r=t.querySelector('[name="message"]').value.trim();if(!a||!o||!r){m("Please fill in all fields","error");return}m("Message sent successfully! We will get back to you soon.","success"),t.reset()}document.addEventListener("DOMContentLoaded",function(){O(),A(),M(),D(),y(),window.addEventListener("scroll",()=>{K(),ee()});const e=document.getElementById("searchFood");e&&e.addEventListener("input",i=>H(i.target.value));const t=document.getElementById("contactForm");t&&t.addEventListener("submit",ae);const a=document.getElementById("lightbox");a&&a.addEventListener("click",i=>{i.target===a&&L()}),x(),z();const r=new URLSearchParams(window.location.search).get("orderId");r&&document.getElementById("successOrderId")&&(document.getElementById("successOrderId").textContent=r),typeof AOS<"u"&&AOS.init({duration:800,once:!0,offset:100})});window.filterByCategory=_;window.filterByVeg=J;window.addToCart=P;window.removeFromCart=q;window.updateQuantity=V;window.placeOrder=Y;window.selectPayment=U;window.trackOrder=Q;window.openLightbox=W;window.closeLightbox=L;window.scrollToTop=te;
