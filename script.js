/*
  ZAMAN SON PRODUCT LIST
  ------------------------------------------
  Naya product add karne ke liye neeche products array mein
  ek aur object copy karein.

  image: apni image ka file name, example "mobile.jpg"
  price: original price
  discount: percentage, example 20 = 20% OFF
*/
const products = [
  {id:1,name:"Premium Product",category:"New Arrival",price:5000,discount:10,image:""},
  {id:2,name:"Featured Item",category:"Popular",price:3500,discount:15,image:""},
  {id:3,name:"New Collection",category:"New Arrival",price:2500,discount:20,image:""},
  {id:4,name:"Special Product",category:"Special Offer",price:7000,discount:25,image:""}
];

let cart = [];

function money(n){return "Rs " + Math.round(n).toLocaleString("en-PK");}

function renderProducts(){
  const grid=document.getElementById("productsGrid");
  const q=document.getElementById("searchInput").value.toLowerCase().trim();
  const filtered=products.filter(p => (p.name+" "+p.category).toLowerCase().includes(q));

  if(!filtered.length){
    grid.innerHTML='<div class="empty">No products found.</div>';
    return;
  }

  grid.innerHTML=filtered.map(p=>{
    const sale=Math.round(p.price*(1-p.discount/100));
    const image=p.image
      ? `<img src="${p.image}" alt="${p.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">`
      : "";
    return `
      <article class="product">
        ${p.discount>0 ? `<div class="discount">${p.discount}% OFF</div>` : ""}
        <div class="product-img">
          ${image}
          <div class="placeholder" style="${p.image?'display:none':''}">🛍️</div>
        </div>
        <div class="product-body">
          <div class="category">${p.category}</div>
          <h3>${p.name}</h3>
          <div class="price">
            <span class="new-price">${money(sale)}</span>
            ${p.discount>0 ? `<span class="old-price">${money(p.price)}</span>` : ""}
          </div>
          <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </article>`;
  }).join("");
}

function addToCart(id){
  const product=products.find(p=>p.id===id);
  const item=cart.find(x=>x.id===id);
  if(item) item.qty++;
  else cart.push({id:product.id,qty:1});
  renderCart();
  toggleCart(true);
}

function renderCart(){
  const box=document.getElementById("cartItems");
  if(!cart.length){
    box.innerHTML='<div class="empty">Your cart is empty.</div>';
  }else{
    box.innerHTML=cart.map(item=>{
      const p=products.find(x=>x.id===item.id);
      const sale=Math.round(p.price*(1-p.discount/100));
      return `<div class="cart-row">
        <div><strong>${p.name}</strong><br><small>${money(sale)} × ${item.qty}</small></div>
        <button class="remove" onclick="removeFromCart(${p.id})">Remove</button>
      </div>`;
    }).join("");
  }
  const total=cart.reduce((sum,item)=>{
    const p=products.find(x=>x.id===item.id);
    return sum + Math.round(p.price*(1-p.discount/100))*item.qty;
  },0);
  document.getElementById("cartTotal").textContent=money(total);
  document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
}

function removeFromCart(id){
  cart=cart.filter(x=>x.id!==id);
  renderCart();
}

function toggleCart(force){
  const panel=document.getElementById("cartPanel");
  const overlay=document.getElementById("overlay");
  const open=force===true || !panel.classList.contains("open");
  panel.classList.toggle("open",open);
  overlay.classList.toggle("show",open);
}

function checkoutWhatsApp(){
  if(!cart.length){alert("Cart is empty.");return;}
  let message="Assalam-o-Alaikum, I want to order from ZAMAN SON:%0A%0A";
  let total=0;
  cart.forEach(item=>{
    const p=products.find(x=>x.id===item.id);
    const sale=Math.round(p.price*(1-p.discount/100));
    total+=sale*item.qty;
    message+=`${encodeURIComponent(p.name)} x ${item.qty} = ${encodeURIComponent(money(sale*item.qty))}%0A`;
  });
  message+=`%0ATotal: ${encodeURIComponent(money(total))}`;
  window.open("https://wa.me/923209569295?text="+message,"_blank");
}

document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();
renderCart();
