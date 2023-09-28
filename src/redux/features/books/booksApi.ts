import { apiSlice } from "@/redux/api/apiSlice";

export const booksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      // keepUnusedDataFor: 600,
      providesTags: ["Books"],
    }),
    getBooksById: builder.query({
      query: (id) => `/books/${id}`,
    }),
    addNewBook: builder.mutation({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const { useGetBooksQuery, useGetBooksByIdQuery, useAddNewBookMutation } = booksApi;
