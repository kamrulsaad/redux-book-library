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
import { useAddBookMutation } from "@/redux/features/book/bookApi";
import { IBook } from "@/types/book";
import { useToast } from "@/components/ui/use-toast";

const AddNewBook = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const { toast } = useToast();

  const [addBook, { isLoading, isSuccess, isError, error }] =
    useAddBookMutation();

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

    await addBook(data);

    if (isError) {
      toast({
        variant: "destructive",
        title: error as string,
      });
    }
    if (isSuccess)
      toast({
        description: "Book Added Successfully",
      });
  };

  return (
    <div className="min-h-[calc(100vh-150px)] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-1/4">
        <h1 className="text-center mb-4 text-3xl font-bold">Add New Book</h1>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label>Title</label>
          <Input required={true} type="text" name="title" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
          <label>Author</label>
          <Input required={true} type="text" name="author" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
          <label>Genre</label>
          <Input
            name="genre"
            required={true}
            type="text"
            placeholder="Fantasy/Adventure/Mystery"
          />
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
          <label>Image URL (optional)</label>
          <Input name="image" type="text" />
        </div>
        <Button type="submit" className="mt-2 block mx-auto">
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default AddNewBook;
