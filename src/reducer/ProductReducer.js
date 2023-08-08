const ProductReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                isLoading: true,
            }
        case "SET_API_DATA":
            const featureData = action.payload.filter((cueElm) => {
                return cueElm.featured === true;
            });
            return {
                ...state,
                isLoading: false,
                products: action.payload,
                featureProducts: featureData
            }
        case "API_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case "SET_SINGEL_LOADING":
            return {
                ...state,
                isSingleLoading: true,
            }
        case "SET_SINGEL_PRODUCT":
            return {
                ...state,
                isSingleLoading: false,
                singleProduct: action.payload
            }
        case "SET_SINGEL_ERROR":
            return {
                ...state,
                isSingleLoading: false,
                isError: true
            }
        default:
            return state
    }

};

export default ProductReducer