const todoForm =
    document.getElementById("todoForm");

const todoInput =
    document.getElementById("todoInput");

const todoList =
    document.getElementById("todoList");

const itemCount =
    document.getElementById("itemCount");

const clearCompletedBtn =
    document.getElementById("clearCompleted");

const filterButtons =
    document.querySelectorAll(".filter-btn");

let todos =
    JSON.parse(
        localStorage.getItem("todos")
    ) || [];

let currentFilter = "all";

function saveTodos() {

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );
}

function updateCount() {

    const count =
        todos.filter(
            todo => !todo.completed
        ).length;

    itemCount.textContent =
        `${count} items left`;
}

function renderTodos() {

    todoList.innerHTML = "";

    let filteredTodos = todos;

    if (currentFilter === "active") {

        filteredTodos =
            todos.filter(
                todo => !todo.completed
            );
    }

    if (currentFilter === "completed") {

        filteredTodos =
            todos.filter(
                todo => todo.completed
            );
    }

    filteredTodos.forEach(todo => {

        const li =
            document.createElement("li");

        li.className =
            `todo-item ${
                todo.completed
                    ? "completed"
                    : ""
            }`;

        li.dataset.id = todo.id;

        const span =
            document.createElement("span");

        span.className =
            "todo-text";

        span.textContent =
            todo.text;

        const deleteBtn =
            document.createElement("button");

        deleteBtn.className =
            "delete-btn";

        deleteBtn.textContent =
            "❌";

        li.appendChild(span);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);

    });

    updateCount();
}

todoForm.addEventListener(
    "submit",
    e => {

        e.preventDefault();

        const text =
            todoInput.value.trim();

        if (!text) return;

        todos.push({
            id: Date.now(),
            text,
            completed: false
        });

        todoInput.value = "";

        saveTodos();
        renderTodos();
    }
);

todoList.addEventListener(
    "click",
    e => {

        const li =
            e.target.closest("li");

        if (!li) return;

        const id =
            Number(li.dataset.id);

        if (
            e.target.classList.contains(
                "delete-btn"
            )
        ) {

            todos =
                todos.filter(
                    todo =>
                        todo.id !== id
                );
        }

        else if (
            e.target.classList.contains(
                "todo-text"
            )
        ) {

            const todo =
                todos.find(
                    todo =>
                        todo.id === id
                );

            todo.completed =
                !todo.completed;
        }

        saveTodos();
        renderTodos();
    }
);

todoList.addEventListener(
    "dblclick",
    e => {

        if (
            !e.target.classList.contains(
                "todo-text"
            )
        ) return;

        const span =
            e.target;

        const li =
            span.parentElement;

        const id =
            Number(li.dataset.id);

        const input =
            document.createElement(
                "input"
            );

        input.value =
            span.textContent;

        input.className =
            "edit-input";

        li.replaceChild(
            input,
            span
        );

        input.focus();

        input.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter"
                ) {

                    const todo =
                        todos.find(
                            t =>
                                t.id === id
                        );

                    todo.text =
                        input.value.trim();

                    saveTodos();
                    renderTodos();
                }
            }
        );
    }
);

filterButtons.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            filterButtons.forEach(
                b =>
                    b.classList.remove(
                        "active"
                    )
            );

            btn.classList.add(
                "active"
            );

            currentFilter =
                btn.dataset.filter;

            renderTodos();
        }
    );

});

clearCompletedBtn
    .addEventListener(
        "click",
        () => {

            todos =
                todos.filter(
                    todo =>
                        !todo.completed
                );

            saveTodos();
            renderTodos();
        }
    );

renderTodos();