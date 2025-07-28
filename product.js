// products.js
import { db } from './firebase-config.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const productsDiv = document.getElementById('products');
const cartDiv = document.getElementById('cart');
let cart = [];

async function getProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));

  // Clear existing content
  productsDiv.innerHTML = "";

  const categories = {
    "Indian Tea": [],
    "Coffee": [],
    "Non-Traditional": []
  };

  querySnapshot.forEach((doc) => {
    const product = doc.data();
    categories[product.category]?.push(product);  // Categorize based on product.category
  });

  for (const category in categories) {
    if (categories[category].length > 0) {
      productsDiv.innerHTML += `<h2 class="category-title">${category}</h2><div class="category-row" id="${category.replace(/\s/g, "-")}"></div>`;

      const rowDiv = document.getElementById(category.replace(/\s/g, "-"));

      categories[category].forEach((product) => {
        const productHTML = `
          <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>₹${product.price}</strong></p>
            <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
          </div>
        `;
        rowDiv.innerHTML += productHTML;
      });
    }
  }
}


window.addToCart = function(product) {
  cart.push(product);
  renderCart();
};

window.removeFromCart = function(index) {
  cart.splice(index, 1);
  renderCart();
};

function renderCart() {
  cartDiv.innerHTML = '';
  if (cart.length === 0) {
    cartDiv.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }
  // Example for storing when user clicks on a product
function onProductClick(name) {
  let activity = JSON.parse(localStorage.getItem("userActivity")) || [];
  activity.push(name);
  localStorage.setItem("userActivity", JSON.stringify(activity));
}


  cart.forEach((item, index) => {
    cartDiv.innerHTML += `
      <p>
        ${item.name} - ₹${item.price}
        <button onclick="removeFromCart(${index})">Remove</button>
      </p>
    `;
  });

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);
  cartDiv.innerHTML += `<h3>Total: ₹${total}</h3>`;
}

getProducts();
