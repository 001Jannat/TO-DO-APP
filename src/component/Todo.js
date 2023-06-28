import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { EditTodoForm } from "./EditTodoForm";

export const Todo = ({ todo, toggleComplete, deleteTodo, toggleEdit }) => {
  if (!todo) {
    return null; // Return null or handle the case when the todo object is undefined
  }

  const { id, task, completed, isEditing } = todo;

  const handleEditSubmit = (updatedTask) => {
    toggleEdit(id);
    // Update the task using the updatedTask and id
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
