document.addEventListener('DOMContentLoaded', function () {
    // url parameters
    const urlParams = new URLSearchParams(window.location.search);
    const from = urlParams.get('from') || '';
    const to = urlParams.get('to') || '';
    const date = urlParams.get('date') || new Date().toISOString().split('T')[0];

    // prefilled
    document.getElementById('from').value = from;
    document.getElementById('to').value = to;
    document.getElementById('date').value = date;


});

document.getElementById('flight-search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;

    const flights = [
        { airline: 'FlyDreamAir', flightNumber: 'FD123', price: '$199', time: '08:00 AM' },
        { airline: 'AirSky', flightNumber: 'AS456', price: '$249', time: '10:00 AM' },
        { airline: 'BlueJet', flightNumber: 'BJ789', price: '$299', time: '12:00 PM' },
        { airline: 'JetAir', flightNumber: 'JA001', price: '$179', time: '02:00 PM' },
        { airline: 'SkyLine', flightNumber: 'SL002', price: '$239', time: '04:00 PM' },
        { airline: 'FlyHigh', flightNumber: 'FH345', price: '$289', time: '06:00 PM' },
        { airline: 'WingAir', flightNumber: 'WA123', price: '$329', time: '08:00 PM' }
    ];

    const flightResults = document.getElementById('flight-results');
    flightResults.innerHTML = '';

    flights.forEach(flight => {
        const resultCard = document.createElement('div');
        resultCard.classList.add('result-card');
        resultCard.innerHTML = `
            <h3>${flight.airline} - Flight ${flight.flightNumber}</h3>
            <p>From: ${from}</p>
            <p>To: ${to}</p>
            <p>Date: ${date}</p>
            <p>Time: ${flight.time}</p>
            <p class="price">${flight.price}</p>
        `;
        resultCard.addEventListener('click', function() {
            document.querySelectorAll('.result-card').forEach(card => card.classList.remove('selected'));
            resultCard.classList.add('selected');
            document.getElementById('booking-popup').style.display = 'flex';
        });
        flightResults.appendChild(resultCard);
    });
});

// booking form submission
document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const passportNumber = document.getElementById('passport-number').value;
    const cardNumber = document.getElementById('card-number').value;
    const cardExpiration = document.getElementById('card-expiration').value;
    const cardCvv = document.getElementById('card-cvv').value;

    // dummy reference gen
    const bookingReference = 'FD' + Math.floor(Math.random() * 100000);

    // caches booking reference
    const bookingDetails = {
        reference: bookingReference,
        fullName: fullName,
        email: email,
        passportNumber: passportNumber,
        cardNumber: cardNumber,
        cardExpiration: cardExpiration,
        cardCvv: cardCvv
    };
    localStorage.setItem('flightBooking', JSON.stringify(bookingDetails));

    // confirmation
    const confirmationMessage = `
        <p>Thank you, ${fullName}! Your booking has been confirmed.</p>
        <p>Booking Reference: <strong>${bookingReference}</strong></p>
        <button id="close-confirmation" class="close-confirmation">X</button>
    `;

    document.getElementById('booking-confirmation').innerHTML = confirmationMessage;
    document.getElementById('booking-confirmation').style.display = 'block';


    document.getElementById('close-confirmation').addEventListener('click', function() {
        document.getElementById('booking-confirmation').style.display = 'none';
    });
});

// close
document.querySelector('.close-popup').addEventListener('click', function() {
    document.getElementById('booking-popup').style.display = 'none';
});
