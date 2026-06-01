function UserCard({
    name,
    email,
    avatar
}) {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                margin: "10px",
                width: "220px",
                textAlign: "center"
            }}
        >
            <img
                src={avatar}
                alt={name}
                style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%"
                }}
            />

            <h3>{name}</h3>

            <p>{email}</p>
        </div>
    );
}

export default UserCard;