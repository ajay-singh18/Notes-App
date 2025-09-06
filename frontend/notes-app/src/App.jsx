import Home from "./pages/Home/Home"
import { BrowserRouter as Router , Routes, Route,Navigate } from "react-router-dom"
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp"
function RouteComponent(){
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
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
    {<RouteComponent/>}
    </>
  )
}

export default App
