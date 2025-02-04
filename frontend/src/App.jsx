import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/login";
import Profile from "./pages/profile";
import { useAuthContext } from "./hooks/useAuthcontext.jsx";
import Create_item from "./pages/create_item";
import Protected from "./layouts/Protected.jsx";
import Unprotected from "./layouts/Unprotected.jsx";

const App = () => {
  console.log("App");
  const { user } = useAuthContext();
  
  return (
    <div>
      {/* <div>hi</div> */}
    <BrowserRouter>
    <Routes>
          {/* Non-authenticated routes */}
          <Route element={<Unprotected />}>
            <Route path="/register" element={!user ? <Register /> : <Navigate to='/profile' />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to='/profile' />} />
          </Route>

          {/* Authenticated routes */}
          <Route element={<Protected />}>
            <Route path="/profile" element={user ? <Profile /> : <Navigate to='/login' />} />
            <Route path="/create_item" element={user ? <Create_item /> : <Navigate to='/login' />} />
          </Route>

          <Route path="/" element={user ? <Navigate to='/profile' /> : <Navigate to='/login' />} />
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App