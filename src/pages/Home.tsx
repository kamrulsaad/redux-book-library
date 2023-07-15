import Books from "@/components/Books";
import Footer from "@/layouts/Footer";

export default function Home() {
  return (
    <>
      <h1 className="my-5 px-20 text-xl font-semibold ml-2">Recently Added</h1>
      <Books />
      <Footer />
    </>
  );
}
