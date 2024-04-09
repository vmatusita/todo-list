// Seleção de elementos
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#form-edit');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');

let oldInputValue;
//Funções
const saveTodo = (text) => {

    const todo = document.createElement('div');
    todo.classList.add('todo');

    const todoText = document.createElement('h3');
    todoText.textContent = text;
    todo.appendChild(todoText);

    const doneBtn = document.createElement('button');
    doneBtn.classList.add('finish-todo');
    doneBtn.textContent = '✔'; 
    todo.appendChild(doneBtn);
    
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo');
    editBtn.textContent = '🖊'; 
    todo.appendChild(editBtn);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-todo');
    deleteBtn.textContent = 'X'; 
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
}

const toggleForms = () => {
    todoList.classList.toggle('hide');
    todoForm.classList.toggle('hide');
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll('.todo');

    todos.forEach((todo) => {
        let todoText = todo.querySelector('h3');
        if(todoText.textContent === oldInputValue) {
            todoText.textContent = text;
        }
    
    });
}

const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

const updateLocalStorage = () => {
    const todos = Array.from(document.querySelectorAll('.todo')).map(todo => {
        return {
            text: todo.querySelector('h3').textContent,
            done: todo.classList.contains('done')
        };

    });

    saveTodosToLocalStorage(todos);
}
// Eventos
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const inputValue = todoInput.value;

    if (inputValue.trim() === '') {
        alert('Campo de texto vazio');
        return;
    }

    if (inputValue) {
        saveTodo(inputValue);
        updateLocalStorage(); 
    }

    todoInput.value = '';
});

document.addEventListener('click', (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoText;
    
    if (parentEl && parentEl.querySelector('h3')) {
        todoText = parentEl.querySelector('h3').textContent;
    }

    if (targetEl.classList.contains('finish-todo')) {
        parentEl.classList.toggle('done');
        updateLocalStorage(); 
    }
    
    if (targetEl.classList.contains('delete-todo')) {
        parentEl.remove();
        updateLocalStorage(); 
    }

    if (targetEl.classList.contains('edit-todo')) {
        toggleForms();

        editInput.value = todoText;
        oldInputValue = todoText;
    }
});

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms();
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const editInputValue = editInput.value;

    if (editInputValue.trim() === '') {
        alert('Campo de texto vazio');
        return;
    }

    if(editInputValue) {
        updateTodo(editInputValue);
        updateLocalStorage(); 
        editInput.value = '';
    }

    toggleForms();
});

document.addEventListener('DOMContentLoaded', () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    todos.forEach(todo => {
        saveTodo(todo.text);

        if (todo.done) {
            const todoElement = todoList.lastChild;
            todoElement.classList.add('done');
        }
    });
});
