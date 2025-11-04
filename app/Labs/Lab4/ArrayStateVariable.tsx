"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function ArrayStateVariable() {
 const [array, setArray] = useState([1, 2, 3, 4, 5]);
 const { todos } = useSelector((state: any) => state.todosReducer);

 const addElement = () => {
   setArray([...array, Math.floor(Math.random() * 100)]);
 };

 const deleteElement = (index: number) => {
   setArray(array.filter((item, i) => i !== index));
 };

 return (
  <div id="wd-array-state-variables">
   <h2>Array State Variable</h2>
   <button onClick={addElement} className="btn btn-primary mb-2" id="wd-add-array-element-click">Add Element</button>
   <ul className="list-group">
    {array.map((item, index) => (
     <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
       <span>{item}</span>
       <button onClick={() => deleteElement(index)} className="btn btn-outline-danger btn-sm" id={`wd-delete-array-element-${index}-click`}>
        Delete
       </button>
     </li>))}
   </ul>
   <h3>Todos from Redux</h3>
   <ListGroup>
     {todos.map((todo: any) => (
       <ListGroupItem key={todo.id}>
         {todo.title}
       </ListGroupItem>
     ))}
   </ListGroup>
   <hr/>
  </div>
 );
}


