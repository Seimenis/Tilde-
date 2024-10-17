document.addEventListener('DOMContentLoaded', function() {
    const submitFlightDetailsButton = document.getElementById('submit-flight-details');
    const inflightOptionsContainer = document.getElementById('inflight-options');
    const toilet1Status = document.getElementById('toilet1-status');
    const toilet2Status = document.getElementById('toilet2-status');
    const statusMessage = document.getElementById('status-message');
    
    const orderFoodButton = document.getElementById('order-food');
    const requestHeadphonesButton = document.getElementById('request-headphones');
    const foodMenuModal = document.getElementById('food-menu-modal');
    const cartModal = document.getElementById('cart-modal');
    const checkoutModal = document.getElementById('checkout-modal');
    const viewCartButton = document.getElementById('view-cart');
    const closeMenuPopupButton = document.getElementById('close-menu-popup');
    const closeCartPopupButton = document.getElementById('close-cart-popup');
    const closeCheckoutPopupButton = document.getElementById('close-checkout-popup');
    const confirmCheckoutButton = document.getElementById('confirm-checkout');
    
    const menuItemsDiv = document.getElementById('menu-items');
    const cartItemsDiv = document.getElementById('cart-items');
    const modalConfirmation = document.createElement('div'); // confirmation container
    modalConfirmation.classList.add('modal-confirmation');
    
    let cart = [];
    
    // flight number prefill
    const urlParams = new URLSearchParams(window.location.search);
    const flightNumber = urlParams.get('flightNumber');
    if (flightNumber) {
        document.getElementById('flight-number').value = flightNumber;
    }

    // lock body scroll
    function lockScroll() {
        document.body.classList.add('lock-scroll');
    }

    // unlock when modal closed
    function unlockScroll() {
        document.body.classList.remove('lock-scroll');
    }

    // inflight deats
    submitFlightDetailsButton.addEventListener('click', function() {
        const flightNumber = document.getElementById('flight-number').value;
        const seatNumber = document.getElementById('seat-number').value;
        const seatSection = document.getElementById('seat-section').value;

        if (flightNumber && seatNumber) {
            inflightOptionsContainer.style.display = 'block';

            // toilet availbility
            toilet1Status.textContent = Math.random() > 0.5 ? 'Taken' : 'Available';
            toilet2Status.textContent = Math.random() > 0.5 ? 'Taken' : 'Available';

            statusMessage.textContent = `Welcome to flight ${flightNumber}, seat ${seatNumber} (${seatSection}). Choose your services.`;
        } else {
            statusMessage.textContent = 'Please enter both flight number and seat number.';
        }
    });

    // headphone confirmation
    requestHeadphonesButton.addEventListener('click', function() {
        statusMessage.textContent = 'Your request for headphones has been confirmed!';
    });

    // food menu modal
    orderFoodButton.addEventListener('click', function() {
        const menuItems = [
            { name: 'Chicken Sandwich', price: 10, ingredients: 'Chicken, Lettuce, Tomato, Mayo', image: 'chicken_sandwich.jpg' },
            { name: 'Pasta Salad', price: 8, ingredients: 'Pasta, Vegetables, Olive Oil', image: 'pasta_salad.jpg' },
            { name: 'Cheese Plate', price: 7, ingredients: 'Cheddar, Brie, Crackers', image: 'cheese_plate.jpg' },
            { name: 'Fruit Cup', price: 5, ingredients: 'Seasonal Fruits', image: 'fruit_cup.jpg' },
            { name: 'Grilled Veggie Wrap', price: 9, ingredients: 'Grilled Veggies, Hummus', image: 'veggie_wrap.jpg' },
            { name: 'Chocolate Brownie', price: 4, ingredients: 'Chocolate, Sugar, Flour', image: 'brownie.jpg' },
            { name: 'Chips', price: 3, ingredients: 'Potatoes, Salt', image: 'chips.jpg' },
            { name: 'Pretzels', price: 2, ingredients: 'Flour, Salt, Water', image: 'pretzels.jpg' },
            { name: 'Water', price: 2, ingredients: 'Pure Water', image: 'water.jpg' },
            { name: 'Soda', price: 3, ingredients: 'Carbonated Water, Sugar', image: 'soda.jpg' },
            { name: 'White Wine', price: 12, ingredients: 'Chardonnay', image: 'white_wine.jpg' },
            { name: 'Red Wine', price: 12, ingredients: 'Merlot', image: 'red_wine.jpg' },
            { name: 'Beer', price: 6, ingredients: 'Lager', image: 'beer.jpg' }
        ];

        menuItemsDiv.innerHTML = ''; // clear previous

        // menu items
        menuItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            menuItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="menu-photo">
                <div class="menu-info">
                    <h4>${item.name} - $${item.price}</h4>
                    <p class="ingredients">${item.ingredients}</p>
                    <button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
                </div>
            `;
            menuItemsDiv.appendChild(menuItem);
        });

        foodMenuModal.style.display = 'flex'; // modal
        lockScroll();
    });

    // Close the food menu modal
    closeMenuPopupButton.addEventListener('click', function() {
        foodMenuModal.style.display = 'none';
        unlockScroll();
    });

    menuItemsDiv.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart')) {
            const itemName = event.target.getAttribute('data-name');
            const itemPrice = parseFloat(event.target.getAttribute('data-price'));

            // item check
            const existingItem = cart.find(item => item.name === itemName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: itemName, price: itemPrice, quantity: 1 }); // add new item with quantity
            }

            modalConfirmation.textContent = `${itemName} has been added to your cart.`;
            menuItemsDiv.appendChild(modalConfirmation);

            // timeout
            setTimeout(() => {
                modalConfirmation.textContent = '';
            }, 3000);
        }
    });

    // view Cart
    viewCartButton.addEventListener('click', function() {
        cartItemsDiv.innerHTML = '';

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} - $${item.price} x ${item.quantity}</p>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            cartItemsDiv.appendChild(cartItem);
        });

        cartModal.style.display = 'flex'; // cart modal
        lockScroll();
    });

    // close modal
    closeCartPopupButton.addEventListener('click', function() {
        cartModal.style.display = 'none';
        unlockScroll();
    });

    // remove cart
    cartItemsDiv.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-from-cart')) {
            const index = parseInt(event.target.getAttribute('data-index'));
            cart.splice(index, 1);
            event.target.parentElement.remove();
        }
    });

    // checkout
    document.getElementById('checkout').addEventListener('click', function() {
        cartModal.style.display = 'none';
        checkoutModal.style.display = 'flex';
        lockScroll();
    });

    // close checkout modal
    closeCheckoutPopupButton.addEventListener('click', function() {
        checkoutModal.style.display = 'none';
        unlockScroll();
    });

    confirmCheckoutButton.addEventListener('click', function() {
        const cardNumber = document.getElementById('card-number').value;
        const cardExpiration = document.getElementById('card-expiration').value;
        const cardCvv = document.getElementById('card-cvv').value;
        const email = document.getElementById('email').value;

        if (cardNumber && cardExpiration && cardCvv && email) {
            statusMessage.textContent = 'Your order has been placed. An email receipt has been sent. Your order will arrive in approximately 15 minutes.';
            checkoutModal.style.display = 'none';
            unlockScroll();

            // reset
            cart = [];
        } else {
            statusMessage.textContent = 'Please complete all fields in the checkout form.';
        }
    });
});
