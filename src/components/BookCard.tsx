/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { IBook } from "@/types/book";
import { AiOutlineHeart } from "react-icons/ai";
import { format } from "date-fns";
import { useAddToWishListMutation } from "@/redux/features/wishlist/wishlistApi";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "./ui/use-toast";
import { useEffect } from "react";

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  const { user } = useAppSelector((state) => state.user);

  const [addToWishList, { isSuccess, isLoading, error, isError }] =
    useAddToWishListMutation();

  const handleClick = async () => {
    if (!user.email)
      return toast({
        description: "You must be logged in",
        variant: "destructive",
      });

    await addToWishList({ email: user.email, book });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        description: "Added to your wishlist",
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
        <Button
          onClick={handleClick}
          className="absolute bottom-[20px] right-[20px]"
          variant="outline"
        >
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              {" "}
              Add to WishList <AiOutlineHeart className="ml-2 text-red-500" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
