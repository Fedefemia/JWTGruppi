const API_BASE = 'http://localhost/api-jwt'; // es: http://localhost/api

if(!localStorage.getItem("token")) window.location.href = "/logInOrLogUp";

async function getUsers() {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE}/users`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Non autorizzato');
    }

    response.json()
        .then((data) => {

            let s = "";

            data.forEach((user) => {
                s += `${user.id} ${user.name} (${user.email})\n`;
            })

            alert(s);
        });
}

document.getElementById('btn-users').addEventListener('click', getUsers);