import React, { useState, useEffect } from "react";
import axios from "axios";
import { LAB_5_API } from "../../constants";

const TODO_API = `${LAB_5_API}/todos`;

export default function WorkingWithArrays() {
  const [todo, setTodo] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server",
    due: "2021-09-09",
    completed: false,
  });
  const [todos, setTodos] = useState<any[]>([]);
  const fetchTodos = async () => {
    const response = await axios.get(TODO_API);
    setTodos(response.data);
  };
  const fetchTodoById = async (id: number) => {
    const response = await axios.get(`${TODO_API}/${id}`);
    setTodo(response.data);
  };
  const deleteTodo = async (todo: any) => {
    await axios.delete(`${TODO_API}/${todo.id}`);
    setTodos(todos.filter((t) => t.id !== todo.id));
  };
  const postTodo = async () => {
    const response = await axios.post(TODO_API, todo);
    setTodos([...todos, response.data]);
  };
  const updateTodo = async () => {
    await axios.put(`${TODO_API}/${todo.id}`, todo);
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a href={TODO_API} className="btn btn-primary">
        Get Todos
      </a>
      <h3>Creating new Items in an Array</h3>
      <a href={`${TODO_API}/create`} className="btn btn-primary">
        Create Todo
      </a>
      <h4>Retrieving an Item from an Array by ID</h4>
      <a href={`${TODO_API}/${todo.id}`} className="btn btn-primary me-2">
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
        href={`${TODO_API}/${todo.id}/title/${todo.title}`}
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
        href={`${TODO_API}/${todo.id}/completed/${todo.completed}`}
        className="btn btn-primary me-2"
      >
        Update Completed to {todo.completed.toString()}
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
        checked={todo.completed}
      />
      <br />
      <a
        href={`${TODO_API}/${todo.id}/description/${todo.description}`}
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
            description: e.target.value,
          })
        }
      />
      <h3>Deleting from an Array</h3>
      <a href={`${TODO_API}/${todo.id}/delete`} className="btn btn-primary">
        Delete Todo with ID = {todo.id}
      </a>
      <h3>Filtering Array Items</h3>
      <a href={`${TODO_API}?completed=true`} className="btn btn-primary">
        Get Completed Todos
      </a>
      <h3>Fetching Todos</h3>
      <button onClick={postTodo} className="btn btn-primary">
        Post New Todo
      </button>
      <br />
      <button onClick={updateTodo} className="btn btn-success">
        Update Todo
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="mb-2">
            <input
              checked={todo.completed}
              type="checkbox"
              className="me-2"
              readOnly
            />
            {todo.title}
            <p className="mb-0">{todo.description}</p>
            <button
              onClick={() => fetchTodoById(todo.id)}
              className="btn btn-warning me-2"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo)}
              className="btn btn-danger me-2"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
