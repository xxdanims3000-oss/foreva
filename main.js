const params = new URLSearchParams(window.location.search);
const title = params.get("title");

const titlePage = document.getElementById("pageTitle");
const titleHeader = document.getElementById("headTitle");

const holder = document.getElementById("taskHolder");
const inBar = document.getElementById("inBar");
const subBtn = document.getElementById("inBtn");

let taskStorage = JSON.parse(localStorage.getItem(title)) || [];

let theme = "default";

function saveTask() {
    localStorage.setItem(title, JSON.stringify(taskStorage));
}

function removeTask(index) {
    taskStorage.splice(index, 1);
}

function renderTask() {
    holder.innerHTML = ``;
    taskStorage.forEach((task, index) => {
        const taskBar = document.createElement("span");
        taskBar.className = "txt";
        taskBar.setAttribute("data-theme", theme);
        taskBar.textContent = task;
        const doneBtn = document.createElement("button");
        doneBtn.className = "btn";
        doneBtn.setAttribute("data-buttonType", "default");
        doneBtn.setAttribute("data-theme", theme);
        doneBtn.textContent = "Done";
        const wrapper = document.createElement("div");
        wrapper.className = "itemGrid";
        doneBtn.addEventListener("click", function() {
            removeTask(index);
            renderTask();
        })
        wrapper.appendChild(taskBar);
        wrapper.appendChild(doneBtn);
        
        holder.appendChild(wrapper);
    })
    saveTask();
}

function setup() {
    titlePage.textContent = title + " || Foreva";
    titleHeader.textContent = title;
    renderTask();
}

function makeTask() {
    if (inBar.value.trim === "") return;
    taskStorage.push(inBar.value);
    inBar.value = "";
    saveTask();
    renderTask();
}

subBtn.addEventListener("click", function() {
    makeTask();
})

document.addEventListener("keypress", (key) => {
    if (key.key === "Enter") {
        makeTask();
    }
})

setup();