import { useState } from "react";

function FormEvents() {
    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            message: ""
        });

    const [submitted, setSubmitted] =
        useState(false);

    function handleChange(event) {
        const { name, value } =
            event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (
            formData.name === "" ||
            formData.email === ""
        ) {
            alert(
                "Vui lòng nhập đầy đủ thông tin"
            );
            return;
        }

        if (
            !formData.email.includes(
                "@"
            )
        ) {
            alert(
                "Email không hợp lệ"
            );
            return;
        }

        if (
            formData.password !==
            formData.confirmPassword
        ) {
            alert(
                "Mật khẩu xác nhận không khớp"
            );
            return;
        }

        setSubmitted(true);
    }

    function handleReset() {
        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            message: ""
        });

        setSubmitted(false);
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Form Events</h2>

            {!submitted ? (
                <form
                    onSubmit={
                        handleSubmit
                    }
                >
                    <input
                        name="name"
                        placeholder="Tên"
                        value={
                            formData.name
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <br />
                    <br />

                    <input
                        name="email"
                        placeholder="Email"
                        value={
                            formData.email
                        }
                        onChange={
                            handleChange
                        }
                    />

                    {!formData.email.includes(
                        "@"
                    ) &&
                        formData.email !==
                            "" && (
                            <p
                                style={{
                                    color:
                                        "red"
                                }}
                            >
                                Email không
                                hợp lệ
                            </p>
                        )}

                    <br />

                    <input
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        value={
                            formData.password
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <br />
                    <br />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Xác nhận mật khẩu"
                        value={
                            formData.confirmPassword
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <br />
                    <br />

                    <textarea
                        name="message"
                        rows={4}
                        value={
                            formData.message
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <br />
                    <br />

                    <button type="submit">
                        Gửi
                    </button>

                    <button
                        type="button"
                        onClick={
                            handleReset
                        }
                    >
                        Xóa
                    </button>
                </form>
            ) : (
                <div>
                    <h3>
                        ✅ Đã gửi thành
                        công
                    </h3>

                    <p>
                        Tên:
                        {" "}
                        {
                            formData.name
                        }
                    </p>

                    <p>
                        Email:
                        {" "}
                        {
                            formData.email
                        }
                    </p>

                    <p>
                        Tin nhắn:
                        {" "}
                        {
                            formData.message
                        }
                    </p>

                    <button
                        onClick={
                            handleReset
                        }
                    >
                        Gửi lại
                    </button>
                </div>
            )}
        </div>
    );
}

export default FormEvents;