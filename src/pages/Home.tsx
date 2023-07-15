import Books from "@/components/Books";
import Footer from "@/layouts/Footer";

export default function Home() {
  return (
    <>
      <h1 className="my-10 px-20">Recently Added</h1>
      <Books />
      <Footer />
    </>
  );
}
