import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddNewBook = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

  };

  return (
    <div className="min-h-[calc(100vh-150px)] flex items-center justify-center">
      <form className="w-1/4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="email">Title</label>
          <Input type="email" id="email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="email">Author</label>
          <Input type="email" id="email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="email">Genre</label>
          <Input type="email" id="email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="email">Publication Date</label>
          <Input type="email" id="email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="email">Image URL (optional)</label>
          <Input type="email" id="email" />
        </div>
        <Button type="submit" className="mt-2">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddNewBook;
