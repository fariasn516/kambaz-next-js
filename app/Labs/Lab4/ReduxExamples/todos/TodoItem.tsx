"use client";

import { useDispatch } from "react-redux";
import { ListGroupItem, Button } from "react-bootstrap";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();

  return (
    <ListGroupItem key={todo.id} className="d-flex justify-content-between align-items-center">
      <div>
        <Button onClick={() => dispatch(deleteTodo(todo.id))}
                id="wd-delete-todo-click" className="btn-sm me-2"> Delete </Button>
        <Button onClick={() => dispatch(setTodo(todo))}
                id="wd-set-todo-click" className="btn-sm"> Edit </Button>
        {todo.title}
      </div>
    </ListGroupItem>
  );
}

