import { createContext, ReactNode, useContext, useState } from "react";

type shoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContext = {
    getItemQuantity: (id: number) => number,
    increaseCartQuantity: (id: number) => void,
    decreaseCartQuantity: (id: number) => void,
    removeFromCart: (id: number) => void,
    clearCart: () => void,
}


export interface shoppingCartItem {
    itemID: number,
    itemQuantity: number,
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: shoppingCartProviderProps) {
    const [cartItems, setCartItems] = useState<shoppingCartItem[]>([]);

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.itemID === id)?.itemQuantity || 0
    }

    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.itemID === id) == null) {
                return [...currItems, { itemID: id, itemQuantity: 1}]
            } else {
                return currItems.map(item => {
                    if (item.itemID === id) {
                        return { ... item, itemQuantity: item.itemQuantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.itemID === id)?.itemQuantity == 1) {
                return currItems.filter(item => item.itemID !== id)
            } else {
                return currItems.map(item => {
                    if (item.itemID === id) {
                        return { ... item, itemQuantity: item.itemQuantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.itemID !== id)
        })
    }

    function clearCart() {
        setCartItems([])
    }
    
    <ShoppingCartContext.Provider value={{getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, clearCart}}>
        { children }
    </ShoppingCartContext.Provider>
}