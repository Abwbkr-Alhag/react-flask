import { createContext, ReactNode, useContext, useState } from "react";

type shoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContextType = {
    isOpen: boolean,
    cartItems: shoppingCartItem[],
    cartQuantity: number,
    toggleCart: () => void,
    getTotalPrice: () => number,
    getItemQuantity: (id: number, size: number) => number,
    increaseCartQuantity: (id: number, name: string, price: number, numberAdded: number, maxQuantity: number, metal: string, category: string, size: number, cover: string) => void,
    decreaseCartQuantity: (id: number, size: number) => void,
    removeFromCart: (id: number, size: number) => void,
    clearCart: () => void,
}


export interface shoppingCartItem {
    itemID: number,
    name: string,
    price: number,
    category: string,
    metal: string,
    itemQuantity: number,
    maxQuantity: number,
    size: number,
    cover: string,
}

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export default function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export const ShoppingCartProvider:React.FC<shoppingCartProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<shoppingCartItem[]>([]);

    const cartQuantity = cartItems.reduce((totalQuantity, item) => totalQuantity + item.itemQuantity, 0)
    
    // Compares two shopping cart items and returns true if they are the same (have the same id and size)
    function compareItems(first: shoppingCartItem, secondID: number, secondSize: number) {
        return first.itemID === secondID && first.size === secondSize;
    }

    function toggleCart() {
        setIsOpen(prev => !prev)
    }
    
    function getTotalPrice() {
        return cartItems.reduce((accumulator, currentItem) => accumulator + currentItem.itemQuantity * currentItem.price, 0)
    }

    function getItemQuantity(id: number, size: number) {
        return cartItems.find(item => compareItems(item, id, size))?.itemQuantity || 0
    }

    function increaseCartQuantity(id: number, name: string, price: number, numberAdded: number, maxQuantity: number, metal: string, category: string, size: number, cover: string) {
        setCartItems(currItems => {
            if (currItems.find(item => compareItems(item, id, size)) == null) {
                return [...currItems, { itemID: id, name: name, price: price, itemQuantity: Math.min(numberAdded, maxQuantity), maxQuantity: maxQuantity, metal: metal, cateogry: category, size: size, cover: cover } as unknown as shoppingCartItem]
            } else {
                return currItems.map(item => {
                    if (compareItems(item, id, size)) {
                        return { ...item, itemQuantity: Math.min(item.itemQuantity + numberAdded, item.maxQuantity)}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: number, size: number) {
        setCartItems(currItems => {
            if (currItems.find(item => compareItems(item, id, size))?.itemQuantity === 1) {
                return currItems.filter(item => !(compareItems(item, id, size)))
            } else {
                return currItems.map(item => {
                    if (compareItems(item, id, size)) {
                        return { ...item, itemQuantity: item.itemQuantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id: number, size: number) {
        setCartItems(currItems => {
            return currItems.filter(item => !(compareItems(item, id, size)))
        })
    }

    function clearCart() {
        setCartItems([])
    }
    return (
        <ShoppingCartContext.Provider value={{isOpen, cartItems, cartQuantity, toggleCart, getTotalPrice, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, clearCart}}>
            { children }
        </ShoppingCartContext.Provider>
    )
}
