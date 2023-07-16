/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "@/redux/features/book/bookApi";
import { IBook } from "@/types/book";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {
  const { id } = useParams();

  const navigate = useNavigate()

  const { data: bookData, isSuccess: bookSuccess } = useGetSingleBookQuery(
    id as string
  );

  React.useEffect(() => {
    if (bookSuccess) {
      setDate(new Date(bookData.data.publication_date));
    }
  }, [bookSuccess, bookData]);

  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const { toast } = useToast();

  const [updateBook, { isLoading, isSuccess, isError, error }] =
    useUpdateBookMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const genre = formData.get("genre") as string;
    const image = formData.get("image") as string;
    const publication_date = date;

    const data: IBook = {
      title,
      author,
      genre,
      image,
      publication_date,
    };

    await updateBook({ id: id!, book: data });
  };

  React.useEffect(() => {
    if (isSuccess) {
      toast({
        description: "Book updated Successfully",
      });
      navigate('/')
    }
  }, [isSuccess, toast, navigate]);

  React.useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        description: "Something is wrong!"
      });
    }
  }, [isError, toast, error]);

  return (
    <div className="min-h-[calc(100vh-150px)] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-1/4">
        <h1 className="text-center mb-4 text-3xl font-bold">Update Book</h1>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label>Title</label>
          <Input type="text" name="title" placeholder={bookData?.data?.title} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
          <label>Author</label>
          <Input
            placeholder={bookData?.data?.author}
            type="text"
            name="author"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
          <label>Genre</label>
          <Input name="genre" placeholder={bookData?.data?.genre} type="text" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
          <label>Publication Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
          <label>Image URL </label>
          <Input name="image" type="text" placeholder={bookData?.data?.image} />
        </div>
        <Button type="submit" className="mt-2 block mx-auto">
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateBook;
