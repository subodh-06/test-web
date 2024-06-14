import { auth, getUserProfile, updateUserProfile, logout } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            const profile = await getUserProfile(user.uid);
            document.getElementById('name').value = profile.name || '';
            document.getElementById('age').value = profile.age || '';
            document.getElementById('gender').value = profile.gender || '';
            document.getElementById('instagram').value = profile.instagram || '';
            document.getElementById('youtube').value = profile.youtube || '';
        } else {
            window.location.href = '/';
        }
    });

    document.getElementById('logoutBtn').addEventListener('click', async () => {
        await logout();
        window.location.href = '/';
    });

    document.getElementById('profileForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const userId = auth.currentUser.uid;
        const profileData = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value,
            instagram: document.getElementById('instagram').value,
            youtube: document.getElementById('youtube').value,
        };
        await updateUserProfile(userId, profileData);
        alert('Profile updated successfully!');
    });
});
