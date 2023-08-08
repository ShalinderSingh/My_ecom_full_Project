import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/CartReducer";

const CartContext = createContext();

const getLocalCartData = () => {
    let localCartData = localStorage.getItem("Cart");
    if (localCartData === []) {
        return [];
    } else {
        return JSON.parse(localCartData);
    }
};

const initialState = {
    // cart: [],
    cart: getLocalCartData(),
    total_item: "",
    total_price: "",
    shipping_fee: 0,
};

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = (id, color, amount, product) => {
        dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
        console.log(id, color, amount, product, "DGGDGDGDGDGDGDG")
    };



    const setDecrease = (id) => {
        dispatch({ type: "SET_DECREMENT", payload: id });
    };

    const setIncrease = (id) => {
        dispatch({ type: "SET_INCREMENT", payload: id });
    };


    const removeItem = (id) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    };


    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };



    useEffect(() => {
        dispatch({ type: "CART_ITEM_PRICE_TOTAL" });

        localStorage.setItem("Cart", JSON.stringify(state.cart));
    }, [state.cart]);

    return (
        <CartContext.Provider
            value={{
                ...state,
                addToCart,
                removeItem,
                clearCart,
                setDecrease,
                setIncrease,
            }}>
            {children}
        </CartContext.Provider>
    );
};

const useCartContext = () => {
    return useContext(CartContext);
};

export { CartProvider, useCartContext };