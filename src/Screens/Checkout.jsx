import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();


  const cartData = useSelector((state) => state.product.cartData);
  const items = Object.values(cartData);

  const subtotal = items.reduce((acc, item) => {
    const price = item?.productData?.price || 0;
    const qty = item?.quantity || 0;
    return acc + price * qty;
  }, 0);



  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    if (!form.name || !form.address || !form.phone) {
      alert("Please fill all details");
      return;
    }

    if (items.length === 0) {
      alert("Cart is empty");
      return;
    }

    alert("Order Placed Successfully 🎉");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />

      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-6">

          {/* Shipping Form */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl text-black font-bold mb-4">Shipping Details</h2>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-3 text-black"
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-3 text-black"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded text-black"
            />
          </div>


          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4 text-bla text-black">Your Items</h2>

            {items.length === 0 ? (
              <p className="text-gray-500 ">Cart is empty</p>
            ) : (
              items.map((item) => {
                const product = item.productData;

                return (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 border-b pb-4 mb-4 text-black"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-20 h-20 object-contain"
                    />

                    <div className="flex-1">
                      <h3 className="font-bold">{product.title}</h3>
                      <p className="text-gray-500">{product.brand}</p>
                      <p>${product.price}</p>
                      <p className="text-sm">Qty: {item.quantity}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow h-fit">
          <h2 className="text-xl font-bold mb-4 text-black">Order Summary</h2>

          <div className="space-y-3 text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
          </div>

          <div className="mt-6 border-t pt-4 flex justify-between items-center">
            <span className="font-bold text-black">Total</span>
            <span className="text-xl font-bold text-indigo-600">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleOrder}
            className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;