import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";
import AllClasses from "../pages/AllClasses/AllClasses/AllClasses";
import AllArticles from "../pages/AllArticles/AllArticles/AllArticles";
import AllTrainers from "../pages/AllTrainers/AllTrainers/AllTrainers";
import Login from "../pages/login/Login";
import Registration from "../pages/Registration/Registration";
import PrivateRoute from "./PrivateRoute";
import TrainerDetails from "../pages/AllTrainers/TrainerDetails/TrainerDetails";
import Dashboard from "../layout/Dashboard";
import AllUsers from "../pages/Dashboard/Admin/AllUsers/AllUsers";
import AppliedTrainer from "../pages/Dashboard/Admin/AppliedTrainer/AppliedTrainer";
import Balance from "../pages/Dashboard/Admin/Balance/Balance";
import AddClass from "../pages/Dashboard/Admin/AddClass/AddClass";
import ManageSlot from "../pages/Dashboard/Trainer/ManageSlot/ManageSlot";
import AddArticle from "../pages/Dashboard/AddArticle/AddArticle";
import ActivityLog from "../pages/Dashboard/Member/ActivityLog/ActivityLog";
import BookedTrainer from "../pages/Dashboard/Member/BookedTrainer/BookedTrainer";
import ArticleDetails from "../pages/AllArticles/ArticleDetails/ArticleDetails";
import AddSlot from "../pages/Dashboard/Trainer/AddSlot/AddSlot";
import BecomeTrainer from "../pages/AllTrainers/BecomeTrainer/BecomeTrainer";
import ClassDetails from "../pages/AllClasses/ClassDetails/ClassDetails";
import Morning from "../pages/Slots/Morning";
import Afternoon from "../pages/Slots/Afternoon";
import Evening from "../pages/Slots/Evening";
import Payment from "../pages/Payment/Payment";
import Profile from "../pages/Dashboard/Profile/Profile";
import UpdateSlot from "../pages/Dashboard/Trainer/ManageSlot/UpdateSlot";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'all-trainers',
        element: <AllTrainers></AllTrainers>
      },
      {
        path: 'trainer-details/:id',
        element: <PrivateRoute><TrainerDetails></TrainerDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`https://fitness-tracker-server-tawny.vercel.app/users/${params.id}`)
      },
      {
        path: 'become-trainer',
        element: <PrivateRoute><BecomeTrainer></BecomeTrainer></PrivateRoute>
      },
      {
        path: 'all-classes',
        element: <AllClasses></AllClasses>
      },
      {
        path: 'class-details/:id',
        element: <PrivateRoute><ClassDetails></ClassDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`https://fitness-tracker-server-tawny.vercel.app/classes/${params.id}`)
      },
      {
        path: 'all-articles',
        element: <AllArticles></AllArticles>
      },
      {
        path: 'article-details/:id',
        element: <PrivateRoute><ArticleDetails></ArticleDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`https://fitness-tracker-server-tawny.vercel.app/articles/${params.id}`)
      },
      {
        path: 'morning/:id',
        element: <PrivateRoute><Morning></Morning></PrivateRoute>,
        loader: ({ params }) => fetch(`https://fitness-tracker-server-tawny.vercel.app/users/${params.id}`)
      },
      {
        path: 'afternoon/:id',
        element: <PrivateRoute><Afternoon></Afternoon></PrivateRoute>,
        loader: ({ params }) => fetch(`https://fitness-tracker-server-tawny.vercel.app/users/${params.id}`)
      },
      {
        path: 'evening/:id',
        element: <PrivateRoute><Evening></Evening></PrivateRoute>,
        loader: ({ params }) => fetch(`https://fitness-tracker-server-tawny.vercel.app/users/${params.id}`)
      },
      {
        path: 'payment',
        element: <PrivateRoute><Payment></Payment></PrivateRoute>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'registration',
        element: <Registration></Registration>
      }
    ]
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      // admin routes
      {
        path: 'all-users',
        element: <PrivateRoute><AllUsers></AllUsers></PrivateRoute>
      },
      {
        path: 'applied-trainer',
        element: <PrivateRoute><AppliedTrainer></AppliedTrainer></PrivateRoute>
      },
      {
        path: 'balance',
        element: <PrivateRoute><Balance></Balance></PrivateRoute>
      },
      {
        path: 'add-class',
        element: <PrivateRoute><AddClass></AddClass></PrivateRoute>
      },
      // trainer routes
      {
        path: 'manage-slot',
        element: <PrivateRoute><ManageSlot></ManageSlot></PrivateRoute>
      },
      {
        path: 'add-slot',
        element: <PrivateRoute><AddSlot></AddSlot></PrivateRoute>
      },
      {
        path: 'update-slot',
        element: <PrivateRoute><UpdateSlot></UpdateSlot></PrivateRoute>
      },
      {
        path: 'add-article',
        element: <PrivateRoute><AddArticle></AddArticle></PrivateRoute>
      },
      // member routes
      {
        path: 'activity-log',
        element: <PrivateRoute><ActivityLog></ActivityLog></PrivateRoute>
      },
      {
        path: 'booked-trainer',
        element: <PrivateRoute><BookedTrainer></BookedTrainer></PrivateRoute>
      }
    ]
  }
]);

