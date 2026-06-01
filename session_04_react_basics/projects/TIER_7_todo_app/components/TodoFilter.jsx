function TodoFilter({
    filter,
    setFilter
}) {
    return (
        <div
            style={{
                display: "flex",
                gap: "10px",
                marginBottom: "15px"
            }}
        >
            <button
                onClick={() =>
                    setFilter("all")
                }
            >
                Tất cả
            </button>

            <button
                onClick={() =>
                    setFilter("active")
                }
            >
                Chưa xong
            </button>

            <button
                onClick={() =>
                    setFilter("completed")
                }
            >
                Hoàn thành
            </button>
        </div>
    );
}

export default TodoFilter;