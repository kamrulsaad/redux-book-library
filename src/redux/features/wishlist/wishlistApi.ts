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
      providesTags: ["wishlist"],
    }),
    completeReading: builder.mutation({
      query: ({ email, book }: { email: string; book: IBook }) => ({
        url: `/complete/${email}`,
        method: "PATCH",
        body: book,
      }),
      invalidatesTags: ["wishlist"],
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
