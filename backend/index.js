// Renaming this file to frontendScript.js for clarity
// This script is related to frontend operations and not backend server setup

document.getElementById('submitPayment').addEventListener('click', async function () {
    // Get form data
    const grade = document.getElementById('grade').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    const amount = document.getElementById('amount').value;

    // Validation
    if (!grade || !paymentMethod || !amount) {
        document.getElementById('responseMessage').textContent = 'Please fill all the fields.';
        document.getElementById('responseMessage').style.color = 'red';
        return;
    }

    try {
        // Send data to the backend
        const response = await fetch('http://localhost:3000/payment', {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({grade, paymentMethod, amount}),
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('responseMessage').textContent = 'Payment successful!';
            document.getElementById('responseMessage').style.color = 'green';
        } else {
            document.getElementById('responseMessage').textContent = data.error || 'Payment failed!';
            document.getElementById('responseMessage').style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('responseMessage').textContent = 'An error occurred while processing the payment.';
        document.getElementById('responseMessage').style.color = 'red';
    }
});
