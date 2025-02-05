import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/login";
import Profile from "./pages/profile";
import { useAuthContext } from "./hooks/useAuthcontext.jsx";
import CreateItem from "./pages/create_item.jsx";
import Protected from "./layouts/Protected.jsx";
import Unprotected from "./layouts/Unprotected.jsx";
import DisplayItems from "./pages/Display_items.jsx";
import ItemPage from "./pages/itempage.jsx";
import CartPage from "./pages/cartpage.jsx";

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
            <Route path="/create_item" element={user ? <CreateItem/> : <Navigate to='/login' />} />
            <Route path="/display_items" element={user ? <DisplayItems/> : <Navigate to='/login' />} />
            <Route path="/items/:itemId" element={user ? <ItemPage/> : <Navigate to='/login' />} />
            <Route path="/cart" element={user ? <CartPage/> : <Navigate to='/login' />} />
          </Route>

          <Route path="/" element={user ? <Navigate to='/profile' /> : <Navigate to='/login' />} />
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App