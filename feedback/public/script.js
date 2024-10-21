document.getElementById('feedbackForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const responseMessage = document.getElementById('responseMessage');

    try {
        const response = await fetch('http://localhost:3000/submit-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        if (response.ok) {
            responseMessage.textContent = 'Feedback submitted successfully!';
            responseMessage.style.color = 'green';
            document.getElementById('feedbackForm').reset(); // Reset the form
        } else {
            responseMessage.textContent = 'Error submitting feedback. Please try again.';
            responseMessage.style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        responseMessage.textContent = 'Error submitting feedback. Please try again.';
        responseMessage.style.color = 'red';
    }
});
