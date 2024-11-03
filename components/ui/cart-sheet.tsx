import React, { useContext } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "./sheet";
import { Button } from "./button";
import { ShoppingCart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartContext } from "@/store/cartContext";
import ProductCard from "./product-card";

type Props = {
  isSheetOpen: boolean;
  setSheetOpen: (open: boolean) => void;
};

const CartSheet = ({ isSheetOpen, setSheetOpen }: Props): JSX.Element => {
  const {
    cart,
    getCartItemsQuantityHandler,
    removeItemFromCartStore,
    getTotalCartValueHandler,
  } = useContext(CartContext);

  const totalPrice = getTotalCartValueHandler();

  const quantity = getCartItemsQuantityHandler();
  return (
    <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="text-white">
          <div className="relative shadow-2xl lg:flex lg:justify-end">
            <ShoppingCart className="text-black" />
            {quantity > 0 && (
              <span className="absolute -right-4 -top-5 rounded-full bg-red-500 px-2 text-sm/6 text-white shadow-2xl">
                {quantity}
              </span>
            )}
          </div>
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-white">
        <SheetTitle className="text-2xl font-extrabold text-black">
          YOUR CART
        </SheetTitle>
        <div className="z-50 flex w-full flex-col items-start justify-start text-white">
          <ScrollArea className="mt-8 flex h-[650px] max-h-[650px] w-full flex-col rounded-lg bg-[#F2F0F1]">
            {cart
              .flatMap((cartItem) => cartItem.products)
              .map((product) => (
                <ProductCard
                  quantity={product.quantity}
                  key={product.productId}
                  id={product.productId}
                  size={"Cart"}
                  deleteItem={removeItemFromCartStore}
                />
              ))}
          </ScrollArea>
        </div>
        <SheetFooter className="mt-10 flex w-full flex-col items-start justify-start">
          {totalPrice > 0 && (
            <div className="w-full">
              <p className="text-2xl font-extrabold text-black">Total Price:</p>
              <p className="">${totalPrice.toFixed(2)}</p>
            </div>
          )}
          {/* <p className="text-xl font-bold text-black">Total Price:</p>
          <p>${totalPrice}</p> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
