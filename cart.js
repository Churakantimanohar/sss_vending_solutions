// Fetch cart items from local storage (or use an empty array if none exist)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update the cart count on all pages
function updateCartCount() {
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Render the cart items dynamically on the cart page
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous items
    
    let totalPrice = 0;

    // Loop through cart items and display each one
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Price: ₹${item.price}</p> <!-- Updated to rupees -->
                <p>Quantity: ${item.quantity}</p>
                <button class="delete-item" onclick="removeItem('${item.name}')">Delete</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
        totalPrice += item.price * item.quantity;
    });

    // Update the total price in rupees
    document.getElementById('total-amount').textContent = `₹${totalPrice.toFixed(2)}`;

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); // Refresh cart count display
}

// Remove a specific item from the cart by its name
function removeItem(productName) {
    cart = cart.filter(item => item.name !== productName);
    renderCart(); // Re-render the cart after deleting the item
}

// Checkout button functionality
function checkout() {
    if (cart.length > 0) {
        alert('Proceeding to checkout...');
    } else {
        alert('Your cart is empty!');
    }
}

// Attach the checkout function to the checkout button
document.getElementById('checkout-btn').addEventListener('click', checkout);

// Initialize the page by displaying cart items and updating the cart count
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    updateCartCount();
});

function addToCart(item) {
    // Get the existing cart from localStorage or initialize an empty array if it doesn't exist
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item already exists in the cart
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
        // If item exists, increase the quantity
        existingItem.quantity += 1;
    } else {
        // Add new item, ensuring image URL is correct
        const newItem = {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.image // <-- Ensure this is the correct image URL or path
        };
        cart.push(newItem);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}
