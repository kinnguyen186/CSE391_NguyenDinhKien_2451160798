import { useState } from "react";

function StringState() {
    const [name, setName] = useState("");
    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Nhập thông tin</h2>

            <div>
                <label>Tên: </label>

                <input
                    value={name}
                    onChange={(e) =>
                        setName(
                            e.target.value
                        )
                    }
                    placeholder="Nhập tên..."
                />
            </div>

            <br />

            <div>
                <label>Email: </label>

                <input
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                    placeholder="Nhập email..."
                />
            </div>

            <br />

            <div>
                <label>
                    Mật khẩu:
                </label>

                <input
                    type={
                        showPassword
                            ? "text"
                            : "password"
                    }
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
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
            </div>

            <hr />

            <p>
                Ký tự đã nhập:
                {" "}
                {name.length}/100
            </p>

            <p>
                Email:
                {" "}
                {email.includes("@")
                    ? "✅ Hợp lệ"
                    : "❌ Chưa hợp lệ"}
            </p>

            <h3>
                Thông tin đã nhập
            </h3>

            <p>
                Tên:
                {" "}
                {name ||
                    "(chưa nhập)"}
            </p>

            <p>
                Email:
                {" "}
                {email ||
                    "(chưa nhập)"}
            </p>

            {name && (
                <div
                    style={{
                        background:
                            "#f0f0f0",
                        padding: "10px"
                    }}
                >
                    Xin chào
                    {" "}
                    <strong>
                        {name}
                    </strong>
                    !
                </div>
            )}
        </div>
    );
}

export default StringState;