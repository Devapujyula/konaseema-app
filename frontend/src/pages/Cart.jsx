import { Link } from "react-router-dom";

function Cart({ cart, setCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h2>🛒 Cart</h2>

      <Link to="/" className="btn btn-secondary mb-3">
        Back to Products
      </Link>

      {cart.length === 0 ? (
        <h4 className="text-center mt-4">Your cart is empty 🛒</h4>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="border p-3 mb-3">
            <h5>{item.name}</h5>

            <p>Price: ₹{item.price}</p>

            <div className="d-flex justify-content-center align-items-center gap-2">
              {/* ➖ Decrease */}
              <button
                className="btn btn-danger"
                onClick={() => {
                  if (item.quantity === 1) {
                    setCart(cart.filter((c) => c.id !== item.id));
                  } else {
                    setCart(
                      cart.map((c) =>
                        c.id === item.id
                          ? { ...c, quantity: c.quantity - 1 }
                          : c,
                      ),
                    );
                  }
                }}
              >
                -
              </button>

              <span>{item.quantity}</span>

              {/* ➕ Increase */}
              <button
                className="btn btn-success"
                onClick={() =>
                  setCart(
                    cart.map((c) =>
                      c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c,
                    ),
                  )
                }
              >
                +
              </button>
            </div>

            <p className="mt-2">Total: ₹{item.price * item.quantity}</p>

            {/* Remove */}
            <button
              className="btn btn-outline-danger"
              onClick={() => setCart(cart.filter((c) => c.id !== item.id))}
            >
              Remove
            </button>
          </div>
        ))
      )}

      <h4>Total: ₹{total}</h4>

      {cart.length > 0 && (
        <Link to="/checkout" className="btn btn-success mt-3">
          Proceed to Checkout
        </Link>
      )}
    </div>
  );
}

export default Cart;
