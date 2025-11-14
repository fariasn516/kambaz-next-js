"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    title: "Sample Task",
    description: "Sample description",
    completed: false,
  });

  return (
    <div id="wd-working-with-arrays">
      <h2>Working with Arrays</h2>

      <h4>Retrieving Arrays</h4>
      <a className="btn btn-primary" href={API}>Get Todos</a>
      <hr />

      <h4>Retrieving an Item from an Array by ID</h4>
      <a className="btn btn-primary float-end" href={`${API}/${todo.id}`}>Get Todo by ID</a>
      <FormControl className="w-50" defaultValue={todo.id} onChange={e => setTodo({ ...todo, id: e.target.value })} />
      <hr />

      <h4>Filtering Array Items</h4>
      <a className="btn btn-primary" href={`${API}?completed=true`}>Get Completed Todos</a>
      <hr />

      <h4>Creating new Items in an Array</h4>
      <a className="btn btn-primary" href={`${API}/create`}>Create Todo</a>
      <hr />

      <h4>Removing from an Array</h4>
      <a className="btn btn-primary float-end" href={`${API}/${todo.id}/delete`}>
        Remove Todo with ID = {todo.id}
      </a>
      <FormControl defaultValue={todo.id} className="w-50" onChange={e => setTodo({ ...todo, id: e.target.value })} />
      <hr />

      <h4>Updating an Item in an Array</h4>
      <a className="btn btn-primary float-end" href={`${API}/${todo.id}/title/${todo.title}`}>
        Update Title
      </a>
      <FormControl defaultValue={todo.id} className="w-25 float-start me-2" onChange={e => setTodo({ ...todo, id: e.target.value })} />
      <FormControl defaultValue={todo.title} className="w-50 float-start" onChange={e => setTodo({ ...todo, title: e.target.value })} />
      <br /><br /><hr />

      <h4>Update Description</h4>
      <a className="btn btn-warning float-end" href={`${API}/${todo.id}/description/${todo.description}`}>
        Update Description
      </a>
      <FormControl defaultValue={todo.description} className="w-75" onChange={e => setTodo({ ...todo, description: e.target.value })} />
      <hr />

      <h4>Update Completed</h4>
      <a className="btn btn-success float-end" href={`${API}/${todo.id}/completed/${todo.completed}`}>
        Update Completed
      </a>
      <input type="checkbox" checked={todo.completed} className="form-check-input" onChange={e => setTodo({ ...todo, completed: e.target.checked })} />
      <hr />
    </div>
  );
}
