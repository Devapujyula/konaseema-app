import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home({ setCart }) {
  const [products, setProducts] = useState([]);

  // Products filter cheyyataniki
  const [selectedCategory, setSelectedCategory] = useState("All");

  // search state
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data));
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === "All" || p.category === selectedCategory;

    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="container">
      <h2 className="text-center my-3">Konaseema Snacks 🥥</h2>

      <input
        type="text"
        placeholder="Search products..."
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="mb-3">
        <button
          onClick={() => setSelectedCategory("All")}
          className="btn btn-dark me-2"
        >
          All
        </button>

        <button
          onClick={() => setSelectedCategory("Sweets")}
          className="btn btn-outline-primary me-2"
        >
          Sweets
        </button>

        <button
          onClick={() => setSelectedCategory("Hot")}
          className="btn btn-outline-danger me-2"
        >
          Hot
        </button>

        <button
          onClick={() => setSelectedCategory("Pickles")}
          className="btn btn-outline-success me-2"
        >
          Pickles
        </button>

        <button
          onClick={() => setSelectedCategory("Karampodi")}
          className="btn btn-outline-warning"
        >
          Karampodi
        </button>
      </div>

      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card shadow h-100">
              <img
                src={`/${product.image}`}
                alt={product.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />

              <div className="card-body text-center">
                <h5>{product.name}</h5>
                <p className="text-muted">{product.category}</p>
                <h6 className="text-success">₹{product.price}</h6>

                <button
                  className="btn btn-warning w-100"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
