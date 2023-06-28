import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";

export const Todo = ({ todo, toggleComplete, deleteTodo, toggleEdit, editTodo }) => {
  const { id, task, completed, isEditing } = todo;

  const handleEditSubmit = (updatedTask) => {
    toggleEdit(id);
    editTodo(updatedTask, id);
  };

  if (isEditing) {
    return (
      <div className="Todo">
        <EditTodoForm editTodo={handleEditSubmit} task={task} />
      </div>
    );
  }

  return (
    <div className="Todo">
      <p
        onClick={() => toggleComplete(id)}
        className={`${completed ? "completed" : ""}`}
      >
        {task}
      </p>
      <div>
        <FontAwesomeIcon icon={faPen} onClick={() => toggleEdit(id)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(id)} />
      </div>
    </div>
  );
};

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleEdit = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTodo = (updatedTask, id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, task: updatedTask } : todo
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          toggleEdit={toggleEdit}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
};
