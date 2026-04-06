import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = () => {
    axios
      .post("http://localhost:5000/api/orders", {
        name,
        address,
        cart,
        total,
      })
      .then(() => {
        alert("Order placed successfully 🎉");

        setCart([]); // clear state
        localStorage.removeItem("cart"); // clear storage

        navigate("/success");
        // window.location.href = "/success"; // redirect
      })
      .catch((err) => {
        console.log("ERROR:", err.response?.data || err.message);
        alert("Order failed ❌");
      });
  };

  const handlePayment = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/create-order", {
        total,
      });

      const order = res.data;

      const options = {
        key: "rzp_test_SYVcGNOFWbllpD", // your key
        amount: order.amount,
        currency: "INR",
        name: "Konaseema Snacks",
        description: "Order Payment",
        order_id: order.id,

        handler: function () {
          // ONLY here call order save
          handleOrder();
        },

        prefill: {
          name: name,
        },

        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container mt-4">
      <h2>Checkout</h2>

      <h4>Order Summary</h4>

      {cart.map((item) => (
        <div key={item.id}>
          {item.name} × {item.quantity} = ₹{item.price * item.quantity}
        </div>
      ))}

      <h4>Total: ₹{total}</h4>

      <hr />

      <h4>Delivery Details</h4>

      <input
        className="form-control mb-2"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button className="btn btn-success" onClick={handlePayment}>
        Pay & Place Order 💳
      </button>
    </div>
  );
}

export default Checkout;
