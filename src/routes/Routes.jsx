import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Pages/Home";
import Challenges from "../Pages/Challenges";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ForgetPassword from "../Pages/ForgetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/challenges",
        element: <Challenges></Challenges>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
    ],
  },
]);
