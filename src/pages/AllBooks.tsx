/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useGetBooksQuery } from "@/redux/features/book/bookApi";
import { IBook } from "@/types/book";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";

export default function AllBooks() {
  const [searchTerm, setSearchTerm] = useState<string>("");

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
  } else {
    booksData = data?.data;
  }

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-xl uppercase">Search</h1>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              onChange={(e) => setSearchTerm(e.target.value)}
              type="email"
              placeholder="Title/Genre/Author"
            />
            <Button className="scale-90" type="submit">
              <BsSearch></BsSearch>
            </Button>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <Switch id="in-stock" />
            <Label htmlFor="in-stock">In stock</Label>
          </div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Price Range</h1>

          <div>From 0$ To 150$</div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-2 gap-10 pb-20">
        {booksData?.map((book: IBook) => (
          <BookCard book={book} />
        ))}
      </div>
    </div>
  );
}
