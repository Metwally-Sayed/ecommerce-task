"use client";

import { getProducts } from "@/lib/apis";
import { ICartObject, IProduct } from "@/lib/types";
import { createContext, useEffect, useState } from "react";

interface CartContextType {
  cart: ICartObject[];
  addToCartStore: (
    item: ICartObject,
    productId: IProduct["id"],
    quantity?: number,
  ) => void;
  removeItemFromCartStore: (productId: IProduct["id"]) => void;
  clearCartStore: () => void;
  getCartItemsQuantityHandler: () => number;
  getTotalCartValueHandler: () => number;
}

export const CartContext = createContext<CartContextType>(
  {} as CartContextType,
);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [cart, setCart] = useState<ICartObject[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]); // State for products
  const [mounted, setMounted] = useState(false);


  // I KNOW ITS NOT THE BEST PRACTICE BUT IT MOUNT ONLY ONCE
  useEffect(() => {
    if (mounted) {
      const fetchProducts = async () => {
        try {
          const productData = await getProducts();
          setProducts(productData);
          setMounted(false);
        } catch (error) {
          console.log(error);
        }
      };
      fetchProducts();
    }
    setMounted(true);
  }, [mounted]);

  // THIS FUNCTION CAN BE USED TO ADD PRODUCT TO THE CART OR INCREASE THE QUANTITY IF THE PRODUCT IS ALREADY IN THE CART
  const addToCartHandler = (
    item: ICartObject,
    productId: IProduct["id"],
    quantity?: number,
  ): void => {
    // Check if the cart already contains the product
    const existingCartItemIndex = cart.findIndex((cartItem) =>
      cartItem.products.some((product) => product.productId === productId),
    );

    if (existingCartItemIndex !== -1) {
      // If it exists, update the quantity of the existing product
      const updatedCart = [...cart];
      const existingCartItem = updatedCart[existingCartItemIndex];

      const updatedProducts = existingCartItem.products.map((product) => {
        if (product.productId === productId) {
          if (quantity !== undefined) {
            return { ...product, quantity: product.quantity + quantity }; // Increment quantity
          }
          return { ...product, quantity: product.quantity + 1 }; // Increment quantity
        }
        return product; // Return unchanged product
      });

      // Replace the updated products array in the existing cart item
      updatedCart[existingCartItemIndex] = {
        ...existingCartItem,
        products: updatedProducts,
      };

      setCart(updatedCart);
    } else {
      // If it doesn't exist, create a new cart item with just the new product
      const newProduct = { productId, quantity: quantity ? quantity : 1 };
      const newCartItem = {
        userId: item.userId, // Assuming userId is a part of ICartObject
        date: item.date, // Assuming date is a part of ICartObject
        products: [newProduct], // Only include the new product
      };
      setCart([...cart, newCartItem]);
    }
  };

  // THIS FUNCTION CAN REMOVE PRODUCT FROM THE CART
  const removeFromCartHandler = (productId: IProduct["id"]): void => {
    setCart(
      cart.map((cartItem) => ({
        ...cartItem,
        products: cartItem.products.filter(
          (product) => product.productId !== productId,
        ),
      })),
    );
  };

  // THIS FUNCTION CAN CLEAR THE CART
  const clearCartHandler = (): void => {
    setCart([]);
  };

  // Function to get total quantity of items in the cart
  const getCartItemsQuantityHandler = (): number => {
    let quantity = 0;
    cart.forEach((cartItem) => {
      cartItem.products.forEach((product) => {
        quantity += product.quantity;
      });
    });
    return quantity;
  };

  // Function to get the total sum of items in the cart
  const getTotalCartValueHandler = (): number => {
    return cart.reduce((total, cartItem) => {
      const itemTotal = cartItem.products.reduce((subtotal, product) => {
        const productDetails = products.find(
          (prod) => prod.id === product.productId,
        );
        const productPrice = productDetails ? productDetails.price : 0;
        return subtotal + productPrice * product.quantity;
      }, 0);
      return total + itemTotal;
    }, 0);
  };

  const value = {
    cart,
    addToCartStore: addToCartHandler,
    removeItemFromCartStore: removeFromCartHandler,
    clearCartStore: clearCartHandler,
    getCartItemsQuantityHandler,
    getTotalCartValueHandler,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
