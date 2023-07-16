import App from "@/App";
import AllBooks from "@/pages/AllBooks";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Signup from "@/pages/Signup";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AddNewBook from "@/pages/AddNewBook";
import BookDetails from "@/pages/BookDetails";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/books",
        element: <AllBooks />,
      },
      {
        path: "book/:id",
        element: <BookDetails></BookDetails>,
      },
      {
        path: "/add-new-book",
        element: (
          <PrivateRoute>
            <AddNewBook></AddNewBook>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
