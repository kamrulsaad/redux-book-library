/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetBooksQuery } from "@/redux/features/book/bookApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IBook } from "@/types/book";
import { BsSearch } from "react-icons/bs";
import { Slider } from "@/components/ui/slider";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setGenre,
  setSearchTerm,
  setYear,
} from "@/redux/features/book/bookSlice";

export default function AllBooks() {
  const dispatch = useAppDispatch();
  const { genre, searchTerm, year } = useAppSelector((state) => state.books);

  const genreFields = ["Fantasy", "Adventure", "Mystery"];

  const { data } = useGetBooksQuery(undefined);

  let booksData;

  if (searchTerm) {
    booksData = data?.data.filter((book: IBook) => {
      return (
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  } else if (genre) {
    booksData = data?.data.filter((book: IBook) => book.genre === genre);
  } else if (year) {
    booksData = data?.data.filter(
      (book: IBook) => book.publication_date.substring(0, 4) === year
    );
  } else {
    booksData = data?.data;
  }

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-xl uppercase">Search</h1>
          <div className="flex w-full mb-4 max-w-sm items-center space-x-2">
            <Input
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              type="email"
              placeholder="Title/Genre/Author"
            />
            <Button className="scale-90" type="submit">
              <BsSearch></BsSearch>
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>Genre</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {genreFields.map((genre: string) => (
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => dispatch(setGenre(genre))}
                >
                  {genre}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="space-y-3 ">
            <h1 className="text-2xl uppercase">publication year</h1>
            <div className="max-w-xl">
              <Slider
                defaultValue={[2021]}
                max={2023}
                min={1900}
                step={1}
                onValueChange={(value) => dispatch(setYear(value.toString()))}
              />
            </div>
            {year && (
              <div>
                Year: {year}{" "}
                <span
                  className="cursor-pointer text-red-500"
                  onClick={() => dispatch(setYear(""))}
                >
                  x
                </span>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-9">
        {genre && (
          <p>
            Genre: {genre}{" "}
            <span
              className="cursor-pointer text-red-500"
              onClick={() => dispatch(setGenre(""))}
            >
              x
            </span>
          </p>
        )}
        <div className="grid grid-cols-2 gap-10 pb-20">
          {booksData?.map((book: IBook) => (
            <BookCard book={book} />
          ))}
          {!booksData.length && `No Results found for ${searchTerm || year}`}
        </div>
      </div>
    </div>
  );
}
