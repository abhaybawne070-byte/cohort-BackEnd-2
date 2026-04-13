
import './App.css'
import {RouterProvider} from "react-router"
import {routes} from "./app.routes"


function App() {

  return (
     <>
      <RouterProvider routes={routes}/>
     </>
  )
}

export default App
