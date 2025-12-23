import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";
import AddRequest from "../Pages/Dashboard/AddRequest/AddRequest";
import ManageRequest from "../Pages/Dashboard/ManageRequest/ManageRequest";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import MyRequest from "../Pages/Dashboard/MyRequest/MyRequest";
import Profile from "../Pages/Dashboard/Profile/Profile";
import Donate from "../Pages/Donate/Donate";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import SearchRequest from "../Pages/SearchRequest/SearchRequest";
import Settings from "../Pages/Settings/Settings";
import AllRequest from "../Pages/Home/AllRequest/AllRequest";
import ViewDonationRequest from "../Pages/ViewDonationRequest/ViewDonationRequest";
import EditRequest from "../Components/EditRequest/EditRequest";
import RequestDetails from "../Components/RequestDetails/RequestDetails";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: 'donate',
        Component: Donate
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'search',
        Component: SearchRequest
      },
      {
        path: 'all-request',
        Component: AllRequest
      },
      {
        path:'/requests/:id',
        element:
          <RequestDetails></RequestDetails>
        
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
      {
        index: true,
        element: <MainDashboard></MainDashboard>
      },
      {
        path: 'add-request',
        element: <AddRequest></AddRequest>
      },
      {
        path: 'manage-request',
        element: <ManageRequest></ManageRequest>
      },
      {
        path: 'all-users',
        element: <AllUsers></AllUsers>
      },
      {
        path: 'my-request',
        element: <MyRequest></MyRequest>
      },
      {
        path: 'profile',
        element: <Profile></Profile>
      },
      {
        path: 'settings',
        element: <Settings></Settings>
      },
      {
        path: 'view-request/:id',
        element: <ViewDonationRequest />
      },
      {
        path: 'edit-request/:id',
        element: <EditRequest />
      }

    ]
  }
]); 