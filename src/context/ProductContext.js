import { createContext, useReducer } from "react";

export const ProductContext = createContext();

export const ProductReducer = (state, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return {
                products: action.payload
            }
        case "CREATE_PRODUCTS":
            console.log("Working");
            console.log(action.payload);
            console.log(...state.products);
            return {
                products: [action.payload, ...state.products]
            }
        default:
            return state;
    }
}

export const ProductContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ProductReducer, {
        products: ""
    })
    console.log(state);
    return (
        <ProductContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
};
