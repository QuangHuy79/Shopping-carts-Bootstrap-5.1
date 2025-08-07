import React, { createContext, useContext, useReducer, useState } from "react";

// 1. Tạo context
const CartContext = createContext();
const initialCartItems = [
  {
    id: "1",
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    image: "assets/images/product1.jpg",
    description: "Your perfect pack for everyday use.",
    quantity: 2,
  },
  {
    id: "5",
    title: "John Hardy Women's Dragon Bracelet",
    price: 695,
    image: "assets/images/product5.jpg",
    description: "Wear facing inward to be bestowed with love.",
    quantity: 1,
  },
];

// 🎯 Reducer quản lý logic thêm / sửa / xoá sản phẩm
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;
      const existingItem = state.find((item) => item.id === product.id);
      if (existingItem) {
        // Nếu đã có sản phẩm → tăng số lượng
        return state.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Nếu chưa có → thêm mới
        return [...state, { ...product, quantity: 1 }];
      }
    }
    case "REMOVE_FROM_CART": {
      // Xóa sản phẩm khỏi giỏ hàng
      return state.filter((item) => item.id !== action.payload);
    }
    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      // Cập nhật số lượng sản phẩm
      return state.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    }
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

// 2. Provider bao bọc toàn app
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, dispatch] = useReducer(cartReducer, []);
  const [cartItems, dispatch] = useReducer(cartReducer, initialCartItems); // ✅ fix cứng

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // ✅ Hàm thêm sản phẩm
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  // Cập nhật sản phẩm vào giỏ hàng
  const updateQuantity = (id, newQuantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, quantity: newQuantity },
    });
  };
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        openCart,
        closeCart,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity, // 👈 THÊM DÒNG NÀY
        clearCart, // ✅ thêm dòng này
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 3. Custom hook cho tiện
export const useCart = () => useContext(CartContext);
