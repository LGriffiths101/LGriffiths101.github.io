// Initialize cart in localStorage if it doesn't exist
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToBasket(productName, price) {
    const item = { name: productName, price: price, quantity: 1 };
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to your basket!`);
    updateBasketDisplay();
}

function removeFromBasket(productName) {
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateBasketDisplay();
}

function clearBasket() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateBasketDisplay();
}

function updateBasketDisplay() {
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');

    if (cartItems && totalAmount) {
        cartItems.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Your basket is empty.</p>';
        } else {
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                cartItems.innerHTML += `
                    <div class="cart-item">
                        <p>${item.name} - £${item.price.toFixed(2)} x ${item.quantity}</p>
                        <button class="cta remove-btn" onclick="removeFromBasket('${item.name}')">Remove</button>
                    </div>
                `;
            });
        }

        totalAmount.textContent = total.toFixed(2);
    }
}

// Load cart on page load
document.addEventListener('DOMContentLoaded', updateBasketDisplay);
