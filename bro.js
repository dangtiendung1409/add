let form = document.getElementById("form");
let editform = document.getElementById("editform");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textArea = document.getElementById("textArea");
let editTextInput = document.getElementById("editTextInput");
let editDateInput = document.getElementById("editDateInput");
let editTextArea = document.getElementById("editTextArea");
let msg= document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let selectedID = document.getElementById("selectedTaskID");

form,addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});
editform,addEventListener("submit", (e) => {
    e.preventDefault();
    editformValidation();
});

let formValidation = () => {
    if (textInput.value === "") {
        console.log("failure");
     
    } else {
        console.log("success");
        // msg.innerHTML = "1";
        acceptData();
        // form.modal('hide');
        $('#form').modal('hide');
        //add.setAttribute("data-bs-dismiss", "modal");
        //add.onClick();

        // (() => {
        //     add.setAttribute("data-bs-dismiss", "modal");
        // })();
    }
};
let editformValidation = () => {
    if (editTextInput.value === "") {
        console.log("failure");
     
    } else {
        console.log("success");
        // msg.innerHTML = "1";
        data[selectedID.value] = {
            text: editTextInput.value,
            date: editDateInput.value,
            description: editTextArea.value,
                
        };
        localStorage.setItem("data", JSON.stringify(data));
        console.log(data);
        createTasks();
        // form.modal('hide');
        $('#editform').modal('hide');
        //add.setAttribute("data-bs-dismiss", "modal");
        //add.onClick();

        // (() => {
        //     add.setAttribute("data-bs-dismiss", "modal");
        // })();
    }
};

let data = [{}];
let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textArea.value,
            
        });
        localStorage.setItem("data", JSON.stringify(data));
        console.log(data);
        createTasks();
};
let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
        return(tasks.innerHTML += `
            <div id=${y}>
                <span class="fw-bold">${x.text}</span>
                <span class="small text-secondary">${x.date}</span>
                <p>${x.description}</p>
                <span class="options">
                    <i onClick = "editTask(this)" date-bs-toggle="modal" date-bs-target="#form" class="fas fa-edit"></i>
                    <i onClick = "deleteTasks(this)" class="fas fa-trash-alt"></i>
                </span>
            </div>
    `);
});
  resetForm();
};
let deleteTasks = (e) => {
    e.parentElement. parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
};
let editTask = (e) => {
    let selectedTasks = e.parentElement.parentElement;
    let selectedTaskID = e.parentElement.parentElement.id;
    
    editTextInput.value = selectedTasks.children[0].innerHTML;
    editDateInput.value = selectedTasks.children[1].innerHTML;
    editTextArea.value =  selectedTasks.children[2].innerHTML;
    selectedID.value =   selectedTaskID;
    // alert();
    $('#editform').modal('show');
    
    //deleteTasks(e);
};
let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textArea.value = "";
};
(() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    console.log(data);
    createTasks();
})();
