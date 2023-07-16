/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import BookCard from "@/components/BookCard";
import BookReview from "@/components/BookReview";
import { Button } from "@/components/ui/button";
import { useGetSingleBookQuery } from "@/redux/features/book/bookApi";
import { VscLoading } from "react-icons/vsc";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSingleBookQuery(id as string);

  if (isLoading)
    return (
      <div className="min-h-[calc(100vh-150px)] flex justify-center items-center">
        <VscLoading className="text-7xl animate-spin"></VscLoading>
      </div>
    );

  return (
    <div className="min-h-[calc(100vh-150px)] flex gap-x-4 items-center justify-center">
      <div>
        <BookCard book={data?.data} />
        <div className="flex gap-4 mt-2 justify-center">
          <Button>Edit Book</Button>
          <Button variant={"destructive"}>Delete Book</Button>
        </div>
      </div>
      <BookReview id={id} />
    </div>
  );
};

export default BookDetails;
