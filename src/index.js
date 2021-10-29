import "./style.css";
import { Todo, TodoList } from "./classes";
import { crearTodoHTML } from "./js/componentes";

export const todoList = new TodoList();

// todoList.todos.forEach((todo) => {
//     crearTodoHTML(todo);
// });

//simplificacion del codigo anterior
todoList.todos.forEach(crearTodoHTML);

console.log("todos", todoList.todos);
