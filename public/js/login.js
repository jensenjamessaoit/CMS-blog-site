const loginFormHandler = async (event) => {
    event.preventDefault();

    console.log('hit login form handler')
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log('hit after fetch');

        if(response.ok) {
            document.location.replace('dashboard');
        }
        else {
            alert(response.statusText);
        }
    }
};
const signupFormHandler = async (event) => {
    event.preventDefault();

    console.log('hit signup form handler')
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();


    if(username && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            document.location.replace('/');
        }
        else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);