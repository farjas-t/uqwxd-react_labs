import React, { useState, useEffect } from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);
  useEffect(() => {
    if (todos.length > 0) {
      const json = JSON.stringify(todos);
      localStorage.setItem("todos", json);
    }
  }, [todos]);

  // Add the handlesubmit code here
  function handleSubmit(e) {
    e.preventDefault();

    let todo = document.getElementById("todoAdd").value;

    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };

    if (newTodo.text.length > 0) {
      setTodos([...todos].concat(newTodo));
    } else {
      alert("Enter Valid Task");
    }

    document.getElementById("todoAdd").value = "";
  }

  // Add the deleteToDo code here
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  // Add the toggleComplete code here
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  // Add the submitEdits code here
  function submitEdits(newtodo) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === newtodo.id) {
        todo.text = document.getElementById(newtodo.id).value;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" align="right" id="todoAdd" />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map((todo) => (
        <div className="todo" key={todo.id}>
          <div className="todo-text">
            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.id === todoEditing ? (
              <input type="text" id={todo.id} defaultValue={todo.text} />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo)}>Submit Edits</button>
            ) : (
              <button onClick={() => deleteTodo(todo.id)} class="BtnEdit">
                <div class="sign">
                  <svg class="bi bi-trash3-fill" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                  </svg>
                </div>

                <div class="text">Edit</div>
              </button>
            )}
            <button onClick={() => deleteTodo(todo.id)} class="Btn">
              <div class="sign">
                <svg
                  viewBox="0 0 16 16"
                  class="bi bi-trash3-fill"
                  fill="currentColor"
                  height="18"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"></path>
                </svg>
              </div>

              <div class="text">Delete</div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default App;
