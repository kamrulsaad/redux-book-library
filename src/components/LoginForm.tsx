/* eslint-disable @typescript-eslint/no-floating-promises */
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginUser } from "@/redux/features/user/userSlice";
import { useEffect } from "react";

export function LoginForm() {
  const dispatch = useAppDispatch();

  const { isLoading, error, user } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    dispatch(
      loginUser({
        email,
        password,
      })
    );
  };

  useEffect(() => {
    if (user.email && !isLoading) {
      navigate("/");
    }
  }, [user.email, isLoading, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <Input name="email" placeholder="Email" type="email" />
      <Input
        name="password"
        className="mt-2"
        placeholder="Password"
        type="password"
      />
      {error && <p className="text-red-500 my-2">{error}</p>}
      <Button className="mt-4 block mx-auto" type="submit">
        {isLoading ? "Loading..." : "Sign up"}
      </Button>
    </form>
  );
}
