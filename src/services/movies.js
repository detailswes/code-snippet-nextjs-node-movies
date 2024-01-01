// moviesApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "helpers/utils";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["movies"],

  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ page = 1, pageSize = 10 } = {}) => {
        return `movies?page=${page}&pageSize=${pageSize}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result?.data?.map(({ id }) => ({ type: "movies", id })),
              { type: "movies", id: "MOVIES" },
            ]
          : [{ type: "movies", id: "MOVIES" }],
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
      invalidatesTags: [{ type: "movies", id: "MOVIES" }],
    }),
    updateMovie: builder.mutation({
      query: ({ id, formData }) => {
        return {
          url: `movies/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      providesTags: (result) => result,
      invalidatesTags: [{ type: "movies", id: "MOVIES" }],
    }),

    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `movies/${id}`,
        method: "DELETE",
      }),
      providesTags: (result) => result,
      invalidatesTags: [{ type: "movies", id: "MOVIES" }],
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
