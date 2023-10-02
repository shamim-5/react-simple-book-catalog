import { apiSlice } from "@/redux/api/apiSlice";

export const booksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ field, searchTerm }) =>
        searchTerm && field ? `/books?field=${field}&searchTerm=${searchTerm}` : `/books`,

      providesTags: ["Books"],
    }),
    getBooksById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["Books"],
    }),
    addNewBook: builder.mutation({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    editBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBooksByIdQuery,
  useAddNewBookMutation,
  useDeleteBookMutation,
  useEditBookMutation,
} = booksApi;
