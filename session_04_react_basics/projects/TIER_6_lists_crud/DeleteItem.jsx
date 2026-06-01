import { useState } from "react";

function DeleteItem() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh" },
        { id: 2, name: "An" },
        { id: 3, name: "Linh" }
    ]);

    const [message, setMessage] = useState("");

    function handleDelete(id) {
        const student = items.find(
            (item) => item.id === id
        );

        const confirmDelete = window.confirm(
            `Xóa ${student.name}?`
        );

        if (!confirmDelete) {
            return;
        }

        setItems(
            items.filter(
                (item) => item.id !== id
            )
        );

        setMessage(
            `Đã xóa ${student.name}`
        );
    }

    function handleDeleteAll() {
        const confirmDelete = window.confirm(
            "Bạn có chắc muốn xóa tất cả?"
        );

        if (!confirmDelete) {
            return;
        }

        setItems([]);
        setMessage("Đã xóa toàn bộ danh sách");
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Xóa sinh viên</h2>

            {items.length > 0 && (
                <button
                    onClick={handleDeleteAll}
                    style={{
                        background: "#e74c3c",
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        marginBottom: "10px"
                    }}
                >
                    🗑 Xóa tất cả
                </button>
            )}

            {message && (
                <p style={{ color: "green" }}>
                    {message}
                </p>
            )}

            {items.length === 0 ? (
                <p
                    style={{
                        color: "#888"
                    }}
                >
                    Danh sách trống
                </p>
            ) : (
                items.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            alignItems: "center",
                            padding: "10px",
                            margin: "5px 0",
                            background:
                                "#f5f5f5"
                        }}
                    >
                        <span>
                            {item.name}
                        </span>

                        <button
                            onClick={() =>
                                handleDelete(
                                    item.id
                                )
                            }
                            style={{
                                background:
                                    "#e74c3c",
                                color:
                                    "white",
                                border:
                                    "none",
                                padding:
                                    "5px 10px"
                            }}
                        >
                            Xóa
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default DeleteItem;