import React, {createContext, useContext, useReducer, useEffect} from 'react';

const CartContext = createContext();

// Função para carregar o carrinho do localStorage
const loadCartFromStorage = () => {
    try {
        const savedCart = localStorage.getItem('shoppingCart');
        return savedCart ? JSON.parse(savedCart) : {items: []};
    } catch (error) {
        console.error('Failed to parse cart data', error);
        return {items: []};
    }
};

// Função para salvar o carrinho no localStorage
const saveCartToStorage = (cart) => {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
};

const cartReducer = (state, action) => {
    let newState;

    switch (action.type) {
        case 'ADD_ITEM':
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                newState = {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? {...item, quantity: item.quantity + action.payload.quantity}
                            : item
                    ),
                };
            } else {
                newState = {
                    ...state,
                    items: [...state.items, action.payload],
                };
            }
            break;

        case 'REMOVE_ITEM':
            newState = {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
            break;

        case 'UPDATE_QUANTITY':
            newState = {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? {...item, quantity: action.payload.quantity}
                        : item
                ),
            };
            break;

        case 'CLEAR_CART':
            newState = {
                ...state,
                items: [],
            };
            break;

        case 'LOAD_CART':
            return action.payload;

        default:
            return state;
    }

    // Salva no localStorage após cada alteração
    saveCartToStorage(newState);
    return newState;
};

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, {items: []});

    // Carrega o carrinho do localStorage quando o componente monta
    useEffect(() => {
        const savedCart = loadCartFromStorage();
        dispatch({type: 'LOAD_CART', payload: savedCart});
    }, []);

    const addToCart = (product, quantity) => {
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                quantity: quantity,
            },
        });
    };

    const removeFromCart = (productId) => {
        dispatch({
            type: 'REMOVE_ITEM',
            payload: productId,
        });
    };

    const updateQuantity = (productId, quantity) => {
        dispatch({
            type: 'UPDATE_QUANTITY',
            payload: {
                id: productId,
                quantity: quantity,
            },
        });
    };

    const clearCart = () => {
        dispatch({
            type: 'CLEAR_CART',
        });
    };

    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                totalItems,
                totalPrice,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};