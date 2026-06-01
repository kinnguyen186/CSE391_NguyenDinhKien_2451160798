import { useState } from "react";

import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";

function App() {
    const [todos, setTodos] =
        useState([]);

    const [inputValue,
        setInputValue] =
        useState("");

    const [filter,
        setFilter] =
        useState("all");

    const [message,
        setMessage] =
        useState("");

    function addTodo() {
        if (
            inputValue.trim() === ""
        ) {
            setMessage(
                "Vui lòng nhập công việc!"
            );
            return;
        }

        const newTodo = {
            id: Date.now(),
            text: inputValue,
            done: false
        };

        setTodos([
            ...todos,
            newTodo
        ]);

        setInputValue("");

        setMessage(
            "Đã thêm công việc!"
        );
    }

    function handleKeyDown(
        event
    ) {
        if (
            event.key === "Enter"
        ) {
            addTodo();
        }
    }

    function toggleTodo(id) {
        setTodos(
            todos.map(todo =>
                todo.id === id
                    ? {
                          ...todo,
                          done:
                              !todo.done
                      }
                    : todo
            )
        );
    }

    function deleteTodo(id) {
        const todo =
            todos.find(
                item =>
                    item.id === id
            );

        const confirmDelete =
            window.confirm(
                `Xóa "${todo.text}" ?`
            );

        if (!confirmDelete) {
            return;
        }

        setTodos(
            todos.filter(
                todo =>
                    todo.id !== id
            )
        );

        setMessage(
            "Đã xóa công việc!"
        );
    }

    const filteredTodos =
        todos.filter(todo => {
            if (
                filter ===
                "active"
            ) {
                return !todo.done;
            }

            if (
                filter ===
                "completed"
            ) {
                return todo.done;
            }

            return true;
        });

    const totalTodos =
        todos.length;

    const activeCount =
        todos.filter(
            todo => !todo.done
        ).length;

    const completedCount =
        todos.filter(
            todo => todo.done
        ).length;

    return (
        <div
            style={{
                maxWidth:
                    "600px",
                margin:
                    "20px auto",
                padding:
                    "20px"
            }}
        >
            <h1>
                📋 Todo App
            </h1>

            <div
                style={{
                    display:
                        "flex",
                    gap: "10px"
                }}
            >
                <input
                    type="text"
                    value={
                        inputValue
                    }
                    onChange={(
                        e
                    ) =>
                        setInputValue(
                            e.target
                                .value
                        )
                    }
                    onKeyDown={
                        handleKeyDown
                    }
                    placeholder="Nhập công việc..."
                    style={{
                        flex: 1,
                        padding:
                            "8px"
                    }}
                />

                <button
                    onClick={
                        addTodo
                    }
                >
                    Thêm
                </button>
            </div>

            {message && (
                <p
                    style={{
                        color:
                            "green"
                    }}
                >
                    {message}
                </p>
            )}

            <TodoFilter
                filter={filter}
                setFilter={
                    setFilter
                }
            />

            {filteredTodos.length ===
            0 ? (
                <p>
                    Không có công
                    việc nào
                </p>
            ) : (
                filteredTodos.map(
                    todo => (
                        <TodoItem
                            key={
                                todo.id
                            }
                            todo={
                                todo
                            }
                            onToggle={
                                toggleTodo
                            }
                            onDelete={
                                deleteTodo
                            }
                        />
                    )
                )
            )}

            <hr />

            <h3>
                Thống kê
            </h3>

            <p>
                Tổng số việc:
                {" "}
                {totalTodos}
            </p>

            <p>
                Chưa hoàn thành:
                {" "}
                {activeCount}
            </p>

            <p>
                Đã hoàn thành:
                {" "}
                {completedCount}
            </p>
        </div>
    );
}

export default App;