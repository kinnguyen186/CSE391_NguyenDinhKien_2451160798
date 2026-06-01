import { useState } from "react";

function BooleanState() {
    const [isVisible, setIsVisible] =
        useState(true);

    const [isDarkMode, setIsDarkMode] =
        useState(false);

    const [isLiked, setIsLiked] =
        useState(false);

    const [showPassword, setShowPassword] =
        useState(false);

    const [isOpen, setIsOpen] =
        useState(false);

    const [isLightOn, setIsLightOn] =
        useState(false);

    return (
        <div
            style={{
                backgroundColor:
                    isDarkMode
                        ? "#333"
                        : "#fff",
                color:
                    isDarkMode
                        ? "#fff"
                        : "#000",
                padding: "20px",
                minHeight: "100vh"
            }}
        >
            <h2>Toggle Demo</h2>

            <button
                onClick={() =>
                    setIsVisible(
                        !isVisible
                    )
                }
            >
                {isVisible
                    ? "Ẩn nội dung"
                    : "Hiện nội dung"}
            </button>

            {isVisible && (
                <div>
                    Đây là nội dung có
                    thể ẩn hiện
                </div>
            )}

            <hr />

            <button
                onClick={() =>
                    setIsDarkMode(
                        !isDarkMode
                    )
                }
            >
                {isDarkMode
                    ? "☀️ Light Mode"
                    : "🌙 Dark Mode"}
            </button>

            <hr />

            <button
                onClick={() =>
                    setIsLiked(
                        !isLiked
                    )
                }
            >
                {isLiked
                    ? "❤️ Đã thích"
                    : "🤍 Thích"}
            </button>

            <hr />

            <h3>
                Hiện / Ẩn mật khẩu
            </h3>

            <input
                type={
                    showPassword
                        ? "text"
                        : "password"
                }
                placeholder="Nhập mật khẩu"
            />

            <button
                onClick={() =>
                    setShowPassword(
                        !showPassword
                    )
                }
            >
                {showPassword
                    ? "Ẩn"
                    : "Hiện"}
            </button>

            <hr />

            <h3
                onClick={() =>
                    setIsOpen(!isOpen)
                }
                style={{
                    cursor: "pointer"
                }}
            >
                Accordion ▼
            </h3>

            {isOpen && (
                <p>
                    Đây là nội dung
                    accordion.
                </p>
            )}

            <hr />

            <button
                onClick={() =>
                    setIsLightOn(
                        !isLightOn
                    )
                }
            >
                {isLightOn
                    ? "💡 Bật"
                    : "⚫ Tắt"}
            </button>
        </div>
    );
}

export default BooleanState;