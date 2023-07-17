import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  useAddToReadingMutation,
  useGetWishListQuery,
} from "@/redux/features/wishlist/wishlistApi";
import { useAppSelector } from "@/redux/hooks";
import { IBook } from "@/types/book";
import { format } from "date-fns";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const WishList = () => {
  const { user } = useAppSelector((state) => state.user);

  const { data } = useGetWishListQuery(user?.email, {
    refetchOnMountOrArgChange: true,
  });

  const [addToReading, { isSuccess, isError, error }] =
    useAddToReadingMutation();

  const handleClick = async (book: IBook) => {
    if (!user.email)
      return toast({
        description: "You must be logged in",
        variant: "destructive",
      });

    await addToReading({ email: user.email, book });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        description: "Added to your Reading",
      });
    }

    if (isError) {
      toast({
        variant: "destructive",
        description: "Something is wrong",
      });
      console.log(error);
    }
  }, [isSuccess, isError, error]);

  return (
    <div className="grid grid-cols-3 px-20 gap-4">
      {!data?.data?.wishlist.length && <p>Your Wishlist is currently empty</p>}
      {data?.data?.wishlist?.map((book: IBook) => {
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
                onClick={() => handleClick(book)}
                className="absolute bottom-[20px] right-[20px]"
                variant="outline"
              >
                Add to Reading
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WishList;
