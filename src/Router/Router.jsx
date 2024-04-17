import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../layout/Main";
import Home from "../pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children:[
        {
            path:'/',
            element:<Home/>
        }
    ]
  },
]);

export default router;
