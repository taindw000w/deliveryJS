const auth = () => {

    const buttonAuth = document.querySelector('.button-auth');
    const buttonOut = document.querySelector('.button-out');

    const modalAuth = document.querySelector('.modal-auth');
    const closeAuth = document.querySelector('.close-auth');
    const buttonCard = document.querySelector('.button-cart');

    const userName = document.querySelector('.user-name');

    const Form = document.getElementById('logInForm');
    const loginInput = document.getElementById('login');
    const PasswordInput = document.getElementById('password');
    const buttonForm = document.querySelector('.button-login');


    buttonAuth.addEventListener('click', () => {
        modalAuth.style.display = 'flex';
    })

    closeAuth.addEventListener('click', () => {
        modalAuth.style.display = 'none';
    })

    const loginn = (user) => {
        buttonAuth.style.display = 'none';
        buttonOut.style.display = 'flex';
        modalAuth.style.display = 'none';
        buttonCard.style.display = 'flex';

        userName.style.display = 'flex';
        userName.textContent = user.login;
    }

    const out = logout = () => {
        buttonAuth.style.display = 'flex';
        buttonOut.style.display = 'none';
        buttonCard.style.display = 'none';

        userName.style.display = 'none';
        localStorage.removeItem('user');
    }

    buttonOut.addEventListener('click', () => {
        logout();
    })

    Form.addEventListener('submit', (event) => {
        event.preventDefault();
            
        const user = {
            login: loginInput.value,
            password: PasswordInput.value
        }
        if (user.login == '' || user.password == '') {
            loginInput.style.border = '1px solid red';
            PasswordInput.style.border = '1px solid red';
            return;
        } 
            
        localStorage.setItem('user', JSON.stringify(user));
        loginn(user);
                
    })
        
    if (localStorage.getItem('user')) {
        loginn(JSON.parse(localStorage.getItem('user')));
    }
}

auth();