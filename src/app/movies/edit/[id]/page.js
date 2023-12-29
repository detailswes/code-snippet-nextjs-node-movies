"use client";
import MoviesForm from "../../../../components/movies/MoviesForm";
import { useGetMovieByIdQuery } from "../../../../services/movies";

const EditMovie = ({ params }) => {
  console.log(params.id, "id");
  const { data: movie, error, isLoading } = useGetMovieByIdQuery(params.id);

  return (
    <div className="container px-6">
      <div className="h-screen py-32">
        <div className="w-full">
          <h1 className="mb-32">Edit</h1>
          <MoviesForm movie={movie} />
        </div>
      </div>
    </div>
  );
};

export default EditMovie;
