// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGqUDYOALXTjyAGEcw4q4XAaSEVCDE3Ag",
  authDomain: "mystore-32f4c.firebaseapp.com",
  projectId: "mystore-32f4c",
  storageBucket: "mystore-32f4c.appspot.com",
  messagingSenderId: "476881423071",
  appId: "1:476881423071:web:11cf122e551a07b842f76a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const productsDiv = document.getElementById('products');
const cartDiv = document.getElementById('cart');
let cart = [];

// Fetch and display products
async function getProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));

  // Grouping by categories
  const categories = {
    "Indian Tea": [],
    "Coffee": [],
    "Non-Traditional": []
  };

  querySnapshot.forEach((doc) => {
    const product = doc.data();
    const category = product.category || "Uncategorized";

    if (!categories[category]) {
      categories[category] = [];
    }

    categories[category].push({ id: doc.id, ...product });
  });

  const productsContainer = document.getElementById("products");

  // Clear container
  productsContainer.innerHTML = "";

  // Display categorized products
  for (const category in categories) {
    if (categories[category].length > 0) {
      productsContainer.innerHTML += `
        <h2 class="category-title">${category}</h2>
        <div class="category-row" id="row-${category.replace(/\s/g, '-')}" ></div>
      `;

      const rowDiv = document.getElementById(`row-${category.replace(/\s/g, '-')}`);

      categories[category].forEach((product) => {
        const productHTML = `
          <div class="product">
            <img src="${product.image}" alt="${product.name}" />
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

// Add to cart
window.addToCart = function(product) {
  cart.push(product);
  renderCart();
};

// Remove from cart
window.removeFromCart = function(index) {
  cart.splice(index, 1);
  renderCart();
};

// Render cart
function renderCart() {
  cartDiv.innerHTML = '';
  if (cart.length === 0) {
    cartDiv.innerHTML = '<p>Your cart is empty.</p>';
    return;
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

// Load products
getProducts();
