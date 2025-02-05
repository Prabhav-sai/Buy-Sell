import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Protected = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Protected;