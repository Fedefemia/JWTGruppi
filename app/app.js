const API_BASE = 'http://localhost/api-jwt'; // es: http://localhost/api
(async () => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE}/login`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        window.location.href = "./log.html";
        throw new Error('Non autorizzato');
    }
})();
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