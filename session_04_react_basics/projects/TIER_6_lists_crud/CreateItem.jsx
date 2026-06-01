import { useState } from "react";

function CreateItem() {
    const [items, setItems] = useState([
        { id: 1, name: "HTML" },
        { id: 2, name: "CSS" }
    ]);

    const [newName, setNewName] = useState("");
    const [message, setMessage] = useState("");

    function handleAdd() {
        if (newName.trim() === "") {
            setMessage("Tên môn học không được để trống!");
            return;
        }

        const newItem = {
            id: Date.now(),
            name: newName.trim()
        };

        setItems([...items, newItem]);

        setNewName("");
        setMessage("Đã thêm thành công!");
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            handleAdd();
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Thêm môn học</h2>

            <div style={{ marginBottom: "15px" }}>
                <input
                    type="text"
                    value={newName}
                    placeholder="Nhập tên môn học..."
                    onChange={(e) =>
                        setNewName(e.target.value)
                    }
                    onKeyDown={handleKeyPress}
                    style={{
                        padding: "8px",
                        marginRight: "10px"
                    }}
                />

                <button
                    onClick={handleAdd}
                    style={{
                        padding: "8px 16px"
                    }}
                >
                    ➕ Thêm
                </button>
            </div>

            {message && (
                <p
                    style={{
                        color: message.includes("thành công")
                            ? "green"
                            : "red"
                    }}
                >
                    {message}
                </p>
            )}

            <h3>
                Danh sách ({items.length} môn)
            </h3>

            {items.map((item) => (
                <div
                    key={item.id}
                    style={{
                        padding: "8px",
                        borderBottom:
                            "1px solid #ddd"
                    }}
                >
                    {item.name}
                </div>
            ))}
        </div>
    );
}

export default CreateItem;