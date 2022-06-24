  
   let signOutBtn = document.getElementById("signout")

   signOutBtn.addEventListener("click", ( e) =>{
        e.preventDefault()

        auth.signOut()
        window.location = "index.html"
   })


   // if user is logged in or not
auth.onAuthStateChanged(user =>{

     if (user){
          console.log("user is logged in")
     }
     else{
          alert('your login session has expired')
          location = "login.html"
     }

})


// retriving username
auth.onAuthStateChanged(user => {
     const username = document.getElementById('username');
     if (user) {
         fs.collection('user').doc(user.uid).get().then((snapshot) => {
             
             username.innerText = snapshot.data().Name;
         })
     }
     else {
         // console.log('user is not signed in to retrive username');
     }
 })


 const date = new Date();
 const time = date.getTime();
 let counter = time;

 push.addEventListener('click', e => {
    
      todos = document.getElementById("todos");
      todos = todos.value;
      let id = counter += 1;
     console.log(todos);
     
     
     auth.onAuthStateChanged(user => {
         if (user) {
             fs.collection(user.uid).doc('_' + id).set({
                 id: '_' + id,
                 todos
             }).then(() => {
                 console.log('todo added');
             }).catch(err => {
                 console.log(err.message);
             })
         }
         else {
             // console.log('user is not signed in to add todos');
         }
     })
     
 })
 


 // retriving todos


const mainContainer = document.getElementById("tasks")

 function renderData(doc){

    // parent Div
        let parentDiv = document.createElement('div');
        parentDiv.className = "task";
        parentDiv.setAttribute('data-id', doc.id);
        // Todo div
        let todos = document.createElement('span');
        todos.textContent = doc.data().todos;
        // delete button
        let trash = document.createElement("button");

        let img = document.createElement("img")
        img.className = "delete";
        img.src = "img/delete.png";
        
       
        parentDiv.appendChild(todos);
        mainContainer.appendChild(parentDiv);
        
        trash.appendChild(img)
        parentDiv.appendChild(trash)
       

        var tasks = document.querySelectorAll(".task");
        for (var i = 0; i < tasks.length; i++){
           tasks[i].onclick = function(){
                this.classList.toggle('completed');
            }
        }

       // trash clicking event
 trash.addEventListener('click', e => {
    let id = e.target.parentElement.parentElement.getAttribute('data-id');
    auth.onAuthStateChanged(user => {
        if (user) {
            fs.collection(user.uid).doc(id).delete();
        }
    })
})

 }


 



// retrieving todo

 auth.onAuthStateChanged(user => {


    fs.collection(user.uid).onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type == "added") {
                renderData(change.doc);
            }
            else if (change.type == 'removed') {
                let li = mainContainer.querySelector('[data-id=' + change.doc.id + ']');
                mainContainer.removeChild(li);
            }
        })
    })





 })
