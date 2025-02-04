import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/login";
import Profile from "./pages/profile";
import { useAuthContext } from "./hooks/useAuthcontext.jsx";

const App = () => {
  console.log("App");
  const { user } = useAuthContext();
  return (
    <div>
      {/* <div>hi</div> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to='/login' />} />
        <Route path="/register" element={!user ? <Register />: <Navigate to='/profile'/> } />
        <Route path="/login" element={!user ? <Login /> : <Navigate to='/profile'/>} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to='/login'/>} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App