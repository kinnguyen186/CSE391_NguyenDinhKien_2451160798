function Header() {
    return (
        <header
            style={{
                background: "#3498db",
                color: "white",
                padding: "15px"
            }}
        >
            <h1>Cửa hàng điện thoại</h1>

            <nav>
                <a
                    href="#"
                    style={{
                        color: "white",
                        marginRight: "15px"
                    }}
                >
                    Trang chủ
                </a>

                <a
                    href="#"
                    style={{
                        color: "white",
                        marginRight: "15px"
                    }}
                >
                    Sản phẩm
                </a>

                <a
                    href="#"
                    style={{
                        color: "white"
                    }}
                >
                    Liên hệ
                </a>
            </nav>
        </header>
    );
}

export default Header;