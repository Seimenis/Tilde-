const buttons = document.querySelectorAll('.button');
const dropdowns = document.querySelectorAll('.dropdown');

buttons.forEach((button, index) => {
    button.addEventListener('click', function() {
        // remove active class
        buttons.forEach(btn => btn.classList.remove('active'));
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));

        button.classList.add('active');
        dropdowns[index].classList.add('active');
    });
});

// flight deal button clicks
const dealButtons = document.querySelectorAll('.deal-card');
dealButtons.forEach(button => {
    button.addEventListener('click', function() {
        const destination = button.querySelector('h3').textContent;
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        window.location.href = `flights.html?to=${encodeURIComponent(destination)}&date=${today}`;
    });
});

// destination button clicks
const destinationButtons = document.querySelectorAll('.destination');
destinationButtons.forEach(button => {
    button.addEventListener('click', function() {
        const destination = button.querySelector('p').textContent;
        const today = new Date().toISOString().split('T')[0]; // Get today's date
        window.location.href = `flights.html?to=${encodeURIComponent(destination)}&date=${today}`;
    });
});

// flight search
document.querySelector('.dropdown:nth-child(1) .input-group button').addEventListener('click', function() {
    const from = document.querySelector('.dropdown:nth-child(1) input[placeholder="From"]').value;
    const to = document.querySelector('.dropdown:nth-child(1) input[placeholder="To"]').value;
    const date = document.querySelector('.dropdown:nth-child(1) input[type="date"]').value || new Date().toISOString().split('T')[0]; // daily default

    if (from && to) {
        window.location.href = `flights.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`;
    } else {
        alert('Please enter both "From" and "To" locations.');
    }
});

// manage flights redirect
document.querySelector('.dropdown:nth-child(2) .input-group button').addEventListener('click', function() {
    const bookingReference = document.querySelector('.dropdown:nth-child(2) input[placeholder="Booking Reference"]').value;
    const lastName = document.querySelector('.dropdown:nth-child(2) input[placeholder="Last Name"]').value;

    if (bookingReference && lastName) {
        window.location.href = `manage-flights.html?ref=${encodeURIComponent(bookingReference)}&lname=${encodeURIComponent(lastName)}`;
    } else {
        alert('Please enter both booking reference and last name.');
    }
});

document.querySelector('.dropdown:nth-child(3) .input-group button').addEventListener('click', function() {
    const flightNumber = document.querySelector('.dropdown:nth-child(3) input[placeholder="Flight Number"]').value;

    if (flightNumber) {
        window.location.href = `inflight-services.html?flightNumber=${encodeURIComponent(flightNumber)}`;
    } else {
        alert('Please enter a flight number to view services.');
    }
});
