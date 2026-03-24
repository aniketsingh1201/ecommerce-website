import React from "react";
import Home from "./Screens/Home";
import Pdp from "./Screens/Pdp";
import { Routes, Route } from "react-router-dom";
import ThemeProvider from "./Store/ThemeProvider";
import ProductCategory from "./Screens/ProductCategory";
import Wishlist from "./Screens/WishIist";
import Cart from "./Screens/Cart";
import Checkout from "./Screens/Checkout";

const App = () => {
    
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Pdp />} />
        <Route path="/category/:url" element={<ProductCategory />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </ThemeProvider>

  );
};

export default App;
