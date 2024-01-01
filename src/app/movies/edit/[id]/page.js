"use client";
import MoviesForm from "components/MoviesForm";
import { useGetMovieByIdQuery } from "services/movies";
import Loader from "common/Loader";

const EditMovie = ({ params }) => {
  const id = params.id;
  const { data: movie, isLoading, error } = useGetMovieByIdQuery(id);
  const editPage = true;

  return (
    <>
      {error && error}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container px-6">
          <div className="py-32">
            <div className="w-full">
              <h1 className="mb-32">Edit</h1>
              <MoviesForm movie={movie} editPage={editPage} id={id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditMovie;
