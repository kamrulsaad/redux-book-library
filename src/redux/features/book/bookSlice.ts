import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IBookState {
  searchTerm: string;
  year: string;
  genre: string;
}

const initialState: IBookState = {
  searchTerm: "",
  year: "",
  genre: "",
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setYear: (state, action: PayloadAction<string>) => {
      state.year = action.payload;
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
  },
});

export const { setGenre, setSearchTerm, setYear } = bookSlice.actions;

export default bookSlice.reducer;
