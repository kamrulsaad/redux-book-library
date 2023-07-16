/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from "@/redux/api/apiSlice";
import { IBook } from "@/types/book";

const wishListApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addToWishList: builder.mutation({
      query: ({ email, book }: { email: string; book: IBook }) => ({
        url: `/wishlist/${email}`,
        method: "POST",
        body: book,
      }),
    }),
    getWishList: builder.query({
      query: (email) => `/wishlist/${email}`,
    }),
    addToReading: builder.mutation({
      query: ({ email, book }: { email: string; book: IBook }) => ({
        url: `/reading/${email}`,
        method: "POST",
        body: book,
      }),
    }),
    getReading: builder.query({
      query: (email) => `/reading/${email}`,
    }),
    completeReading: builder.mutation({
      query: ({ email, bookId }: { email: string; bookId: string }) => ({
        url: `/complete/${email}`,
        method: "PATCH",
        body: bookId,
      }),
    }),
  }),
});

export const {
  useAddToWishListMutation,
  useGetWishListQuery,
  useAddToReadingMutation,
  useGetReadingQuery,
  useCompleteReadingMutation,
} = wishListApi;
