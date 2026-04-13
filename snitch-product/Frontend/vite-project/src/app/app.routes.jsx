import {createBrowserRouter} from "react-router-dom"
import Register from "../feature/auth/pages/Register"

export const routes = createBrowserRouter([
    {
        path:"/",
        element: <h1>hello world</h1>
    },
    {
        path:"/register",
        element:<Register/>,
    }

])