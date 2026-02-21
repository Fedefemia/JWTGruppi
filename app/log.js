const API_BASE = 'http://localhost/api-jwt'; // es: http://localhost/api

const loginForm = document.getElementById('login');
const logupForm = document.getElementById('logup');
let doing = false;
const switchForm = async () => {
    if(doing) return;
    doing = true;
    if(loginForm.classList.contains("visible")) {
        loginForm.classList.remove("visible");
        loginForm.classList.add("hidden");
        await new Promise(() => setTimeout(() => {
            logupForm.classList.remove("hidden");
            logupForm.classList.add("visible");
        }, 250));
    } else {
        logupForm.classList.remove("visible");
        logupForm.classList.add("hidden");
        await new Promise(() => setTimeout(() => {
            loginForm.classList.remove("hidden");
            loginForm.classList.add("visible");
        }, 250));
    }
    doing = false;
};

const performLog = async (e, action = "login") => {
    e.preventDefault();
    const form = e.target;
    const username = form.querySelector('.username').value;
    const password = form.querySelector('.password').value;

    try {
        const response = await fetch(`${API_BASE}/${action}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Errore di login');
        }

        // salva JWT
        localStorage.setItem('token', data.token);

        window.location.href = "/";
    } catch (err) {
        output.textContent = err.message;
    }
}

loginForm.addEventListener('submit', (e) => performLog(e,"login"));
logupForm.addEventListener('submit', (e) => performLog(e,"logup"));