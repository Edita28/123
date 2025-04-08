document.addEventListener('DOMContentLoaded', () =>{
    const form = document.querySelector('form')
    const username = document.getElementById('username')
    const email = document.getElementById('email')
    const password = document.getElementById('password')
    const  confirmPassword = document.getElementById('confirmPassword')

    const usernameError = document.getElementById('usernameError')
    const emailError = document.getElementById('emailError')
    const passwordError = document.getElementById('passwordError')
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const successMessage = document.getElementById('successMessage')

    let users = JSON.parse(localStorage.getItem('user')) || []

    form.addEventListener('submit', (e) =>{
        e.preventDefault()
            clearErrors()

            if (!validateForm()) {
                return;
            }

            if(isUserExistByEmail(email.value)){
                emailError.textContent = 'Данная почта уже зарегистрирована'
                return;
            }
            if(isUserExistByUsername(username.value)){
                usernameError.textContent = 'Данный юзернейм уже зарегистрирован'
                return;
            }

            const newUser = {
                email: email.value,
                username: username.value,
                password: password.value
            }

            users.push(newUser)
            localStorage.setItem('users', JSON.stringify(users))
            showSuccess('Регистрация успешна')
            window.location.href = "../styles.css"
            form.reset()
    })
        function validateForm(){
            let isValid = true 
        if(username.value.length < 3){
            usernameError.textContent = 'Юзернейм должен состоять из более 3 символов'
            isValid = false
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            emailError.textContent = 'Введите корректный email';
            isValid = false;
        }
        if(password.value.length < 5){
            passwordError.textContent = 'Пароль должен состоять более из 5 символом'
            isValid = false;
        }

        if(password !== confirmPassword){
            confirmPasswordError.textContent = 'Пароли не совпадают'
            isValid = false;
        }
        return isValid = false;
    }


    function isUserExistByEmail(email){
        return users.some(user => user.email === email)
    }

    function isUserExistByUsername(username){
        return users.some(user => user.username === username)
    }

    function clearErrors(){
        username.usernameError = ''
        email.emailError = ''
        password.passwordError  = ''
        confirmPassword.confirmPasswordError = ''
        successMessage.successMessage = ''
    }

    function showSuccess(message) {
        successMessage.textContent = message;
        successMessage.style.display = 'block'
        setTimeout(()=>{
            successMessage.style.display = 'none'
        }, 3000)
    }

    username.addEventListener('input', () =>{
        if(username.value.length < 3){
            usernameError.textContent = 'Юзернейм должен состоять из более 3 символов'
        } else if(isUserExistByUsername(username.value)){
            usernameError.textContent = 'Данный юзернейм уже зарегистрирован'
        } else{
            usernameError.textContent = ''
        }
    })

    email.addEventListener('input', () =>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email.value)){
            emailError.textContent = 'Введите корректный эмейл'
        }else if(isUserExistByEmail(email.value)){
            emailError.textContent = 'Данный эмейл зарегистрирован'
        } else {
            emailError.textContent = ''
        }
    })

    password.addEventListener('input', () => {
        if(password.value.length < 5){
            passwordError.textContent = 'Пароль должен состоять из более 5 символов'
        } else{
            passwordError.textContent = ''
        }
    })

    confirmPassword.addEventListener('input', () => {
        if (confirmPassword.value !== password.value) {
            confirmPasswordError.textContent = 'Пароли не совпадают';
        } else {
            confirmPasswordError.textContent = '';
        }
    });
    })


