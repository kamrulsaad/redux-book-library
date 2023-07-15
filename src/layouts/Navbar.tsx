import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Navbar() {
  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>
            <h1 className="text-3xl font-bold">BRITANIA</h1>
          </div>
          <div>
            <ul className="flex items-center">
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/">All Books</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/login">Login</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </li>
              <li>
                <Button variant="outline">Log Out</Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
