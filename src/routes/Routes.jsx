import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Pages/Home";
import Challenges from "../Pages/Challenges";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ForgetPassword from "../Pages/ForgetPassword";
import NotFound from "../Components/NotFound";
import ChallengeDetails from "../Pages/ChallengeDetails";
import MyActivities from "../Pages/MyActivities";
import Challenges1 from "../Pages/Challenges1";
import PrivateRoute from "../Layouts/PrivateRoutes";

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
        loader: () => fetch("http://localhost:3000/challenges"),
      },
      {
        path: "/challenges1",
        element: <Challenges1></Challenges1>,
      },
      {
        path: "/challenges/:id",
        element: (
          <PrivateRoute>
            <ChallengeDetails></ChallengeDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/challenges/${params.id}`),
      },
      {
        path: "/my-activities",
        element: <MyActivities></MyActivities>,
        loader: () =>
          fetch(`http://localhost:3000/my-activities?email=test@gmail.com`),
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
  {
    path: "*",
    element: <NotFound />,
  },
]);
