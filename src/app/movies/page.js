"use client";
import React, { useState } from "react";
import MoviesList from "../../components/MoviesList";
import EmptyList from "../../components/EmptyList";
import { useGetMoviesQuery } from "../../services/movies";
import Loader from "../../common/Loader";

const MyMovies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const {
    data: moviesData,
    error,
    isLoading,
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
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container px-6">
          {movies.length === 0 ? (
            <EmptyList />
          ) : (
            <>
              <MoviesList
                movies={movies}
                isLoading={isLoading}
                currentPage={currentPage}
                totalPages={totalPages}
                totalCount={totalCount}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MyMovies;
