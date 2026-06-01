function ConditionalRendering() {
    const isLoggedIn = true;
    const score = 85;

    const hasNotification = true;
    const notificationCount = 5;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Conditional Rendering Demo</h1>

            <hr />

            <h2>Ternary Operator</h2>

            <h3>
                {isLoggedIn
                    ? "Chào mừng bạn!"
                    : "Vui lòng đăng nhập"}
            </h3>

            <p>
                Kết quả:
                {" "}
                {score >= 5 ? "Đậu" : "Rớt"}
            </p>

            <p>
                Xếp loại:
                {
                    score >= 9
                        ? " Xuất sắc"
                        : score >= 8
                        ? " Giỏi"
                        : score >= 7
                        ? " Khá"
                        : score >= 5
                        ? " Trung bình"
                        : " Yếu"
                }
            </p>

            <hr />

            <h2>Toán tử &&</h2>

            {hasNotification && (
                <div
                    style={{
                        background: "#fff3cd",
                        padding: "10px"
                    }}
                >
                    Bạn có {notificationCount} thông báo mới!
                </div>
            )}

            {!hasNotification && (
                <p>Không có thông báo</p>
            )}
        </div>
    );
}

export default ConditionalRendering;