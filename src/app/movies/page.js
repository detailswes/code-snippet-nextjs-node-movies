"use client";
import React from "react";
import MoviesList from "../../components/movies/MoviesList";
import EmptyList from "../../components/movies/EmptyList";
import { useGetMoviesQuery } from "../../services/movies";
import Loader from "../../common/Loader";

const MyMovies = () => {
  const { data: movies, error, isLoading } = useGetMoviesQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container px-6">
          {movies?.data?.length === 0 ? (
            <EmptyList />
          ) : (
            <MoviesList movies={movies?.data} isLoading={isLoading} />
          )}
        </div>
      )}
    </>
  );
};

export default MyMovies;
