"use client";
import React, { useState } from "react";
import MoviesList from "components/MoviesList";
import EmptyList from "components/EmptyList";
import { useGetMoviesQuery } from "services/movies";
import Loader from "common/Loader";
import Error from "common/error";

const Movies = () => {
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: moviesData,
    isLoading,
    error,
  } = useGetMoviesQuery({
    page: currentPage,
    pageSize: pageSize,
  });
  const movies = moviesData?.data || [];
  const totalCount = moviesData?.totalCount || 0;

  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {error && <Error />}
      {!error && (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="container px-6">
              {movies.length === 0 ? (
                <EmptyList />
              ) : (
                <MoviesList
                  movies={movies}
                  isLoading={isLoading}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalCount={totalCount}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Movies;
