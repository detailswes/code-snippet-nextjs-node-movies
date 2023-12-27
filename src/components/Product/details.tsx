"use client";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Cart from "@/components/Cart";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addToCart } from "@/redux/cartSlice";
import Image from "next/image";
import { formatPrice } from "@/helpers/utils";
interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { href: string; rate: number; count: number };
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function ProductDetail(data: { data: Product }) {
  let product = data.data;

  const [openCart, setOpenCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.cart);
  const toggleSideBar = () => setOpenCart((open) => !open);
  const handleAddToCart = async (cartItems: any) => {
    dispatch(
      addToCart({
        ...cartItems,
        addedToCart: true,
        quantity: 1,
        updatedPrice: cartItems.price,
      })
    );
    setOpenCart(true);
    setCartCount(cart.length);
  };
  return (
    <>
      <div>
        <div className="py-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8 bg-white pt-10"
            >
              <li>
                <div className="flex items-center">
                  <Link
                    href="/"
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    Home
                  </Link>
                  <Image
                    src="/icons/breadcrumbslash.svg"
                    alt="My SVG"
                    width={16}
                    height={20}
                  />
                </div>
              </li>
              <li className="text-sm">
                <a
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.title}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto py-6 max-w-2xl p-4 sm:px-6 lg:grid lg:max-w-7xl bg-white lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg lg:block">
              <Image
                src={product.image}
                alt={product.image}
                className="h-full w-full object-cover object-center"
                width={500}
                height={500}
              />
            </div>
            <div className="lg:col-span-2 lg:border-l lg:border-gray-200 lg:pl-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
              <div className="mt-6">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              </div>
              <div className="mt-4 lg:row-span-3 lg:mt-6">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {formatPrice(product.price)}
                </p>

                {/* Reviews */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            product.rating.rate > rating
                              ? "text-gray-900"
                              : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">
                      {product.rating.rate} out of 5 stars
                    </p>
                    <a
                      href={product.rating.href}
                      className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      {product.rating.count} reviews
                    </a>
                  </div>
                </div>

                <form className="mt-10">
                  {/* Colors */}
                  <div
                    onClick={() => handleAddToCart(product)}
                    className="cursor-pointer mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to cart
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Cart isOpen={openCart} onClose={toggleSideBar} />
    </>
  );
}
