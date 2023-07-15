/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

export function SignupForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input name="email" placeholder="Email" type="email" />
      <Input
        name="password"
        className="mt-2"
        placeholder="Password"
        type="password"
      />
      <Button className="mt-4 block mx-auto" type="submit">
        Sign Up
      </Button>
    </form>
  );
}
