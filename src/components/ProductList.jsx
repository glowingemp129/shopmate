import {useEffect, useState} from "react";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [url, setUrl] = useState("http://localhost:8000/products");
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setProducts(data);
        }
        fetchProducts();
    }, [url]);

    return (
        <section>
            <div className="filter">
                <button onClick={() => setUrl("http://localhost:8000/products")}>All</button>
                <button onClick={() => setUrl("http://localhost:8000/products?in_stock_like=true")}>In Stock</button>
                <button onClick={() => setUrl("http://localhost:8000/products?in_stock_like=false")}>Out of Stock</button>
            </div>
            {products.map((product) => (
                <div className="card" key={product.id}>
                    <p className="id">{product.id}</p>
                    <p className="name">{product.name}</p>
                    <p className="info">
                        <span className="">${product.price}</span>
                        <span className={product.in_stock ? "instock" : "unavailable"}>{product.in_stock ? "In Stock" : "Out of Stock"}</span>
                    </p>
                </div>
            ))}
        </section>
    );
}