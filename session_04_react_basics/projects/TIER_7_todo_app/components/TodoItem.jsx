function TodoItem({
    todo,
    onToggle,
    onDelete
}) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                marginBottom: "8px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                backgroundColor: todo.done
                    ? "#f0fff0"
                    : "#fff"
            }}
        >
            <input
                type="checkbox"
                checked={todo.done}
                onChange={() =>
                    onToggle(todo.id)
                }
            />

            <span
                style={{
                    flex: 1,
                    textDecoration:
                        todo.done
                            ? "line-through"
                            : "none",
                    color:
                        todo.done
                            ? "#888"
                            : "#000"
                }}
            >
                {todo.text}
            </span>

            <button
                onClick={() =>
                    onDelete(todo.id)
                }
                style={{
                    backgroundColor:
                        "#e74c3c",
                    color: "white",
                    border: "none",
                    padding:
                        "5px 10px",
                    cursor: "pointer"
                }}
            >
                Xóa
            </button>
        </div>
    );
}

export default TodoItem;