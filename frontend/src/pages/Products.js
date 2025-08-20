import { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products from Django backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // ✅ Handle Add to Cart
  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token"); // get JWT from login
      if (!token) {
        alert("Please login first!");
        return;
      }

      const res = await fetch("http://127.0.0.1:8000/api/cart/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // pass token
        },
        body: JSON.stringify({ product_id: productId, quantity: 1 }),
      });

      if (res.ok) {
        alert("✅ Product added to cart!");
      } else {
        const data = await res.json();
        alert(`❌ Error: ${data.detail || "Could not add to cart"}`);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  if (loading) return <p className="p-6">Loading products...</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded-lg shadow hover:shadow-lg transition"
        >
          {/* ✅ Product image */}
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />
          )}

          <h3 className="text-lg font-bold mt-2">{product.name}</h3>
          <p className="text-gray-600">₹{product.price}</p>

          {/* ✅ Add to Cart Button */}
          <button
            onClick={() => addToCart(product.id)}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
