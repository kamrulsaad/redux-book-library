import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://britania.vercel.app",
  }),
  tagTypes: ["reviews", "wishlist"],
  endpoints: () => ({}),
});
