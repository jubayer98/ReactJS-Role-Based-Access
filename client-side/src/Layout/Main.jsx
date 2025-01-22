import { Outlet, useLocation } from "react-router-dom";
import Footer from "../shared/Footer/Footer";
import Navbar from "../shared/Navbar/Navbar";

const Main = () => {

    const location = useLocation();
    const noNavbarFooter = location.pathname.includes('login') || location.pathname.includes("registration");

    return (
        <div>
            { noNavbarFooter || <Navbar></Navbar>}
            <Outlet></Outlet>
            { noNavbarFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;