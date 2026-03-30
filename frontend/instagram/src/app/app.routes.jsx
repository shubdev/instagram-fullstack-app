import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";
import Home from "../features/posts/pages/Home.jsx";
import Profile from "../features/posts/pages/Profile.jsx";
import NotFound from "../features/auth/pages/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
