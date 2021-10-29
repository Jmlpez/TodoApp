import { Todo } from "../classes";
import { todoList } from "../index";

//Referencias en el HTML
const divTodoList = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const btnBorrar = document.querySelector(".clear-completed");
const ulFiltros = document.querySelector(".filters");
const anchorFiltros = document.querySelectorAll(".filtro");

export const crearTodoHTML = (todo) => {
    const htmlTodo = `<li class = "${todo.completado ? "completed" : ""}" data-id = "${todo.id}">
        <div class = "view">
            <input class = "toggle" type = "checkbox" ${todo.completado ? "checked" : ""}> 
            <label> ${todo.tarea} </label>
            <button class = "destroy"></button>
        </div>
        <input class = "edit" value = "Create a TodoWVC tempate">
    </li>
    `;
    const div = document.createElement("div");
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
};

//Eventos
txtInput.addEventListener("keyup", (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        const newTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(newTodo);
        crearTodoHTML(newTodo);
        txtInput.value = "";
    }
});

divTodoList.addEventListener("click", (event) => {
    //evento(mouse)->target(elemento html)->localName(nombre del tag HTML)
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute("data-id");

    if (nombreElemento.includes("input")) {
        //click en el check
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle("completed");
    } else if (nombreElemento.includes("button")) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
});

btnBorrar.addEventListener("click", () => {
    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if (elemento.classList.contains("completed")) {
            divTodoList.removeChild(elemento);
        }
    }
});
ulFiltros.addEventListener("click", (event) => {
    const filtro = event.target.text;
    // console.log(filtro);
    if (!filtro) return;

    anchorFiltros.forEach((elem) => {
        elem.classList.remove("selected");
    });
    // console.log(anchorFiltros);
    event.target.classList.add("selected");

    for (const el of divTodoList.children) {
        el.classList.remove("hidden");
        const completado = el.classList.contains("completed");
        switch (filtro) {
            case "Active":
                if (completado) {
                    el.classList.add("hidden");
                }
                break;
            case "Completed":
                if (!completado) {
                    el.classList.add("hidden");
                }
                break;
        }
    }
});
