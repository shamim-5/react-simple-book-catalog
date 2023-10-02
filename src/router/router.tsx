import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/pages/Home";
import AllBooks from "@/pages/AllBooks";
import BookDetails from "@/pages/BookDetails";
import NotFound from "@/pages/NotFound";
import Authentication from "@/pages/Authentication";
import AddNewBook from "@/pages/AddNewBook";
import PrivateRoute from "@/components/PrivateRoute";
import EditBook from "@/pages/EditBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
      {
        path: "/books/:id",
        element: <BookDetails />,
      },
      {
        path: "/login",
        element: <Authentication />,
      },
      {
        path: "/signup",
        element: <Authentication />,
      },
      {
        path: "/add-new-book",
        element: (
          <PrivateRoute>
            <AddNewBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-book/:id",
        element: (
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
