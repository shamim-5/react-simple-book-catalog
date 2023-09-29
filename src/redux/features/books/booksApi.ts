import { apiSlice } from "@/redux/api/apiSlice";
import { setSearchTerm } from "../helper/helperSlice";

export const booksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (searchTerm) => (searchTerm ? `/books?genre_like=${searchTerm}` : `/books`),
      // keepUnusedDataFor: 600,
      async onQueryStarted(searchTerm, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;

        try {
          if (result) {
            // console.log(searchTerm, result);
            dispatch(setSearchTerm({ searchTerm }));
          }
        } catch (err) {
          // do nothing
        }
      },
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
