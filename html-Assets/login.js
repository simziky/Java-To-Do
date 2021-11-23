let signInBtn = document.getElementById("login")

signInBtn.addEventListener('click', (e) => {

  e.preventDefault()
    var email = document.getElementById("email")
    var password = document.getElementById("password")

    email = email.value
    password = password.value

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        
        window.location = "index.html"
        console.log(user.email)
      }).catch(err => {
        console.log(err.message);
        const signupError = document.getElementById("loginError");
        loginError.innerHTML = err.message;
      })
        
      

})