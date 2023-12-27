import { useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { useSelector } from "react-redux";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Cart from "@/components/Cart";
import Link from "next/link";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { usePathname } from "next/navigation";
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const pathName = usePathname();
  const toggleSideBar = () => setOpenCart((open) => !open);

  const { cart } = useSelector((state: RootState) => state.cart);

  return (
    <>
      <header className="bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between py-6 px-6 xl:px-0"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link legacyBehavior passHref href="/">
              <a className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <Image
                  className="w-16"
                  src="/icons/logo.jpeg"
                  alt="Logo"
                  width={100}
                  height={100}
                />{" "}
              </a>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Link legacyBehavior passHref href="/">
              <span
                className={`text-sm font-semibold leading-6 cursor-pointer ${
                  pathName === "/"
                    ? "text-indigo-600 border-b-2"
                    : "text-gray-900"
                }`}
              >
                Home
              </span>
            </Link>

            <Link legacyBehavior passHref href="/about-us">
              <span
                className={`text-sm font-semibold leading-6 cursor-pointer  ${
                  pathName === "/about-us"
                    ? "text-indigo-600 border-b-2"
                    : "text-gray-900"
                }`}
              >
                About
              </span>
            </Link>
          </Popover.Group>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end relative">
            <div className="absolute bg-indigo-600 hover:bg-indigo-700 w-5 h-5 flex items-center justify-center rounded-full right-[-10px] top-[-10px]">
              <p className="text-xs text-white">
                {cart.length > 0 ? cart.length : 0}
              </p>
            </div>
            <div
              onClick={toggleSideBar}
              className="cursor-pointer text-sm font-semibold leading-6 text-gray-900"
            >
              <Image
                src="/icons/cart-icon.svg"
                alt="cart"
                width={32}
                height={32}
              />
            </div>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <Image
                  className="w-18"
                  src="/icons/logo.jpeg"
                  alt="Logo"
                  width={100}
                  height={100}
                />{" "}
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link legacyBehavior passHref href="/">
                    <span
                      onClick={() => setMobileMenuOpen(false)}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 cursor-pointer ${
                        pathName === "/"
                          ? "text-indigo-600 border-b-2"
                          : "text-gray-900"
                      }`}
                    >
                      Home
                    </span>
                  </Link>

                  <Link legacyBehavior passHref href="/about-us">
                    <span
                      onClick={() => setMobileMenuOpen(false)}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 cursor-pointer ${
                        pathName === "/about-us"
                          ? "text-indigo-600 border-b-2"
                          : "text-gray-900"
                      }`}
                    >
                      About
                    </span>
                  </Link>
                </div>
                <div className="py-6  lg:flex lg:flex-1 lg:justify-end relative">
                  <div className="absolute bg-indigo-600 hover:bg-indigo-700 w-5 h-5 flex items-center justify-center rounded-full left-[10px] top-3">
                    <p className="text-xs text-white">
                      {cart.length > 0 ? cart.length : 0}
                    </p>
                  </div>
                  <div
                    onClick={toggleSideBar}
                    className="cursor-pointer text-sm font-semibold leading-6 text-gray-900"
                  >
                    <Image
                      src="/icons/cart-icon.svg"
                      alt="cart"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <Cart isOpen={openCart} onClose={toggleSideBar} />
    </>
  );
}
