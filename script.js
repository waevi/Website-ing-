// ==========================================
// 1. SNEAKER DATABASE
// ==========================================
const sneakers = [
    { 
        id: 1, 
        name: "ming ngu", 
        price: 120, 
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80" 
    },
    { 
        id: 2, 
        name: "Street Classic", 
        price: 85, 
        img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=300&q=80" 
    }
];

// ==========================================
// 2. BUILD THE STORE & INTERACTIVITY
// ==========================================
window.onload = function() {
    loadCart();
    renderStore();
};

function renderStore() {
    const grid = document.getElementById('store-grid');
    grid.innerHTML = ""; 

    sneakers.forEach(shoe => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <img src="${shoe.img}" id="shoe-img-${shoe.id}" class="shoe-image">
            <h3>${shoe.name}</h3>
            <p style="color: #555; font-weight: bold;">$${shoe.price}</p>
            
            <p style="font-size: 12px; margin-bottom: 5px;">Choose Color:</p>
            <div class="color-options">
                <div class="color-dot" style="background: #ff4757;" onclick="changeColor(${shoe.id}, 0)"></div>
                <div class="color-dot" style="background: #1e90ff;" onclick="changeColor(${shoe.id}, 200)"></div>
                <div class="color-dot" style="background: #2ed573;" onclick="changeColor(${shoe.id}, 90)"></div>
            </div>

            <p style="font-size: 12px; margin-bottom: 5px;">Choose Size:</p>
            <div class="size-options">
                <button class="size-btn" onclick="alert('Size 8 selected!')">8</button>
                <button class="size-btn" onclick="alert('Size 9 selected!')">9</button>
                <button class="size-btn" onclick="alert('Size 10 selected!')">10</button>
            </div>

            <button class="add-btn" onclick="addToCart('${shoe.name}', ${shoe.price})">Add to Cart</button>
        `;
        grid.appendChild(card);
    });
}

function changeColor(shoeId, hueValue) {
    const img = document.getElementById(`shoe-img-${shoeId}`);
    img.style.filter = `hue-rotate(${hueValue}deg)`;
}

// ==========================================
// 3. SHOPPING CART (LOCAL STORAGE)
// ==========================================
let cart = [];

function loadCart() {
    let saved = localStorage.getItem('sneakerCart');
    if (saved) {
        cart = JSON.parse(saved);
        document.getElementById('cart-count').innerText = cart.length;
    }
}

function addToCart(name, price) {
    cart.push({ name: name, price: price });
    localStorage.setItem('sneakerCart', JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cart.length;
    alert(`${name} added to your cart!`);
}

// Here is the fully fixed clearCart function!
function clearCart() {
    cart = []; // Empty the array
    localStorage.removeItem('sneakerCart'); // Remove from browser database
    document.getElementById('cart-count').innerText = "0"; // Reset screen counter
    alert("Your cart has been cleared!");
}

// ==========================================
// 4. CHATBOT LOGIC
// ==========================================
function toggleChat() {
    const chatBody = document.getElementById('chat-body');
    if (chatBody.style.display === 'none') {
        chatBody.style.display = 'block';
    } else {
        chatBody.style.display = 'none';
    }
}

function sendMessage() {
    const inputField = document.getElementById('chat-input');
    const message = inputField.value.trim();
    if (message === "") return; 

    addMessage("You", message);
    inputField.value = ''; 

    setTimeout(() => {
        botReply(message.toLowerCase());
    }, 500);
}

function addMessage(sender, text) {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML += `<p><strong>${sender}:</strong> ${text}</p>`;
    chatMessages.scrollTop = chatMessages.scrollHeight; 
}

function botReply(userMessage) {
    let reply = "I'm not sure about that. Try asking about 'shipping', 'sizes', or 'returns'.";

    if (userMessage.includes("hello") || userMessage.includes("hi")) {
        reply = "Yo! Welcome to HypeKicks. How can I help you today?";
    } else if (userMessage.includes("shipping") || userMessage.includes("delivery")) {
        reply = "We offer FREE 2-day shipping on all sneaker orders!";
    } else if (userMessage.includes("size") || userMessage.includes("fit")) {
        reply = "Our shoes run true to size. If you are a half size, we recommend sizing up.";
    } else if (userMessage.includes("return") || userMessage.includes("refund")) {
        reply = "You can return any unworn sneakers within 30 days for a full refund.";
    }

    addMessage("Bot", reply);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}