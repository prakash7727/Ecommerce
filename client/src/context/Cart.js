import { createContext, useContext, useEffect, useState } from "react";

const Cartcontext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCart = localStorage.getItem("cart");
    if (existingCart) setCart(JSON.parse(existingCart));
  }, []);
  return (
    <Cartcontext.Provider value={[cart, setCart]}>
      {children}
    </Cartcontext.Provider>
  );
};

const useCart = () => useContext(Cartcontext);
export { useCart, CartProvider };
