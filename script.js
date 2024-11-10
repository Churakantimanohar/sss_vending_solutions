// Function to update the cart count on the header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0); // Sum up all item quantities
    document.getElementById('cart-count').textContent = cartCount; // Update the cart count in the HTML
}

// Call this function when the page loads
window.onload = updateCartCount;

