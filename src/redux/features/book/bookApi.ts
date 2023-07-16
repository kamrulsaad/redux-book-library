import { api } from "@/redux/api/apiSlice";
import { IBook } from "@/types/book";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
    addBook: builder.mutation({
      query: (book: IBook) => ({
        url: "/book",
        method: "POST",
        body: book,
      }),
    }),
  }),
});

export const { useGetBooksQuery, useAddBookMutation } = bookApi;
