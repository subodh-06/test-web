document.getElementById('joinWaitlistBtn').addEventListener('click', () => {
    document.getElementById('popup').classList.remove('hidden');
});

document.getElementById('createAccountForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        await createUser(email, password); // This function will be defined in auth.js
        window.location.href = '/profile.html';
    } catch (error) {
        console.error("Error creating account:", error);
    }
});
