"use client";
import PlusIcon from "assets/images/icons/plus.svg";
import LogoutIcon from "assets/images/icons/logout.svg";
import Link from "next/link";
import { removeToken } from "helpers/utils";
import { useRouter } from "next/navigation";

const MoviesList = ({ movies, currentPage, totalPages, onPageChange }) => {
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
              <div className="flex items-center justify-center">
                <img
                  className="object-cover object-center w-full h-[400px] rounded-xl"
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
                  className="invisible group-hover:visible mt-4 hover:bg-primary-900  px-3 py-2.5 me-2 mb-2"
                >
                  <svg
                    className="h-8 w-8 text-green-500"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
                    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
                    <line x1="16" y1="5" x2="19" y2="8" />
                  </svg>
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
            style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
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
            style={{
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default MoviesList;
