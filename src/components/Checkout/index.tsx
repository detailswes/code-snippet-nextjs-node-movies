"use client";
import Link from "next/link";
import { AppDispatch, RootState } from "../../redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/redux/cartSlice";
import { getTotal, shippingAmount, finalPrice } from "@/helpers/utils";
import Image from "next/image";
const Checkout = () => {
  const { cart } = useSelector((state: RootState) => state.cart);

  const [cartTotal, setCartTotal] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="bg-white max-w-4xl mx-auto p-12">
      <div className="px-4 pt-8">
        <p className="text-xl font-medium text-center">Order Summary</p>

        {cart.length > 0 ? (
          <>
            <p className="text-gray-400">
              Check your items. And select a suitable shipping method.
            </p>
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              {cart.map((product: any) => (
                <div
                  key={product.id}
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                >
                  <Image
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={product.image}
                    alt={product.image}
                    width={100}
                    height={100}
                  />

                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{product.title}</span>
                    <p className="text-lg font-bold">${product.price}</p>
                  </div>
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">Quantity</span>
                    <p className="text-lg font-bold">{product.quantity}</p>
                  </div>
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">Price</span>
                    <p className="text-lg font-bold">${product.updatedPrice}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-lg font-medium">
              Shipping Methods:{" "}
              <span className="font-semibold">Cash on delivery</span>
            </p>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">{getTotal(cart)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">
                  {shippingAmount(cart)}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                {finalPrice(cart)}
              </p>
            </div>

            <Link legacyBehavior passHref href="/confirmed">
              <button
                onClick={() => {
                  dispatch(clearCart());
                }}
                className="mt-4 mb-8 w-full rounded-md bg-indigo-600 hover:bg-indigo-700 px-6 py-3 font-medium text-white"
              >
                Place Order
              </button>
            </Link>
          </>
        ) : (
          <p className="text-gray-400">There are no items in the cart</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
