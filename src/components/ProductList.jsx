import {useState} from "react";
import { useFetch} from "../hooks/useFetch";
import Spinner from '../assets/spinner.gif';


export default function ProductList() {
    const [url, setUrl] = useState("http://localhost:8000/products");
    const {data : products, loading, error} = useFetch(url, {name:"taqi"});

    return (
        <section>
            <div className="filter">
                <button onClick={() => setUrl("http://localhost:8000/products")}>All</button>
                <button onClick={() => setUrl("http://localhost:8000/products?in_stock_like=true")}>In Stock</button>
                <button onClick={() => setUrl("http://localhost:8000/products?in_stock_like=false")}>Out of Stock</button>
            </div>
            {loading && <p className="loading"><img src={Spinner} alt="loading..." /></p>}
            {error && <p className="error">{error}</p>}
            {products && products.map((product) => (
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