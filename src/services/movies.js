// moviesApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../helpers/utils";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => "movies",
    }),
    getMovieById: builder.query({
      query: (id) => `movies/${id}`,
    }),
    addMovie: builder.mutation({
      query: (formData) => {
        return {
          url: "movies",
          method: "POST",
          body: formData,
        };
      },
      providesTags: (result) => result,
    }),
    updateMovie: builder.mutation({
      query: ({ id, updatedMovie }) => ({
        url: `movies/${id}`,
        method: "PUT",
        body: updatedMovie,
      }),
    }),
    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `movies/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieByIdQuery,
  useAddMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} = moviesApi;
