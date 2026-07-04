import{c as _}from"./chunks/index-CkZU_ZFb.js";const L="https://hfqmlmfmfnsifwjkjlix.supabase.co",N="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmcW1sbWZtZm5zaWZ3amtqbGl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxODA5MTgsImV4cCI6MjA5ODc1NjkxOH0.0HqMpiYA4cbrJswZ-XIdAF2eH26kTc-KvUIIrE0wKCk",m=_(L,N);let b=localStorage.getItem("adminLoggedIn")==="true",y=[],p=[],g=[],v=[],i={};function S(){const t=window.location.pathname,e=t.includes("login.html")||t.endsWith("/login");return!b&&!e?(window.location.href="login.html",!1):!0}async function M(t){t.preventDefault();const e=document.getElementById("adminUsername").value.trim(),o=document.getElementById("adminPassword").value;try{const{data:n,error:a}=await m.from("admin_users").select("password").eq("username",e).maybeSingle();if(a)throw a;if(!n)throw new Error("User not found");o===n.password?(localStorage.setItem("adminLoggedIn","true"),b=!0,c("Login successful!","success"),setTimeout(()=>{window.location.href="dashboard.html"},500)):c("Invalid username or password","error")}catch(n){console.error(n),c("Login failed – see console","error")}}function x(){localStorage.removeItem("adminLoggedIn"),b=!1,window.location.href="login.html"}async function k(){try{const[t,e,o,n,a]=await Promise.all([m.from("menu_items").select("*").order("id",{ascending:!0}),m.from("categories").select("*").order("id",{ascending:!0}),m.from("orders").select("*").order("created_at",{ascending:!1}),m.from("customers").select("*").order("created_at",{ascending:!1}),m.from("settings").select("*").eq("id",1).maybeSingle()]);t.data&&(y=t.data.map(s=>({id:s.id,name:s.name,description:s.description,price:parseFloat(s.price),category:s.category,isVeg:s.is_veg,isAvailable:s.is_available,image:s.image,rating:parseFloat(s.rating)}))),e.data&&(p=e.data),o.data&&(g=o.data.map(s=>({id:s.id,orderId:s.order_id,customerName:s.customer_name,mobile:s.mobile,address:s.address,landmark:s.landmark,notes:s.notes,paymentMethod:s.payment_method,status:s.status,items:typeof s.items=="string"?JSON.parse(s.items):s.items,total:parseFloat(s.total),date:s.date,time:s.time}))),n.data&&(v=n.data),a.data&&(i=a.data),O(),h(),w(),E(),Z(),X()}catch(t){console.error("Error loading admin data:",t),c("Failed to load data. Please check your connection.","error")}}function O(){const t=new Date().toISOString().split("T")[0],e=g.filter(d=>d.date===t),o=g.filter(d=>d.status!=="Delivered"),n=g.filter(d=>d.status==="Delivered"),a=g.reduce((d,r)=>d+r.total,0);[{id:"todayOrders",value:e.length,icon:"fa-shopping-bag",color:"primary"},{id:"revenue",value:"₹"+a.toLocaleString(),icon:"fa-rupee-sign",color:"success"},{id:"pendingOrders",value:o.length,icon:"fa-clock",color:"warning"},{id:"deliveredOrders",value:n.length,icon:"fa-check-circle",color:"danger"}].forEach(d=>{const r=document.getElementById(d.id);r&&(r.textContent=d.value)});const u=document.getElementById("recentOrders");if(u){const d=g.slice(0,5);u.innerHTML=d.map(r=>`
            <tr>
                <td>${r.orderId}</td>
                <td>${r.customerName}</td>
                <td>₹${r.total}</td>
                <td><span class="badge-status ${r.status.toLowerCase().replace(/\s/g,"-")}">${r.status}</span></td>
                <td>${r.date}</td>
            </tr>
        `).join("")}}function h(){const t=document.getElementById("categoriesTable");t&&(t.innerHTML=p.map((e,o)=>`
        <tr>
            <td>${e.id}</td>
            <td><i class="fas ${e.icon} me-2"></i>${e.name}</td>
            <td>${e.description}</td>
            <td>
                <button class="btn btn-sm btn-primary me-2" onclick="editCategory(${o})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger" onclick="deleteCategory(${e.id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join(""))}function j(){document.getElementById("categoryModalTitle").textContent="Add Category",document.getElementById("categoryForm").reset(),document.getElementById("categoryIndex").value="",new bootstrap.Modal(document.getElementById("categoryModal")).show()}function q(t){const e=p[t];document.getElementById("categoryModalTitle").textContent="Edit Category",document.getElementById("categoryIndex").value=t,document.getElementById("categoryId").value=e.id,document.getElementById("categoryName").value=e.name,document.getElementById("categoryIcon").value=e.icon,document.getElementById("categoryDesc").value=e.description,new bootstrap.Modal(document.getElementById("categoryModal")).show()}async function C(t){var u;t.preventDefault();const e=document.getElementById("categoryIndex").value,o=(u=document.getElementById("categoryId"))==null?void 0:u.value,n=document.getElementById("categoryName").value.trim(),a=document.getElementById("categoryIcon").value.trim(),s=document.getElementById("categoryDesc").value.trim();try{if(e!==""){const{error:d}=await m.from("categories").update({name:n,icon:a,description:s}).eq("id",o);if(d)throw d;const r=p.findIndex(I=>I.id===parseInt(o));r>=0&&(p[r]={...p[r],name:n,icon:a,description:s})}else{const{data:d,error:r}=await m.from("categories").insert({name:n,icon:a,description:s}).select().single();if(r)throw r;d&&p.push(d)}h(),bootstrap.Modal.getInstance(document.getElementById("categoryModal")).hide(),c("Category saved successfully!","success")}catch(d){console.error("Error saving category:",d),c("Failed to save category","error")}}async function P(t){if(confirm("Are you sure you want to delete this category?"))try{const{error:e}=await m.from("categories").delete().eq("id",t);if(e)throw e;p=p.filter(o=>o.id!==t),h(),c("Category deleted successfully!","success")}catch(e){console.error("Error deleting category:",e),c("Failed to delete category","error")}}function w(){const t=document.getElementById("menuTable");t&&(t.innerHTML=y.map((e,o)=>`
        <tr>
            <td>${e.id}</td>
            <td><img src="${e.image}" alt="${e.name}" style="width:50px;height:50px;object-fit:cover;border-radius:8px;" onerror="this.src='https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'"></td>
            <td>${e.name}</td>
            <td>₹${e.price}</td>
            <td>${e.category}</td>
            <td><span class="badge ${e.isVeg?"bg-success":"bg-danger"}">${e.isVeg?"Veg":"Non-Veg"}</span></td>
            <td><span class="badge ${e.isAvailable?"bg-success":"bg-secondary"}">${e.isAvailable?"Available":"Sold Out"}</span></td>
            <td>
                <button class="btn btn-sm btn-primary me-2" onclick="editMenuItem(${o})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger" onclick="deleteMenuItem(${e.id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join(""))}function H(){document.getElementById("menuModalTitle").textContent="Add Menu Item",document.getElementById("menuForm").reset(),document.getElementById("menuIndex").value="";const t=document.getElementById("menuCategory");t.innerHTML=p.map(e=>`<option value="${e.name}">${e.name}</option>`).join(""),new bootstrap.Modal(document.getElementById("menuModal")).show()}function R(t){const e=y[t];document.getElementById("menuModalTitle").textContent="Edit Menu Item",document.getElementById("menuIndex").value=t,document.getElementById("menuItemId").value=e.id,document.getElementById("menuName").value=e.name,document.getElementById("menuDesc").value=e.description,document.getElementById("menuPrice").value=e.price,document.getElementById("menuImage").value=e.image;const o=document.getElementById("menuCategory");o.innerHTML=p.map(n=>`<option value="${n.name}" ${n.name===e.category?"selected":""}>${n.name}</option>`).join(""),document.getElementById("menuVeg").value=e.isVeg?"1":"0",document.getElementById("menuAvailable").value=e.isAvailable?"1":"0",new bootstrap.Modal(document.getElementById("menuModal")).show()}async function A(t){var $,B;t.preventDefault();const e=document.getElementById("menuIndex").value,o=($=document.getElementById("menuItemId"))==null?void 0:$.value,n=document.getElementById("menuName").value.trim(),a=document.getElementById("menuDesc").value.trim(),s=parseFloat(document.getElementById("menuPrice").value),u=((B=document.getElementById("menuImage"))==null?void 0:B.value)||"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",d=document.getElementById("menuCategory").value,r=document.getElementById("menuVeg").value==="1",I=document.getElementById("menuAvailable").value==="1";try{if(e!==""){const{error:l}=await m.from("menu_items").update({name:n,description:a,price:s,category:d,is_veg:r,is_available:I,image:u}).eq("id",o);if(l)throw l;const f=y.findIndex(F=>F.id===parseInt(o));f>=0&&(y[f]={...y[f],name:n,description:a,price:s,category:d,isVeg:r,isAvailable:I,image:u})}else{const{data:l,error:f}=await m.from("menu_items").insert({name:n,description:a,price:s,category:d,is_veg:r,is_available:I,image:u,rating:4}).select().single();if(f)throw f;l&&y.push({id:l.id,name:l.name,description:l.description,price:parseFloat(l.price),category:l.category,isVeg:l.is_veg,isAvailable:l.is_available,image:l.image,rating:parseFloat(l.rating)})}w(),bootstrap.Modal.getInstance(document.getElementById("menuModal")).hide(),c("Menu item saved successfully!","success")}catch(l){console.error("Error saving menu item:",l),c("Failed to save menu item","error")}}async function V(t){if(confirm("Are you sure you want to delete this item?"))try{const{error:e}=await m.from("menu_items").delete().eq("id",t);if(e)throw e;y=y.filter(o=>o.id!==t),w(),c("Menu item deleted successfully!","success")}catch(e){console.error("Error deleting menu item:",e),c("Failed to delete menu item","error")}}function E(){var n;const t=document.getElementById("ordersTable");if(!t)return;const e=((n=document.getElementById("orderStatusFilter"))==null?void 0:n.value)||"all";let o=g;e!=="all"&&(o=o.filter(a=>a.status===e)),t.innerHTML=o.map(a=>`
        <tr>
            <td>${a.orderId}</td>
            <td>${a.customerName}</td>
            <td>${a.mobile}</td>
            <td>₹${a.total}</td>
            <td>
                <select class="form-select form-select-sm" onchange="updateOrderStatus('${a.orderId}', this.value)">
                    <option value="New" ${a.status==="New"?"selected":""}>New</option>
                    <option value="Accepted" ${a.status==="Accepted"?"selected":""}>Accepted</option>
                    <option value="Preparing" ${a.status==="Preparing"?"selected":""}>Preparing</option>
                    <option value="Ready" ${a.status==="Ready"?"selected":""}>Ready</option>
                    <option value="Out For Delivery" ${a.status==="Out For Delivery"?"selected":""}>Out For Delivery</option>
                    <option value="Delivered" ${a.status==="Delivered"?"selected":""}>Delivered</option>
                </select>
            </td>
            <td>${a.date}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewOrder('${a.orderId}')"><i class="fas fa-eye"></i></button>
                <button class="btn btn-sm btn-secondary" onclick="printOrder('${a.orderId}')"><i class="fas fa-print"></i></button>
            </td>
        </tr>
    `).join("")}async function J(t,e){try{const{error:o}=await m.from("orders").update({status:e}).eq("order_id",t);if(o)throw o;const n=g.find(a=>a.orderId===t);n&&(n.status=e),c(`Order ${t} status updated to ${e}`,"success"),E(),O()}catch(o){console.error("Error updating order status:",o),c("Failed to update order status","error")}}function U(t){const e=g.find(o=>o.orderId===t);e&&(document.getElementById("viewOrderContent").innerHTML=`
        <div class="row">
            <div class="col-md-6">
                <p><strong>Order ID:</strong> ${e.orderId}</p>
                <p><strong>Customer:</strong> ${e.customerName}</p>
                <p><strong>Mobile:</strong> ${e.mobile}</p>
                <p><strong>Address:</strong> ${e.address}</p>
                <p><strong>Landmark:</strong> ${e.landmark||"N/A"}</p>
            </div>
            <div class="col-md-6">
                <p><strong>Payment:</strong> ${e.paymentMethod}</p>
                <p><strong>Status:</strong> <span class="badge-status ${e.status.toLowerCase().replace(/\s/g,"-")}">${e.status}</span></p>
                <p><strong>Date:</strong> ${e.date}</p>
                <p><strong>Time:</strong> ${e.time}</p>
                <p><strong>Notes:</strong> ${e.notes||"N/A"}</p>
            </div>
        </div>
        <hr>
        <h6>Order Items</h6>
        <table class="table table-sm">
            <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
            <tbody>
                ${e.items.map(o=>`
                    <tr><td>${o.name}</td><td>${o.quantity}</td><td>₹${o.price}</td><td>₹${o.price*o.quantity}</td></tr>
                `).join("")}
            </tbody>
            <tfoot>
                <tr class="fw-bold"><td colspan="3">Total</td><td>₹${e.total}</td></tr>
            </tfoot>
        </table>
    `,new bootstrap.Modal(document.getElementById("viewOrderModal")).show())}function W(t){const e=g.find(n=>n.orderId===t);if(!e)return;const o=window.open("","_blank");o.document.write(`
        <html><head><title>Order ${t}</title>
        <style>body{font-family:Arial;padding:20px;}table{width:100%;border-collapse:collapse;}th,td{border:1px solid #ddd;padding:8px;text-align:left;}</style>
        </head><body>
        <h2>Order Receipt - ${t}</h2>
        <p><strong>Customer:</strong> ${e.customerName}</p>
        <p><strong>Mobile:</strong> ${e.mobile}</p>
        <p><strong>Address:</strong> ${e.address}</p>
        <p><strong>Date:</strong> ${e.date} ${e.time}</p>
        <hr>
        <table>
            <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
            <tbody>
                ${e.items.map(n=>`
                    <tr><td>${n.name}</td><td>${n.quantity}</td><td>₹${n.price}</td><td>₹${n.price*n.quantity}</td></tr>
                `).join("")}
            </tbody>
        </table>
        <h3 style="text-align:right">Total: ₹${e.total}</h3>
        </body></html>
    `),o.document.close(),o.print()}function T(){const t=document.getElementById("searchOrders").value.toLowerCase(),e=document.getElementById("ordersTable");if(!e)return;const o=g.filter(n=>n.orderId.toLowerCase().includes(t)||n.customerName.toLowerCase().includes(t)||n.mobile.includes(t));e.innerHTML=o.map(n=>`
        <tr>
            <td>${n.orderId}</td>
            <td>${n.customerName}</td>
            <td>${n.mobile}</td>
            <td>₹${n.total}</td>
            <td>
                <select class="form-select form-select-sm" onchange="updateOrderStatus('${n.orderId}', this.value)">
                    <option value="New" ${n.status==="New"?"selected":""}>New</option>
                    <option value="Accepted" ${n.status==="Accepted"?"selected":""}>Accepted</option>
                    <option value="Preparing" ${n.status==="Preparing"?"selected":""}>Preparing</option>
                    <option value="Ready" ${n.status==="Ready"?"selected":""}>Ready</option>
                    <option value="Out For Delivery" ${n.status==="Out For Delivery"?"selected":""}>Out For Delivery</option>
                    <option value="Delivered" ${n.status==="Delivered"?"selected":""}>Delivered</option>
                </select>
            </td>
            <td>${n.date}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewOrder('${n.orderId}')"><i class="fas fa-eye"></i></button>
                <button class="btn btn-sm btn-secondary" onclick="printOrder('${n.orderId}')"><i class="fas fa-print"></i></button>
            </td>
        </tr>
    `).join("")}function Z(){const t=document.getElementById("customersTable");t&&(t.innerHTML=v.map((e,o)=>{var a;const n=e.orders_count||0;return`
        <tr>
            <td>${((a=e.id)==null?void 0:a.substring(0,8))||"N/A"}</td>
            <td>${e.name||"N/A"}</td>
            <td>${e.mobile||"N/A"}</td>
            <td>${e.email||"-"}</td>
            <td>${n}</td>
            <td>${e.joined_date||"-"}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewCustomerOrders(${o})"><i class="fas fa-eye"></i></button>
            </td>
        </tr>
    `}).join(""))}function z(t){const e=v[t],o=g.filter(s=>s.mobile===e.mobile),n=document.getElementById("viewCustomerContent");if(!n)return;n.innerHTML=`
        <h6>${e.name||"Customer"}'s Order History</h6>
        ${o.length===0?"<p>No orders found.</p>":`
            <table class="table table-sm">
                <thead><tr><th>Order ID</th><th>Date</th><th>Total</th><th>Status</th></tr></thead>
                <tbody>
                    ${o.map(s=>`
                        <tr><td>${s.orderId}</td><td>${s.date}</td><td>₹${s.total}</td>
                        <td><span class="badge-status ${s.status.toLowerCase().replace(/\s/g,"-")}">${s.status}</span></td></tr>
                    `).join("")}
                </tbody>
            </table>
        `}
    `;const a=document.getElementById("viewCustomerModal");a&&new bootstrap.Modal(a).show()}function X(){if(!i.business_name||!document.getElementById("settingsForm"))return;document.getElementById("settingBusinessName").value=i.business_name,document.getElementById("settingTagline").value=i.tagline||"",document.getElementById("settingContact").value=i.contact_number||"",document.getElementById("settingWhatsApp").value=i.whatsapp_number||"",document.getElementById("settingAddress").value=i.address||"",document.getElementById("settingEmail").value=i.email||"";const e=i.social_media;e&&typeof e=="object"&&(document.getElementById("settingFacebook").value=e.facebook||"",document.getElementById("settingInstagram").value=e.instagram||"",document.getElementById("settingTwitter").value=e.twitter||"")}async function D(t){t.preventDefault();const e=document.getElementById("settingBusinessName").value.trim(),o=document.getElementById("settingTagline").value.trim(),n=document.getElementById("settingContact").value.trim(),a=document.getElementById("settingWhatsApp").value.trim(),s=document.getElementById("settingAddress").value.trim(),u=document.getElementById("settingEmail").value.trim(),d={facebook:document.getElementById("settingFacebook").value.trim(),instagram:document.getElementById("settingInstagram").value.trim(),twitter:document.getElementById("settingTwitter").value.trim()};try{const{error:r}=await m.from("settings").update({business_name:e,tagline:o,contact_number:n,whatsapp_number:a,address:s,email:u,social_media:d,updated_at:new Date().toISOString()}).eq("id",1);if(r)throw r;i.business_name=e,i.tagline=o,i.contact_number=n,i.whatsapp_number=a,i.address=s,i.email=u,i.social_media=d,c("Settings saved successfully!","success")}catch(r){console.error("Error saving settings:",r),c("Failed to save settings","error")}}function c(t,e="info"){const o=document.querySelector(".toast-container")||Y(),n=document.createElement("div");n.className=`custom-toast ${e}`;const a={success:"fa-check-circle",error:"fa-times-circle",warning:"fa-exclamation-triangle",info:"fa-info-circle"};n.innerHTML=`<i class="fas ${a[e]||a.info}"></i><span>${t}</span>`,o.appendChild(n),setTimeout(()=>{n.style.animation="slideOut 0.3s ease forwards",setTimeout(()=>n.remove(),300)},3e3)}function Y(){const t=document.createElement("div");return t.className="toast-container",document.body.appendChild(t),t}function K(){var t;(t=document.querySelector(".admin-sidebar"))==null||t.classList.toggle("show")}document.addEventListener("DOMContentLoaded",function(){window.location.pathname.includes("login.html")||S(),k();const t=document.getElementById("loginForm");t&&t.addEventListener("submit",M);const e=document.getElementById("categoryForm");e&&e.addEventListener("submit",C);const o=document.getElementById("menuForm");o&&o.addEventListener("submit",A);const n=document.getElementById("settingsForm");n&&n.addEventListener("submit",D);const a=document.getElementById("orderStatusFilter");a&&a.addEventListener("change",E);const s=document.getElementById("searchOrders");s&&s.addEventListener("input",T)});window.login=M;window.logout=x;window.showAddCategoryModal=j;window.editCategory=q;window.saveCategory=C;window.deleteCategory=P;window.showAddMenuModal=H;window.editMenuItem=R;window.saveMenuItem=A;window.deleteMenuItem=V;window.updateOrderStatus=J;window.viewOrder=U;window.printOrder=W;window.searchOrders=T;window.viewCustomerOrders=z;window.saveSettings=D;window.toggleSidebar=K;
