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
      // Modify the query to accept page and pageSize parameters
      query: ({ page = 1, pageSize = 10 } = {}) => {
        return `movies?page=${page}&pageSize=${pageSize}`;
      },
    }),
    getMovieById: builder.query({
      query: (id) => `movies/${id}`,
    }),
    addMovie: builder.mutation({
      query: (formData) => {
        console.log("FormData:", formData);
        return {
          url: "movies",
          method: "POST",
          body: formData,
        };
      },
      providesTags: (result) => result,
    }),
    updateMovie: builder.mutation({
      query: ({ id, formData }) => {
        console.log("ID:", id);
        console.log("FormData:", formData);

        return {
          url: `movies/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      providesTags: (result) => result,
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
