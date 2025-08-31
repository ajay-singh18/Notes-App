import Home from "./pages/Home/Home"
import { BrowserRouter as Router , Routes, Route } from "react-router-dom"
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp"
function RouteComonent(){
  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element = {<Home/>} ></Route>
          <Route path="/login" element = {<Login/>} ></Route>
          <Route path="/signup" element = {<SignUp/>} ></Route>
        </Routes>
      </Router>
    </>
  )
}
function App() {
  return (
    <>
    {<RouteComonent/>}
    </>
  )
}

export default App
