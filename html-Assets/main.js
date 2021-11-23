document.querySelector("#push").onclick = function () {
  if (document.querySelector("#input input").value.length == 0) {
    alert("please enter your task");
  } else {
    document.querySelector("#tasks").innerHTML += `
       
        
        `;

        var currentTask = document.querySelectorAll(".delete");
        for (var i = 0; i < currentTask.length; i++){
            currentTask[i].onclick = function(){
                this.parentNode.remove();
            }
        }

       


        var tasks = document.querySelectorAll(".task");
        for (var i = 0; i < tasks.length; i++){
           tasks[i].onclick = function(){
                this.classList.toggle('completed');
            }
        }

        document.querySelector("#input input").value = "";
  }
};

