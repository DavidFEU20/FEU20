// document.querySelector('#regForm')
// document.querySelector('#todoInput')
// document.querySelector('#output')

let todos = [];


const fetchTodos = () => {
  fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
  .then(res => res.json())
  .then(data => {
    todos = data;
    listTodos();
  })
}

fetchTodos()

const listTodos = () => {
  document.querySelector('#output').innerHTML = '';
  todos.forEach(todo => {
    
    if (todo.completed) {
      todohtml = `<div  class="card col-md-9 my-2 bg-light">
                        <div id="${todo.id}" class="p-4 d-flex justify-content-between align-items-center">
                            <h3 class="title text-color">${todo.title}</h3>
                            <button type="button" class="btn btn-danger completed">X</button>
                        </div>
                    </div>`
    } else {
      todohtml = `<div  class="card col-md-9 my-2">
                        <div id="${todo.id}" class="p-4 d-flex justify-content-between align-items-center">
                            <h3 class="title">${todo.title}</h3>
                            <button type="button" class="btn onhover">X</button>
                        </div>
                    </div>`
    }
    
    document.querySelector('#output').insertAdjacentHTML('beforeend', todohtml);
    
  })
  
}

const createTodo = (title) => {
  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      title,
      completed: false
    })
  })
  .then(res => res.json())
  .then(data => {
    let _todo = {
      title: data.title,
      completed: data.completed,
      id: Date.now()
    }
    todos.unshift(_todo);
    listTodos();
  })
}

document.querySelector('#regForm').addEventListener('submit', (e) => {
  e.preventDefault();

  if (document.querySelector('#todoInput').value.trim() === '') {
    document.querySelector('#todoInput-error').innerText = 'You must enter a TODO'
  } else {
    document.querySelector('#todoInput-error').innerText = ''

    createTodo(document.querySelector('#todoInput').value)
  }
} )

const deleteTodo = id => {
  todos = todos.filter(todo => todo.id != id);
  listTodos(todos);
}

document.querySelector('#output').addEventListener('click', (e) => {

  if (e.target.classList.contains('title')) {
    for( let i = 0; i < todos.length; i++) {
      if(todos[i].id == e.target.parentNode.id) {
        todos[i].completed = !todos[i].completed;
        listTodos()
      }
    } 
  }
  if (e.target.classList.contains('d-flex')) {
    for( let i = 0; i < todos.length; i++) {
      if(todos[i].id == e.target.id) {
        todos[i].completed = !todos[i].completed;
        listTodos()
      }
    } 
  }

  if(e.target.classList.contains('btn-danger' && 'completed')) {
    deleteTodo(e.target.parentNode.id)
  }
  }
)


