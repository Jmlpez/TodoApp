import { Todo } from "./todo.class";

export class TodoList {
    constructor() {
        this.cargarLocalStorage();
    }
    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
    }
    eliminarTodo(id) {
        this.todos = this.todos.filter((todo) => {
            return todo.id != id;
        });
        this.guardarLocalStorage();
    }
    marcarCompletado(id) {
        for (const todo of this.todos) {
            if (todo.id == id) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }
    eliminarCompletados() {
        this.todos = this.todos.filter((todo) => {
            return !todo.completado;
        });
        this.guardarLocalStorage();
    }
    guardarLocalStorage() {
        localStorage.setItem("todo", JSON.stringify(this.todos));
    }
    cargarLocalStorage() {
        this.todos = localStorage.getItem("todo") ? JSON.parse(localStorage.getItem("todo")) : [];
        this.todos = this.todos.map((obj) => {
            return Todo.fromJson(obj);
        });
    }
}
