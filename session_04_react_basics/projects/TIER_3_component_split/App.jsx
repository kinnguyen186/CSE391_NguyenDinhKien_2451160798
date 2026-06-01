import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import UserCard from "./components/UserCard";
import PriceTag from "./components/PriceTag";

function App() {
    const products = [
        {
            id: 1,
            name: "iPhone 15",
            price: "25.000.000",
            image: "https://via.placeholder.com/200"
        },
        {
            id: 2,
            name: "Samsung S24",
            price: "22.000.000",
            image: "https://via.placeholder.com/200"
        },
        {
            id: 3,
            name: "Xiaomi 14",
            price: "15.000.000",
            image: "https://via.placeholder.com/200"
        }
    ];

    return (
        <div>
            <Header />

            <h2
                style={{
                    textAlign: "center"
                }}
            >
                Danh sách sản phẩm
            </h2>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                    />
                ))}
            </div>

            <h2
                style={{
                    textAlign: "center"
                }}
            >
                User Cards
            </h2>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <UserCard
                    name="Minh"
                    email="minh@gmail.com"
                    avatar="https://via.placeholder.com/100"
                />

                <UserCard
                    name="An"
                    email="an@gmail.com"
                    avatar="https://via.placeholder.com/100"
                />

                <UserCard
                    name="Linh"
                    email="linh@gmail.com"
                    avatar="https://via.placeholder.com/100"
                />
            </div>

            <h2
                style={{
                    textAlign: "center"
                }}
            >
                Price Tags
            </h2>

            <PriceTag
                originalPrice="30.000.000"
                salePrice="25.000.000"
            />

            <PriceTag
                originalPrice="20.000.000"
                salePrice="17.500.000"
            />

            <Footer />
        </div>
    );
}

export default App;