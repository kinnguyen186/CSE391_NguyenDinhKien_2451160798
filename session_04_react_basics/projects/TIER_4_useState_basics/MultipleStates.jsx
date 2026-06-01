import { useState } from "react";

function MultipleStates() {
    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [age, setAge] =
        useState("");

    const [isStudent, setIsStudent] =
        useState(false);

    const [submitted, setSubmitted] =
        useState(false);

    function handleSubmit() {
        if (
            name.trim() === "" ||
            email.trim() === "" ||
            age === ""
        ) {
            alert(
                "Vui lòng nhập đầy đủ thông tin!"
            );
            return;
        }

        if (
            Number(age) <= 0 ||
            Number(age) >= 100
        ) {
            alert(
                "Tuổi phải từ 1 đến 99"
            );
            return;
        }

        setSubmitted(true);
    }

    function handleReset() {
        setName("");
        setEmail("");
        setAge("");
        setIsStudent(false);
        setSubmitted(false);
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>
                Form đăng ký
            </h2>

            {name && (
                <h3>
                    Xin chào {name}!
                </h3>
            )}

            {!submitted ? (
                <>
                    <div>
                        <label>
                            Tên:
                        </label>

                        <input
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target
                                        .value
                                )
                            }
                        />
                    </div>

                    <br />

                    <div>
                        <label>
                            Email:
                        </label>

                        <input
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target
                                        .value
                                )
                            }
                        />
                    </div>

                    <br />

                    <div>
                        <label>
                            Tuổi:
                        </label>

                        <input
                            type="number"
                            value={age}
                            onChange={(e) =>
                                setAge(
                                    e.target
                                        .value
                                )
                            }
                        />
                    </div>

                    <br />

                    <label>
                        <input
                            type="checkbox"
                            checked={
                                isStudent
                            }
                            onChange={(e) =>
                                setIsStudent(
                                    e.target
                                        .checked
                                )
                            }
                        />
                        Là sinh viên
                    </label>

                    <br />
                    <br />

                    <button
                        onClick={
                            handleSubmit
                        }
                    >
                        Đăng ký
                    </button>
                </>
            ) : (
                <div
                    style={{
                        background:
                            "#d4edda",
                        padding: "15px"
                    }}
                >
                    <h3>
                        ✅ Đăng ký thành
                        công
                    </h3>

                    <p>
                        Tên: {name}
                    </p>

                    <p>
                        Email:
                        {" "}
                        {email}
                    </p>

                    <p>
                        Tuổi: {age}
                    </p>

                    <p>
                        Sinh viên:
                        {" "}
                        {isStudent
                            ? "Có"
                            : "Không"}
                    </p>

                    <button
                        onClick={
                            handleReset
                        }
                    >
                        Đăng ký lại
                    </button>
                </div>
            )}
        </div>
    );
}

export default MultipleStates;