document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.registration__form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    // Получение элементов для отображения ошибок
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const successMessage = document.getElementById('successMessage');

    // Проверка существующих пользователей
    let users = JSON.parse(localStorage.getItem('users')) || [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Очистка предыдущих сообщений об ошибках
        clearErrors();
        
        // Валидация формы
        if (!validateForm()) {
            return;
        }

        // Проверка на существующего пользователя по email
        if (isUserExistsByEmail(email.value)) {
            emailError.textContent = 'Пользователь с таким email уже существует';
            return;
        }

        // Проверка на существующего пользователя по username
        if (isUserExistsByEmail(username.value)){
          usernameError.textContent = 'Пользователь с таким именем уже существует';
          return;
        }

        // Создание нового пользователя
        const newUser = {
            username: username.value,
            email: email.value,
            password: password.value
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        showSuccess('Регистрация успешна!');
            window.location.href = '../index.html';
        form.reset();
    });

    // Функция валидации формы
    function validateForm() {
        let isValid = true;

        // Валидация имени пользователя
        if (username.value.length < 3) {
            usernameError.textContent = 'Имя пользователя должно содержать минимум 3 символа';
            isValid = false;
        }

        // Валидация email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            emailError.textContent = 'Введите корректный email';
            isValid = false;
        }

        // Валидация пароля
        if (password.value.length < 6) {
            passwordError.textContent = 'Пароль должен содержать минимум 6 символов';
            isValid = false;
        }

        // Проверка совпадения паролей
        if (password.value !== confirmPassword.value) {
            confirmPasswordError.textContent = 'Пароли не совпадают';
            isValid = false;
        }

        return isValid;
    }

    // Функция проверки существования пользователя по email
    function isUserExistsByEmail(email) {
        return users.some(user => user.email === email);
    }

    // Функция проверки существования пользователя по username
    function isUserExistsByUsername(username) {
        return users.some(user => user.username === username);
    }

    // Функция очистки сообщений об ошибках
    function clearErrors() {
        usernameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';
        successMessage.textContent = '';
    }

    // Функция показа сообщения об успехе
    function showSuccess(message) {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }

    // Валидация в реальном времени
    username.addEventListener('input', () => {
        if (username.value.length < 3) {
            usernameError.textContent = 'Имя пользователя должно содержать минимум 3 символа';
        } else if (isUserExistsByUsername(username.value)) {
            usernameError.textContent = 'Пользователь с таким именем уже существует';
        } else {
            usernameError.textContent = '';
        }
    });

    email.addEventListener('input', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            emailError.textContent = 'Введите корректный email';
        } else if (isUserExistsByEmail(email.value)) {
            emailError.textContent = 'Пользователь с таким email уже существует';
        } else {
            emailError.textContent = '';
        }
    });

    password.addEventListener('input', () => {
        if (password.value.length < 6) {
            passwordError.textContent = 'Пароль должен содержать минимум 6 символов';
        } else {
            passwordError.textContent = '';
        }
    });

    confirmPassword.addEventListener('input', () => {
        if (confirmPassword.value !== password.value) {
            confirmPasswordError.textContent = 'Пароли не совпадают';
        } else {
            confirmPasswordError.textContent = '';
        }
    });

});

