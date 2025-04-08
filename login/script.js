function login(){
    const username= document.getElementById('login__username')
    const password = document.getElementById('login__password')

    const errorElement = document.getElementById('login__error')
    const successElement = document.getElementById('login__success')

    errorElement.textContent = ''
    successElement.textContent = ''

    if(!username || !password ){
        errorElement.textContent = 'Все поля обязательны для заполнения'
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || []
    const user = users.find(user => user.username === username && user.password === password)

    if(!user){
        errorElement.textContent = 'Неверное имя пользователя или пароль'
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user))

    document.getElementById('login__username').value = ''
    document.getElementById('login__password').value = ''

    setTimeout(()=> {

    }, 1000)

    window.location.href = './index.html'

    window.onload = ()=>{
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        if(currentUser){
            document.getElementById('login__success').textContent = `Вы уже вошли в систему как ${currentUser.username}`
        }
    }
    function showRegisterForm(){
        window.location.href = './index1.html'
    }
}