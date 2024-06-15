import { createContext, useReducer, useEffect } from "react";

export const SellerAuthContext = createContext();

export const SellerauthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { seller: action.payload };
        case "LOGOUT":
            return { seller: null };
        default:
            return state;
    }
};

export const SellerAuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SellerauthReducer, {
        seller: null,
    });

    useEffect(() => {
        const seller = JSON.parse(localStorage.getItem('seller'));
        if (seller) {
            dispatch({ type: "LOGIN", payload: seller });
        }
    }, []);

    console.log('AuthContext State:', state);
    
    return (
        <SellerAuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </SellerAuthContext.Provider>
    );
};
