let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textArea = document.getElementById("textArea");
let msg= document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form,addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (textInput.value === "") {
        console.log("failure");
     
    } else {
        console.log("success");
        msg.innerHTML = "1";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.onClick();

        (() => {
            add.setAttribute("data-bs-dismiss", "modal");
        })();
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
                <span class="small text-secondary">${x.data}</span>
                <p>${x.description}</p>
                <span class="options">
                    <i onClick = "editTask(this)" date-bs-toggle="modal" date-bs-target="#form" class="fas fa-edit"></i>
                    <i onClick = "deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
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
    textInput.value = selectedTasks.children[0].innerHTML;
    dateInput.value = selectedTasks.children[1].innerHTML;
    textArea.value =  selectedTasks.children[2].innerHTML;
    deleteTasks(e);
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
