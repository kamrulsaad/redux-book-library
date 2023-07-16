/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import BookCard from "@/components/BookCard";
import BookReview from "@/components/BookReview";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from "@/redux/features/book/bookApi";
import { useAppSelector } from "@/redux/hooks";
import { ToastAction } from "@radix-ui/react-toast";
import { useEffect } from "react";
import { VscLoading } from "react-icons/vsc";
import { Link, useNavigate, useParams } from "react-router-dom";

const BookDetails = () => {
  const { user } = useAppSelector((state: { user: any }) => state.user);

  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data, isLoading } = useGetSingleBookQuery(id as string);

  const [deleteBook, { isSuccess }] = useDeleteBookMutation();

  const handleDelete = () => {
    if (!user?.email) {
      toast({
        variant: "destructive",
        description: "You must be logged in",
      });
    }
    deleteBook(id as string);
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        description: "Deleted Successfully",
      });
      navigate("/");
    }
  }, [toast, isSuccess, navigate]);

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
          <Button>
            <Link to={"/edit-book"}>Edit Book</Link>
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              toast({
                variant: "destructive",
                title: "Are you sure?",
                description: "This cannot be undone",
                action: (
                  <ToastAction onClick={() => handleDelete()} altText="Confirm">
                    Confirm
                  </ToastAction>
                ),
              });
            }}
          >
            Delete
          </Button>
        </div>
      </div>
      <BookReview id={id} />
    </div>
  );
};

export default BookDetails;
