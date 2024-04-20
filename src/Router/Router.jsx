import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/Shop/Menu";

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
          element:<Menu/>
      },

    ]
  },
]);

export default router;
