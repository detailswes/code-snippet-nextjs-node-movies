"use client";
import PlusIcon from ".././assets/images/icons/plus.svg";
import LogoutIcon from ".././assets/images/icons/logout.svg";
import Link from "next/link";
import { removeToken } from "../helpers/utils";
import { useRouter } from "next/navigation";

const MoviesList = ({
  movies,
  isLoading,
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
}) => {
  const router = useRouter();
  const handleLogout = () => {
    removeToken();
    router.push("/sign-in");
  };
  const handleEdit = (id) => {
    router.push(`movies/edit/${id}`);
  };

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
          <button onClick={handleLogout} className="flex items-center">
            <span className="text-base hidden sm:block font-bold text-white">
              Logout
            </span>{" "}
            <LogoutIcon className="ms-3" />
          </button>
        </div>
        <div className="mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="group bg-card p-2 rounded-xl cursor-pointer hover:bg-[#1E414E] transition-all"
            >
              <div className="h-[263px]">
                <img
                  className="object-cover object-center w-full h-full rounded-xl"
                  src={movie.poster}
                  alt="product-image"
                />
              </div>
              <div className="flex justify-between items-start">
                <div className="mt-4 mb-2">
                  <h6 className="mb-2 mx-2">{movie.title}</h6>
                  <p className="mx-2">{movie.publishingYear}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleEdit(movie._id)}
                  className="invisible group-hover:visible mt-4 text-white bg-primary hover:bg-primary-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-32 flex-wrap">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className={`pagination-control ${
              currentPage === 1 ? "disabled" : ""
            }`}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => onPageChange(page + 1)}
              className={`pagination-count ${
                currentPage === page + 1 ? "bg-primary" : "bg-card"
              }`}
            >
              {page + 1}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            className={`pagination-control ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default MoviesList;
