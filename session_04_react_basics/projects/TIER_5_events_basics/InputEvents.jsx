import { useState } from "react";

function InputEvents() {
    const [text, setText] = useState("");

    function handleChange(event) {
        setText(event.target.value);
    }

    const wordCount =
        text.trim() === ""
            ? 0
            : text.trim().split(/\s+/).length;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Input Events</h2>

            <input
                value={text}
                onChange={handleChange}
                placeholder="Nhập gì đó..."
                maxLength={100}
                style={{
                    width: "300px",
                    padding: "8px"
                }}
            />

            <p>
                Ký tự:
                {" "}
                {text.length}/100
            </p>

            <p>
                Số từ:
                {" "}
                {wordCount}
            </p>

            <p>
                Bạn đang nhập:
                {" "}
                {text}
            </p>

            {text.includes("@") && (
                <p
                    style={{
                        color: "green"
                    }}
                >
                    ✅ Email hợp lệ
                </p>
            )}

            {text.length > 80 && (
                <p
                    style={{
                        color: "red"
                    }}
                >
                    ⚠️ Sắp hết ký tự
                </p>
            )}
        </div>
    );
}

export default InputEvents;