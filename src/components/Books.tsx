import { useGetBooksQuery } from "@/redux/features/book/bookApi";
import { IBook } from "@/types/book";
import BookCard from "./BookCard";
import { VscLoading } from "react-icons/vsc";

const Books = () => {
  const { data, isLoading } = useGetBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading)
    return (
      <div className="min-h-[calc(100vh-150px)] flex justify-center items-center">
        <VscLoading className="text-7xl animate-spin"></VscLoading>
      </div>
    );

  return (
    <div className="px-20 grid grid-cols-3 gap-x-20 gap-y-5 mb-4">
      {data?.data.map((book: IBook) => (
        <BookCard book={book} key={book?._id} />
      ))}
    </div>
  );
};

export default Books;
