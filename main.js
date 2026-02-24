const params = new URLSearchParams(window.location.search);
const title = params.get("title");

const titlePage = document.getElementById("pageTitle");
const titleHeader = document.getElementById("headTitle");

const holder = document.getElementById("taskHolder");
const inBar = document.getElementById("inBar");
const subBtn = document.getElementById("inBtn");
const catBar = document.getElementById("inBarCat");
const catBtn = document.getElementById("inBtnCat");
const catHolder = document.getElementById("catHolder");

let taskStorage = JSON.parse(localStorage.getItem(title)) || [];

let folderStorage = JSON.parse(localStorage.getItem(title + "Cat")) || [];

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

function saveFolder() {
    localStorage.setItem(title + "Cat", JSON.stringify(folderStorage));
}

function removeFolder(index) {
    folderStorage.splice(index, 1);
}

function openNewWindow(windowName) {
    window.open(`categoryTemp.html?titleF=${windowName}&parentF=${title}`);
}

function renderFolder() {
    catHolder.innerHTML = ``;
    folderStorage.forEach((folder, index) => {
        const taskBar = document.createElement("button");
        taskBar.className = "btn";
        taskBar.setAttribute("data-theme", theme);
        taskBar.setAttribute("data-buttonType", "default");
        taskBar.textContent = folder;
        taskBar.addEventListener("click", function() {
            openNewWindow(taskBar.textContent);
        })
        const doneBtn = document.createElement("button");
        doneBtn.className = "btn";
        doneBtn.setAttribute("data-buttonType", "default");
        doneBtn.setAttribute("data-theme", theme);
        doneBtn.textContent = "Remove";
        const wrapper = document.createElement("div");
        wrapper.className = "itemGrid";
        doneBtn.addEventListener("click", function() {
            removeFolder(index);
            renderFolder();
        })
        wrapper.appendChild(taskBar);
        wrapper.appendChild(doneBtn);
        
        catHolder.appendChild(wrapper);
    })
    saveFolder();
}

function setup() {
    titlePage.textContent = title + " || Foreva";
    titleHeader.textContent = title;
    renderTask();
    renderFolder();
}

function makeTask() {
    if (inBar.value.trim() === "") return;
    taskStorage.push(inBar.value);
    inBar.value = "";
    saveTask();
    renderTask();
}

function makeFolder() {
    if (catBar.value.trim() === "") return;
    folderStorage.push(catBar.value);
    catBar.value = "";
    saveFolder();
    renderFolder();
}

subBtn.addEventListener("click", function() {
    makeTask();
})

document.addEventListener("keypress", (key) => {
    if (key.key === "Enter") {
        if (inBar.value.trim() === "") {
            makeFolder();
        } else {
            makeTask();
        }
    }
})

catBtn.addEventListener("click", function() {
    makeFolder();
})

setup();