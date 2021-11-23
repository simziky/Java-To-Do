

let signUpBtn = document.getElementById("signup")

signUpBtn.addEventListener('click', (e) => {

  e.preventDefault()
    var name = document.getElementById("name")
    var email = document.getElementById("email")
    var password = document.getElementById("password")

    name = name.value
    email = email.value
    password = password.value
   
    auth.createUserWithEmailAndPassword(email, password).then(cred =>{
      return db.collection('user').doc(cred.user.uid).set({

        Name: name,
        Email: email,
        Password : password,
      }).then(()=>{
        console.log("login successful")
        location = "login.html";
      
      }).catch(err => {
        console.log(err.message);
        const signupError = document.getElementById("signupError");
        signupError.innerHTML = err.message;
      })

    }).catch(err => {
      console.log(err.message);
      const signupError2 = document.getElementById("signupError2");
      signupError2.innerHTML = err.message;
    })
})













