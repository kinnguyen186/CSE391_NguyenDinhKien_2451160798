import { useState } from "react";

function ClickEvents() {
    const [message, setMessage] = useState("Chưa click");
    const [clickCount, setClickCount] = useState(0);

    const [like, setLike] = useState(false);

    const [color, setColor] = useState("#3498db");

    function handleClick() {
        setMessage(
            "Đã click lúc " +
            new Date().toLocaleTimeString()
        );

        setClickCount(clickCount + 1);
    }

    function handleReset() {
        setMessage("Đã reset!");
        setClickCount(0);
    }

    function randomColor() {
        const random =
            "#" +
            Math.floor(
                Math.random() * 16777215
            ).toString(16);

        setColor(random);
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Click Events</h2>

            <p>{message}</p>

            <p>
                Số lần click: {clickCount}
            </p>

            <button onClick={handleClick}>
                Click me!
            </button>

            <button onClick={handleReset}>
                Reset
            </button>

            <button onClick={randomColor}>
                Đổi màu ngẫu nhiên
            </button>

            <button
                onClick={() =>
                    setLike(!like)
                }
            >
                {like
                    ? "❤️ Đã thích"
                    : "🤍 Thích"}
            </button>

            <div
                style={{
                    width: "200px",
                    height: "100px",
                    background: color,
                    marginTop: "20px"
                }}
            />
        </div>
    );
}

export default ClickEvents;