function PriceTag({
    originalPrice,
    salePrice
}) {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                padding: "15px",
                margin: "10px",
                borderRadius: "8px"
            }}
        >
            <p>
                Giá gốc:
                {" "}
                <span
                    style={{
                        textDecoration:
                            "line-through"
                    }}
                >
                    {originalPrice}đ
                </span>
            </p>

            <p
                style={{
                    color: "red",
                    fontWeight: "bold"
                }}
            >
                Giá sale: {salePrice}đ
            </p>
        </div>
    );
}

export default PriceTag;