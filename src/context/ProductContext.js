import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/ProductReducer";

const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products";


const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading: false,
    singleProduct: {},

}

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)


    const getProduct = async (url) => {
        dispatch({ type: "SET_LOADING" })
        try {
            const res = await axios.get(url)
            const products = await res.data;

            dispatch({ type: "SET_API_DATA", payload: products })
        } catch (error) {
            dispatch({ type: "API_ERROR" })
        }
    }

    //single product api
    const getSingleProduct = async (url) => {
        dispatch({ type: "SET_SINGEL_LOADING" })
        try {
            const res = await axios.get(url)
            const singleProduct = await res.data;
            dispatch({ type: "SET_SINGEL_PRODUCT", payload: singleProduct })
        } catch (error) {
            dispatch({ type: "SET_SINGEL_ERROR" })
        }
    }

    useEffect(() => {
        getProduct(API)
    }, [])


    return (
        <AppContext.Provider value={{ ...state, getSingleProduct }}>{children}</AppContext.Provider>
    );
};
const useProductContext = () => {
    return useContext(AppContext)
}

export { AppProvider, AppContext, useProductContext };