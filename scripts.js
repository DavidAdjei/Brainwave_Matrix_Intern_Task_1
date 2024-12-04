let todos = [];
let filter = "All";

const changeTheme = (savedTheme) => {
    const selectors = {
        app: document.querySelector('.App'),
        form: document.querySelector('.TodoForm'),
        inputField: document.querySelector('.inputField'),
        checkContainer: document.querySelector('.checkContainer'),
        listShadow: document.querySelector('.shadow'),
        manipulate: document.querySelector('.manipulate'),
        mobileLinks: document.querySelector('.mobileLinks'),
        themeIcon: document.getElementById('themeIcon'),
        links: document.querySelectorAll('.link'),
        todolist: document.querySelectorAll('.TodoItem')
    };

    selectors.app.className = `App ${savedTheme}`;
    selectors.form.className = `TodoForm ${savedTheme}Form`;
    selectors.inputField.className = `inputField ${savedTheme}Field`;
    selectors.checkContainer.className = `checkContainer`; 
    selectors.listShadow.className = `shadow ${savedTheme}Shadow`;
    selectors.manipulate.className = `manipulate ${savedTheme}Form`;
    selectors.themeIcon.src = savedTheme === 'dark' 
        ? './assets/images/icon-moon.svg' 
        : './assets/images/icon-sun.svg';
    selectors.mobileLinks.className = `mobileLinks ${savedTheme}Form ${savedTheme}Shadow`;

    selectors.links.forEach((li) => {
        li.className = `link ${savedTheme}Hover`;
    });
    selectors.todolist.forEach((todo) => {
        todo.className = `TodoItem ${savedTheme}Form`;
    })
};

function toggleTheme() {
    const app = document.querySelector('.App');
    const currentTheme = app.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    changeTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

function handleSubmit(event) {
    event.preventDefault();
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();
    const checkContainer = document.querySelector(".checkContainer");
    if (todoText) {
        checkContainer.className = "checkContainer checkBackground";
        todos.push({ text: todoText, completed: false });
        todoInput.value = '';
        renderTodos();
        setTimeout(() => { 
            checkContainer.className = "checkContainer";
        }, 200)
    }
}

function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
}

function setFilter(newFilter) {
    filter = newFilter;
    renderTodos();
}

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    const itemsLeft = document.getElementById('itemsLeft');
    todoList.innerHTML = '';

    const app = document.querySelector('.App');
    const currentTheme = app.classList.contains('dark') ? 'dark' : 'light';

    const filteredTodos = todos.filter(todo => {
        if (filter === 'Active') return !todo.completed;
        if (filter === 'Complete') return todo.completed;
        return true;
    });

    filteredTodos.forEach((todo, index) => {
        const deleteButtonHTML = `
            <button 
                class="delete" 
                onmouseenter="this.style.display='inline';" 
                onmouseleave="this.style.display='none';" 
                onclick="deleteTodo(${index})"
                style="display: none;">
                <img src="./assets/images/icon-cross.svg" alt="Delete" />
            </button>
        `;

        const todoItemHTML = `
            <div 
                class="TodoItem ${currentTheme}Form"
                onmouseenter="this.querySelector('.delete').style.display='inline';"
                onmouseleave="this.querySelector('.delete').style.display='none';">
                <div class="TodoContent">
                    <div class="checkContainer ${todo.completed ? "checkBackground" : ""}" onclick="toggleComplete(${index})">
                        <span class="checkmark ${todo.completed ? '' : 'hide'}"></span>
                    </div>
                    <span class="inputField ${todo.completed ? 'completed' : ''}">
                        ${todo.text}
                    </span>
                </div>
                ${deleteButtonHTML}
            </div>
        `;

        todoList.innerHTML += todoItemHTML;
    });

    itemsLeft.textContent = `${todos.filter(todo => !todo.completed).length} items left`;
}


document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    changeTheme(savedTheme);
    renderTodos();
});