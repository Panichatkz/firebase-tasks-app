firebase.initializeApp({
  
    apiKey: "AIzaSyC2PH32fmUJj9Jk96uAHmXcLbcfW4CBDTI",
    authDomain: "awesome-tasks-manager.firebaseapp.com",
    projectId: "awesome-tasks-manager",
    storageBucket: "awesome-tasks-manager.appspot.com",
    messagingSenderId: "689732986183",
    appId: "1:689732986183:web:83567b216496da7d4a9862"
  
});

//const app = initializeApp(firebaseConfig);

const db = firebase.firestore();

// Function to add a task
function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== "") {
        db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore. FieldValue.serverTimestamp(),
        });
        taskInput.value = "";
    }
}

// Function to render tasks

function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item"
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);

}

// Real-time listener for tasks
db.collection("tasks")
.orderBy("timestamp", "desc")
.onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type === "added") {
            renderTasks(change.doc);
        }
    });
});

// Function to delete a task

function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
    location.reload();
}

