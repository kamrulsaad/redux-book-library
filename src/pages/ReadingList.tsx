/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  useCompleteReadingMutation,
  useGetReadingQuery,
} from "@/redux/features/wishlist/wishlistApi";
import { useAppSelector } from "@/redux/hooks";
import { IBook } from "@/types/book";
import { format } from "date-fns";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Reading = () => {
  const { user } = useAppSelector((state) => state.user);

  const { data } = useGetReadingQuery(user?.email);

  const [addToReading, { isSuccess, isError, error }] =
    useCompleteReadingMutation();

  const handleClick = async (bookId: string) => {
    if (!user.email)
      return toast({
        description: "You must be logged in",
        variant: "destructive",
      });

    await addToReading({ email: user.email, bookId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        description: "Succesfully read book",
      });
    }

    if (isError) {
      toast({
        variant: "destructive",
        description: error?.data?.message,
      });
    }
  }, [isSuccess, isError, error]);

  return (
    <div className="grid grid-cols-3 px-20 gap-4">
      {data?.data?.reading?.map((book: IBook) => (
        <div className="rounded-2xl relative flex items-start p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-4">
          <div>
            <Link to={`/book/${book._id!}`}>
              <img
                className="max-w-sm max-h-[250px]"
                src={book?.image}
                alt="book"
              />
            </Link>
          </div>
          <div className="pt-4">
            <h2 className="text-xl mb-4 font-semibold">{book?.title}</h2>
            <p>Author: {book.author} </p>
            <p className="text-sm">Genre: {book.genre} </p>
            <p className="text-sm">
              Published: {format(new Date(book.publication_date!), "PPP")}
            </p>
            <p className="text-sm">
              Completed: {book.completed! ? "YES" : "NO"}
            </p>

            {!book?.completed && (
              <Button
                onClick={() => handleClick(book?._id)}
                className="absolute bottom-[20px] right-[20px]"
                variant="outline"
              >
                Finish Reading
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reading;
