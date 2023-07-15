import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SignupForm } from "../components/SignUpForm";
import { Link } from "react-router-dom";
import Navbar from "@/layouts/Navbar";

export default function Signup() {
  console.log("first");

  return (
    <>
      <Navbar />
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to="/login"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage:
                "url(https://th.bing.com/th/id/R.3520740dc0b48e95c2cdb9ccd20f3aaf?rik=hy0%2fzReMxxFJtA&pid=ImgRaw&r=0)",
            }}
          />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link to="/">
              <img className="h-8" src="" alt="" />
            </Link>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2"></blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password below to create your account
              </p>
            </div>
            <SignupForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
