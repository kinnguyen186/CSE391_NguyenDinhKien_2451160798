import { useState } from "react";

function ListBasics() {
    const [fruits] = useState([
        "Táo",
        "Chuối",
        "Cam",
        "Nho"
    ]);

    const [students] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ]);

    const averageAge =
        students.reduce(
            (sum, student) => sum + student.age,
            0
        ) / students.length;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Danh sách trái cây</h2>

            <ul>
                {fruits.map((fruit, index) => (
                    <li key={index}>
                        {fruit}
                    </li>
                ))}
            </ul>

            <h2>Danh sách sinh viên</h2>

            {students.map((student, index) => (
                <div
                    key={student.id}
                    style={{
                        padding: "8px",
                        margin: "5px 0",
                        background: "#f5f5f5",
                        color:
                            student.age >= 20
                                ? "green"
                                : "black"
                    }}
                >
                    {index + 1}. {student.name} - {student.age} tuổi
                </div>
            ))}

            <h3>
                Tuổi trung bình:
                {" "}
                {averageAge.toFixed(1)}
            </h3>
        </div>
    );
}

export default ListBasics;