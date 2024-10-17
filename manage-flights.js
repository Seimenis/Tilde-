document.addEventListener('DOMContentLoaded', function() {
    const seatNumberInput = document.getElementById('seat-number');
    const seatSectionSelect = document.getElementById('seat-section');
    const confirmSeatButton = document.getElementById('confirm-seat-selection');
    const cancelFlightButton = document.getElementById('cancel-flight-btn');
    const findFlightButton = document.getElementById('find-flight-btn');
    const popup = document.getElementById('cancel-reason-popup');
    const closePopupButton = document.getElementById('close-popup');
    const confirmCancelButton = document.getElementById('confirm-cancel');
    const statusMessage = document.getElementById('status-message');

    const seatSelectionContainer = document.getElementById('seat-selection-container');
    const cancelFlightContainer = document.getElementById('cancel-flight-container');

    // Prefill booking reference and last name from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    const lname = urlParams.get('lname');

    if (ref) document.getElementById('booking-reference').value = ref;
    if (lname) document.getElementById('last-name').value = lname;

    // Handle flight lookup
    findFlightButton.addEventListener('click', function() {
        const bookingReference = document.getElementById('booking-reference').value;
        const lastName = document.getElementById('last-name').value;

        // For now, regardless of input, assume the flight is found
        if (bookingReference && lastName) {
            statusMessage.textContent = `Flight found for ${lastName} with reference ${bookingReference}`;
            seatSelectionContainer.style.display = 'block'; // Show seat selection
            cancelFlightContainer.style.display = 'block'; // Show cancel flight option
        } else {
            statusMessage.textContent = 'Please enter both booking reference and last name.';
        }
    });

    // Handle seat selection
    confirmSeatButton.addEventListener('click', function() {
        const seatNumber = seatNumberInput.value;
        const seatSection = seatSectionSelect.value;

        if (seatNumber && seatSection) {
            statusMessage.textContent = `Your seat has been confirmed: Seat ${seatNumber} (${seatSection})`;
        } else {
            statusMessage.textContent = 'Please select both seat number and section.';
        }
    });

    // Handle flight cancellation
    cancelFlightButton.addEventListener('click', function() {
        popup.style.display = 'block'; // Show the popup asking for a reason
    });

    closePopupButton.addEventListener('click', function() {
        popup.style.display = 'none'; // Close the popup
    });

    confirmCancelButton.addEventListener('click', function() {
        const cancelReason = document.getElementById('cancel-reason').value;

        if (cancelReason.trim() === '') {
            statusMessage.textContent = 'Please provide a reason for cancellation.';
        } else {
            // Remove flight info from localStorage
            localStorage.removeItem('flightBooking');
            statusMessage.textContent = 'Your flight has been successfully canceled.';
            popup.style.display = 'none'; // Close the popup
        }
    });
});
