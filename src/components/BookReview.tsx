import { ChangeEvent, FormEvent, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { FiSend } from "react-icons/fi";
import {
  useGetReviewQuery,
  usePostReviewMutation,
} from "@/redux/features/book/bookApi";
import { VscLoading } from "react-icons/vsc";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "./ui/use-toast";

interface IProps {
  id: string | undefined;
}

export default function BookReview({ id }: IProps) {
  const { data } = useGetReviewQuery(id as string, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const { user } = useAppSelector((state) => state.user);

  const [postReview, { isLoading }] = usePostReviewMutation();

  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user.email) {
      return toast({
        variant: "destructive",
        title: "You must be logged in",
      });
    }

    const options: { id: string; data: object } = {
      id: id!,
      data: {
        review: inputValue,
      },
    };

    postReview(options);
    setInputValue("");
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="w-1/4 mt-5">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Textarea
          className="min-h-[30px]"
          onChange={handleChange}
          value={inputValue}
          placeholder="Wrtie a review"
        />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          {isLoading ? (
            <VscLoading className="text-white animate-spin"></VscLoading>
          ) : (
            <FiSend />
          )}
        </Button>
      </form>
      <div className="mt-4">
        {!data?.reviews?.length && "No Review yet"}
        {data?.reviews?.map((review: string, index: number) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
