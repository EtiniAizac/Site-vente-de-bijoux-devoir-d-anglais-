// Check if the cart is already initialized in local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add an item to the cart
function addToCart(itemName, price) {
  const item = { name: itemName, price: price, quantity: 1 };

  const existingItem = cart.find(i => i.name === itemName);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push(item);
  }

  // Save the updated cart to local storage
  localStorage.setItem('cart', JSON.stringify(cart));

  alert(`${itemName} has been added to your cart.`);
}

// Function to load cart content on the cart page
function loadCart() {
  const cartContent = document.getElementById("cart-content");
  const cartTotal = document.getElementById("cart-total");

  cartContent.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "product";

    itemDiv.innerHTML = `
            <p>${item.name} - $${item.price} (Quantity: ${item.quantity})</p>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;

    cartContent.appendChild(itemDiv);

    total += item.price * item.quantity;
  });

  cartTotal.textContent = `$${total}`;
}

// Function to remove an item from the cart
function removeFromCart(itemName) {
  cart = cart.filter(i => i.name !== itemName);

  localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to local storage
  loadCart(); // Reload cart content
}

// Ensure the cart is loaded on page load
window.onload = function() {
  if (document.getElementById("cart-content")) {
    loadCart();
  }
};
