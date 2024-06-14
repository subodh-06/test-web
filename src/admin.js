import { auth, getFirestore, collection, getDocs, query, where } from './auth.js';

const db = getFirestore();

document.addEventListener('DOMContentLoaded', async () => {
    auth.onAuthStateChanged(async (user) => {
        if (user && user.email === 'admin@example.com') { // Replace with your admin email
            loadUserData();
        } else {
            window.location.href = '/';
        }
    });

    document.getElementById('logoutBtn').addEventListener('click', async () => {
        await logout();
        window.location.href = '/';
    });

    document.getElementById('genderFilter').addEventListener('change', loadUserData);
});

const loadUserData = async () => {
    const genderFilter = document.getElementById('genderFilter').value;
    const usersCollection = collection(db, "users");
    let q;
    if (genderFilter === "all") {
        q = query(usersCollection);
    } else {
        q = query(usersCollection, where("gender", "==", genderFilter));
    }
    const querySnapshot = await getDocs(q);
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = "";
    querySnapshot.forEach((doc) => {
        const user = doc.data();
        userTableBody.innerHTML += `
            <tr>
                <td class="border px-4 py-2">${user.name}</td>
                <td class="border px-4 py-2">${user.email}</td>
                <td class="border px-4 py-2">${user.gender}</td>
            </tr>
        `;
    });
};
