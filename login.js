import { checkToken, redirect } from "./utils.js";

const form = document.getElementById('loginForm');
const usernameInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

(function() {
    const hasToken = checkToken();
    if (hasToken) {
        redirect("/home.html")
    }
})();

form.addEventListener('submit', login);

async function login(event) {
    event.preventDefault();
    const response = await fetch('https://api.escuelajs.co/api/v1/users', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: usernameInput.value,
            password: passwordInput.value,
        })
    });

    const result = await response.json();
    localStorage.setItem("token", result.token);

    const hasToken = checkToken();
    if (hasToken) {
        redirect('/home.html');
    }
}

usernameInput.addEventListener('input', function(event) {
    console.log(event.target.value);
});

passwordInput.addEventListener('input', function(event) {
    console.log(event.target.value);
});
