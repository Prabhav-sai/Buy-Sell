import { Outlet } from "react-router-dom";

const Unprotected = ({ children }) => {
    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Unprotected;