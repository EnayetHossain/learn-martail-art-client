import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Main from "../Layout/Main";
import Classes from "../Pages/Classes/Classes";
import AddClass from "../Pages/Dashboard/AddClass/AddClass";
import AllUser from "../Pages/Dashboard/AllUsers/AllUser";
import EnrolledClasses from "../Pages/Dashboard/EnrolledClasses/EnrolledClasses";
import ManageClasses from "../Pages/Dashboard/ManageClasses/ManageClasses";
import MyClasses from "../Pages/Dashboard/MyClasses/MyClasses";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import SelectedClasses from "../Pages/Dashboard/SelectedClasses/SelectedClasses";
import Home from "../Pages/Home/Home/Home";
import Instructors from "../Pages/Instructors/Instructors";
import Notfound from "../Pages/NotFound/Notfound";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Notfound></Notfound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>,
      },
      {
        path: "/sign-in",
        element: <SignIn></SignIn>,
      },
      {
        path: "/instructors",
        element: <Instructors></Instructors>,
        loader: () =>
          fetch("https://learn-martial-server.vercel.app/instructors"),
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
        loader: () => fetch("https://learn-martial-server.vercel.app/classes"),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <Notfound></Notfound>,
    children: [
      {
        path: "selected-classes",
        element: <SelectedClasses></SelectedClasses>,
      },

      {
        path: "enrolled-classes",
        element: <EnrolledClasses></EnrolledClasses>,
      },

      {
        path: "manage-users",
        element: <AllUser></AllUser>,
      },

      {
        path: "manage-classes",
        element: <ManageClasses></ManageClasses>,
      },

      {
        path: "add-class",
        element: <AddClass></AddClass>,
      },

      {
        path: "my-classes",
        element: <MyClasses></MyClasses>,
      },

      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },

      {
        path: "payment",
        element: <Payment></Payment>,
      },
    ],
  },
]);
