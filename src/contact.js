import { getFirestore, collection, addDoc } from './auth.js';

const db = getFirestore();

document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const contactData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        message: document.getElementById('contactMessage').value,
        createdAt: new Date()
    };
    try {
        await addDoc(collection(db, "contacts"), contactData);
        alert('Message sent successfully!');
    } catch (error) {
        console.error("Error sending message:", error);
        alert('Failed to send message. Please try again.');
    }
});
