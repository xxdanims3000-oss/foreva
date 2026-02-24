const addTaskBtn = document.getElementById("taskAdd");
const taskNameBar = document.getElementById("taskNameTxt");
const groupHolder = document.getElementById("groupHolder");

let taskGroups = JSON.parse(localStorage.getItem("taskGroups")) || [];

function openNewTab(tabName) {
    window.open(`taskTemp.html?title=${tabName}`, "_none");
}

function saveTaskGroup() {
    localStorage.setItem("taskGroups", JSON.stringify(taskGroups));
}

function removeTaskGroup(index) {
    taskGroups.splice(index, 1);
    saveTaskGroup();
}

function renderTaskGroup() {
    groupHolder.innerHTML = ``;
    taskGroups.forEach((group, index) => {
        const groupButton = document.createElement("button");
        groupButton.className = "btn taskBtn";
        groupButton.setAttribute("data-theme", "default");
        groupButton.setAttribute("data-buttonType", "grid");
        groupButton.textContent = group;
        groupButton.onclick = function() {
            openNewTab(group);
        };
        const delBtn = document.createElement("button");
        delBtn.className = "btn taskBtn";
        delBtn.setAttribute("data-theme", "default");
        delBtn.setAttribute("data-buttonType", "grid");
        delBtn.textContent = "X";
        delBtn.onclick = function() {
            removeTaskGroup(index);
            renderTaskGroup();
        };
        const wrapper = document.createElement("div");
        wrapper.className = "itemGrid";
        wrapper.appendChild(delBtn);
        wrapper.appendChild(groupButton);
        groupHolder.appendChild(wrapper);
    })
    saveTaskGroup();
}

addTaskBtn.addEventListener("click", function() {
    taskGroups.push(taskNameBar.value);
    taskNameBar.value = "";
    saveTaskGroup();
    renderTaskGroup();
})

renderTaskGroup();