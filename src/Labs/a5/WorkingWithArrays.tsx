import React, { useState } from "react";

const API = "http://localhost:4000/a5/todos";

export default function WorkingWithArrays() {
  const [todo, setTodo] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });

  return (
    <div>
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a href={API} className="btn btn-primary">
        Get Todos
      </a>
      <h3>Creating new Items in an Array</h3>
      <a href={`${API}/create`} className="btn btn-primary">
        Create Todo
      </a>
      <h4>Retrieving an Item from an Array by ID</h4>
      <a href={`${API}/${todo.id}`} className="btn btn-primary me-2">
        Get Todo by ID
      </a>
      <input
        type="number"
        value={todo.id}
        onChange={(e) =>
          setTodo({ ...todo, id: e.target.value as unknown as number })
        }
        className="me-2"
      />
      <h3>Updating an Item in an Array</h3>
      <a
        href={`${API}/${todo.id}/title/${todo.title}`}
        className="btn btn-primary me-2"
      >
        Update Title to {todo.title}
      </a>
      <input
        type="text"
        value={todo.title}
        onChange={(e) =>
          setTodo({
            ...todo,
            title: e.target.value,
          })
        }
      />
      <br />
      <a
        href={`${API}/${todo.id}/completed/${todo.completed}`}
        className="btn btn-primary me-2"
      >
        Update Completed to {todo.title}
      </a>
      <input
        type="checkbox"
        value={todo.completed.toString()}
        onChange={(e) =>
          setTodo({
            ...todo,
            completed: e.target.checked,
          })
        }
      />
      <br />
      <a
        href={`${API}/${todo.id}/description/${todo.description}`}
        className="btn btn-primary me-2"
      >
        Update Description to {todo.description}
      </a>
      <input
        type="text"
        value={todo.description}
        onChange={(e) =>
          setTodo({
            ...todo,
            title: e.target.value,
          })
        }
      />
      <h3>Deleting from an Array</h3>
      <a href={`${API}/${todo.id}/delete`} className="btn btn-primary">
        Delete Todo with ID = {todo.id}
      </a>
      <h3>Filtering Array Items</h3>
      <a href={`${API}?completed=true`} className="btn btn-primary">
        Get Completed Todos
      </a>
    </div>
  );
}
