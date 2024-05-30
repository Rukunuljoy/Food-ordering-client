import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/Shop/Menu";
import SignUp from "../components/SignUp";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/Shop/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children:[ 
        {
            path:'/',
            element:<Home/>
        },
        {
          path:'/menu',
          element:<PrivateRouter><Menu/></PrivateRouter>
      },
      {
        path:'/update-profile',
        element:<UpdateProfile/>
    },
    {
      path:'/cart-page',
      element:<CartPage/>
  },

    ]
  },
  {
    path:'/signup',
    element:<SignUp/>
},
]);

export default router;
