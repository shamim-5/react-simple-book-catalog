import { apiSlice } from "@/redux/api/apiSlice";
// import { setSearchTerm } from "../helper/helperSlice";

export const booksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ field, searchTerm }) => (searchTerm && field ? `/books?${field}_like=${searchTerm}` : `/books`),
      // keepUnusedDataFor: 600,
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   const result = await queryFulfilled;

      //   try {
      //     if (result) {
      //       console.log(arg, result);
      //       dispatch(setSearchTerm({ field: arg.field, searchTerm: arg.searchTerm }));
      //     }
      //   } catch (err) {
      //     // do nothing
      //   }
      // },
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
