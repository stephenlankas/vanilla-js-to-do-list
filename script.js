// get data list from local storage
var currentlyOnStorage = JSON.parse(localStorage.getItem("contentList"));
var contentList = currentlyOnStorage === null ? [] : currentlyOnStorage;
var currentlyOnCompleted = JSON.parse(localStorage.getItem("completedList"));
var completedList = currentlyOnCompleted === null ? [] : currentlyOnCompleted;

function save_data() {
  // add new data to local storage
  contentList.push(document.getElementById("content").value);
  localStorage.setItem("contentList", JSON.stringify(contentList));
}

function renderDataForCurrent() {
  // add new task slot
  var todoSlot = document.getElementById("current-tasks");
  if (contentList.length > 0) {
    todoSlot.innerHTML = "";
    for (const task of contentList) {
      todoSlot.innerHTML += '<div class="task">' + task + "</div>";
    }
  } else if (contentList.length == 0) {
    todoSlot.innerHTML = `<p id="empty-placeholder">Let's add some tasks and be productive 🍀</p>`;
  }
}

function renderDataForCompleted() {
  // add completed task slot
  var completedSlot = document.getElementById("completed-tasks");
  if (completedList.length > 0) {
    completedSlot.innerHTML = "";
    for (const task of completedList) {
      completedSlot.innerHTML += '<div class="task-completed reverse">' + task + "</div>";
    }
  } else if (completedList.length == 0) {
    completedSlot.innerHTML = `<p id="empty-placeholder">Make the best of your time 🦾</p>`;
  }
}

function deleteOnClick() {
  var allTasks = document.getElementsByClassName("task");
  for (let i = 0; i < allTasks.length; i++) {
    allTasks[i].addEventListener("click", () => {
      allTasks[i].classList.add("disappearing");
      setTimeout(() => {
        contentList.splice(i, 1);
        localStorage.setItem("contentList", JSON.stringify(contentList));
        completedList.push("✅ " + allTasks[i].innerHTML);
        localStorage.setItem("completedList", JSON.stringify(completedList));
        renderDataForCurrent();
        renderDataForCompleted();
        deleteOnClickCompleted();
        deleteOnClick();
      }, 1000);
    });
  }
}

function deleteOnClickCompleted() {
    var allTasks = document.getElementsByClassName("task-completed");
    for (let i = 0; i < allTasks.length; i++) {
      allTasks[i].addEventListener("click", () => {
        allTasks[i].classList.add("disappearing");
        setTimeout(() => {
          completedList.splice(i, 1);
          localStorage.setItem("completedList", JSON.stringify(completedList));
          renderDataForCompleted();
          deleteOnClickCompleted();
        }, 1000);
      });
    }
  }

renderDataForCurrent();
renderDataForCompleted()
deleteOnClick();
deleteOnClickCompleted()
