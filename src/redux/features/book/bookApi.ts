import { api } from "@/redux/api/apiSlice";
import { IBook } from "@/types/book";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
    getSingleBook: builder.query({
      query: (id: string) => `/book/${id}`,
    }),
    addBook: builder.mutation({
      query: (book: IBook) => ({
        url: "/book",
        method: "POST",
        body: book,
      }),
    }),
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/book/${id}`,
        method: "DELETE",
      })
    }),
    getReview: builder.query({
      query: (id: string) => `/review/${id}`,
      providesTags: ["reviews"],
    }),
    postReview: builder.mutation({
      query: ({ id, data }: { id: string; data: object }) => ({
        url: `/review/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useGetSingleBookQuery,
  useGetReviewQuery,
  usePostReviewMutation,
  useDeleteBookMutation
} = bookApi;
