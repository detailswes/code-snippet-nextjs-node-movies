import PlusIcon from "../../assets/images/icons/plus.svg";
import LogoutIcon from "../../assets/images/icons/logout.svg";
import Image from "next/image";
import ProductImage from "../../assets/images/product.jpeg";
import Link from "next/link";

const MoviesList = () => {
  return (
    <>
      <div className="py-32">
        <div className="flex justify-between items-center mb-32">
          <div className="flex items-center">
            <h2>My movies</h2>
            <Link href={"/movies/add"}>
              <PlusIcon className="ms-3 mt-2" />
            </Link>
          </div>
          <p className="flex items-center">
            <span className="text-base hidden sm:block font-bold text-white">
              Logout
            </span>{" "}
            <LogoutIcon className="ms-3" />
          </p>
        </div>

        <div className="mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          <div className="group bg-card p-2 rounded-xl cursor-pointer hover:bg-[#1E414E] transition-all">
            <Image
              className="w-full h-auto rounded-xl"
              src={ProductImage}
              alt="product-image"
            />
            <div className="flex justify-between items-start">
              <div className="mt-4 mb-2">
                <h6 className="mb-2 mx-2">Movie 1</h6>
                <p className="mx-2">2021</p>
              </div>
              <button
                type="button"
                class="invisible group-hover:visible mt-4 text-white bg-primary hover:bg-primary-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="group bg-card p-2 rounded-xl cursor-pointer hover:bg-[#1E414E] transition-all">
            <Image
              className="w-full h-auto rounded-xl"
              src={ProductImage}
              alt="product-image"
            />
            <div className="flex justify-between items-start">
              <div className="mt-4 mb-2">
                <h6 className="mb-2 mx-2">Movie 1</h6>
                <p className="mx-2">2021</p>
              </div>
              <button
                type="button"
                class="invisible group-hover:visible mt-4 text-white bg-primary hover:bg-primary-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="group bg-card p-2 rounded-xl cursor-pointer hover:bg-[#1E414E] transition-all">
            <Image
              className="w-full h-auto rounded-xl"
              src={ProductImage}
              alt="product-image"
            />
            <div className="flex justify-between items-start">
              <div className="mt-4 mb-2">
                <h6 className="mb-2 mx-2">Movie 1</h6>
                <p className="mx-2">2021</p>
              </div>
              <button
                type="button"
                class="invisible group-hover:visible mt-4 text-white bg-primary hover:bg-primary-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="group bg-card p-2 rounded-xl cursor-pointer hover:bg-[#1E414E] transition-all">
            <Image
              className="w-full h-auto rounded-xl"
              src={ProductImage}
              alt="product-image"
            />
            <div className="flex justify-between items-start">
              <div className="mt-4 mb-2">
                <h6 className="mb-2 mx-2">Movie 1</h6>
                <p className="mx-2">2021</p>
              </div>
              <button
                type="button"
                class="invisible group-hover:visible mt-4 text-white bg-primary hover:bg-primary-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="group bg-card p-2 rounded-xl cursor-pointer hover:bg-[#1E414E] transition-all">
            <Image
              className="w-full h-auto rounded-xl"
              src={ProductImage}
              alt="product-image"
            />
            <div className="flex justify-between items-start">
              <div className="mt-4 mb-2">
                <h6 className="mb-2 mx-2">Movie 1</h6>
                <p className="mx-2">2021</p>
              </div>
              <button
                type="button"
                class="invisible group-hover:visible mt-4 text-white bg-primary hover:bg-primary-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="group bg-card p-2 rounded-xl cursor-pointer hover:bg-[#1E414E] transition-all">
            <Image
              className="w-full h-auto rounded-xl"
              src={ProductImage}
              alt="product-image"
            />
            <div className="flex justify-between items-start">
              <div className="mt-4 mb-2">
                <h6 className="mb-2 mx-2">Movie 1</h6>
                <p className="mx-2">2021</p>
              </div>
              <button
                type="button"
                class="invisible group-hover:visible mt-4 text-white bg-primary hover:bg-primary-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="group bg-card p-2 rounded-xl cursor-pointer hover:bg-[#1E414E] transition-all">
            <Image
              className="w-full h-auto rounded-xl"
              src={ProductImage}
              alt="product-image"
            />
            <div className="flex justify-between items-start">
              <div className="mt-4 mb-2">
                <h6 className="mb-2 mx-2">Movie 1</h6>
                <p className="mx-2">2021</p>
              </div>
              <button
                type="button"
                class="invisible group-hover:visible mt-4 text-white bg-primary hover:bg-primary-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="group bg-card p-2 rounded-xl cursor-pointer hover:bg-[#1E414E] transition-all">
            <Image
              className="w-full h-auto rounded-xl"
              src={ProductImage}
              alt="product-image"
            />
            <div className="flex justify-between items-start">
              <div className="mt-4 mb-2">
                <h6 className="mb-2 mx-2">Movie 1</h6>
                <p className="mx-2">2021</p>
              </div>
              <button
                type="button"
                class="invisible group-hover:visible mt-4 text-white bg-primary hover:bg-primary-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-32 flex-wrap">
          <button className="pagination-control">Prev</button>
          <button className="pagination-count bg-primary">1</button>
          <button className="pagination-count bg-card">2</button>
          <button className="pagination-control">Next</button>
        </div>
      </div>
    </>
  );
};

export default MoviesList;
