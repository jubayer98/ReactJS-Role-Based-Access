import { useState, useEffect, useContext } from "react";
import logo from '../../../public/favicon.svg';
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const [userRole, setUserRole] = useState(null);
    const handleLogout = () => {
        logout()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const [isToggleOpen, setIsToggleOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("home");

    // Retrieve the active link from localStorage on mount
    useEffect(() => {
        const storedActiveLink = localStorage.getItem("activeLink");
        if (storedActiveLink) {
            setActiveLink(storedActiveLink);
        }
    }, []);

    // Update the active link and store it in localStorage
    const handleLinkClick = (link) => {
        setActiveLink(link);
        localStorage.setItem("activeLink", link); // Store the active link in localStorage
    };

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user && user.email) {
                try {
                    const response = await axiosPublic.get(`/users?email=${user?.email}`);
                    if (response.data) {
                        // Assuming response.data is an array of users
                        const matchedUser = response.data.find(u => u.email === user.email);
                        if (matchedUser) {
                            setUserRole(matchedUser.role);
                            console.log("Matched User Role:", matchedUser.role);
                        } else {
                            console.log("No matching user found");
                        }
                    } else {
                        console.log("No data received");
                    }
                } catch (error) {
                    console.error('Error fetching user role:', error);
                }
            }
        };
        fetchUserRole();
    }, [user, axiosPublic]);

    console.log("user role from navbar", userRole)

    return (
        <>
            {/*<!-- Component: Navbar with Avatar --> */}
            {/*<!-- Header --> */}
            <header className="relative z-20 w-full border-b border-slate-200 shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
                <div className="relative mx-auto max-w-full lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
                    <nav
                        aria-label="main navigation"
                        className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
                        role="navigation"
                    >
                        {/*      <!-- Brand logo --> */}
                        <p className='col-span-1 flex items-center gap-2 whitespace-nowrap text-base font-medium leading-6 focus:outline-none md:col-span-4 lg:col-span-6'>
                            <img src={logo} alt="Company Logo" className='w-8' />
                            Fitness Tracker
                        </p>
                        {/*      <!-- Mobile trigger --> */}
                        <button
                            className={`relative order-10 block h-10 w-10 self-center lg:hidden
                ${isToggleOpen
                                    ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                                    : ""
                                }
              `}
                            onClick={() => setIsToggleOpen(!isToggleOpen)}
                            aria-expanded={isToggleOpen ? "true" : "false"}
                            aria-label="Toggle navigation"
                        >
                            <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                                <span
                                    aria-hidden="true"
                                    className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                                ></span>
                                <span
                                    aria-hidden="true"
                                    className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                                ></span>
                                <span
                                    aria-hidden="true"
                                    className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                                ></span>
                            </div>
                        </button>
                        {/*      <!-- Navigation links --> */}
                        <ul
                            role="menubar"
                            aria-label="Select page"
                            className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${isToggleOpen
                                ? "visible opacity-100 backdrop-blur-sm"
                                : "invisible opacity-0"
                                }`}
                        >
                            <li role="none" className="flex items-stretch">
                                <Link to="/"
                                    role="menuitem"
                                    aria-haspopup="false"
                                    className={`flex items-center gap-2 py-4 transition-colors duration-300 ${activeLink === "home" ? "text-emerald-500" : "hover:text-emerald-500"} focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8`}
                                    href="javascript:void(0)"
                                    onClick={() => handleLinkClick("home")} // Set active link to "home"
                                >
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li role="none" className="flex items-stretch">
                                <Link to="/all-trainers"
                                    role="menuitem"
                                    aria-current="page"
                                    aria-haspopup="false"
                                    className={`flex items-center gap-2 py-4 ${activeLink === "trainers" ? "text-emerald-500" : "hover:text-emerald-500"} focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8`}
                                    href="javascript:void(0)"
                                    onClick={() => handleLinkClick("trainers")} // Set active link to "trainers"
                                >
                                    <span>Our Trainers</span>
                                </Link>
                            </li>
                            <li role="none" className="flex items-stretch">
                                <Link to='/all-classes'
                                    role="menuitem"
                                    aria-haspopup="false"
                                    className={`flex items-center gap-2 py-4 transition-colors duration-300 ${activeLink === "classes" ? "text-emerald-500" : "hover:text-emerald-500"} focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8`}
                                    href="javascript:void(0)"
                                    onClick={() => handleLinkClick("classes")} // Set active link to "classes"
                                >
                                    <span>Our Classes</span>
                                </Link>
                            </li>
                            <li role="none" className="flex items-stretch">
                                <Link to="/all-articles"
                                    role="menuitem"
                                    aria-haspopup="false"
                                    className={`flex items-center gap-2 py-4 transition-colors duration-300 ${activeLink === "articles" ? "text-emerald-500" : "hover:text-emerald-500"} focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8`}
                                    href="javascript:void(0)"
                                    onClick={() => handleLinkClick("articles")} // Set active link to "dashboard"
                                >
                                    <span>Articles</span>
                                </Link>
                            </li>

                            {
                                user ? (
                                    <>
                                        <li role="none" className="flex items-stretch">
                                            <Link to={userRole === "admin" ? "/dashboard/all-users" : userRole === "trainer" ? "/dashboard/manage-slot" : "/dashboard/activity-log"}
                                                target="_blank"
                                                role="menuitem"
                                                aria-haspopup="false"
                                                className={`flex items-center gap-2 py-4 transition-colors duration-300 ${activeLink === "dashboard" ? "text-emerald-500" : "hover:text-emerald-500"} focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8`}
                                                href="javascript:void(0)"
                                                onClick={() => handleLinkClick("dashboard")}
                                            >
                                                <span>Dashboard</span>
                                            </Link>
                                        </li>
                                        <li role="none" className="flex items-stretch">
                                            <button
                                                className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li role="none" className="flex items-stretch">
                                            <Link to="/login"
                                                target="_blank"
                                                role="menuitem"
                                                aria-haspopup="false"
                                                className={`flex items-center gap-2 py-4 transition-colors duration-300 ${activeLink === "login" ? "text-emerald-500" : "hover:text-emerald-500"} focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8`}
                                                href="javascript:void(0)"
                                                onClick={() => handleLinkClick("login")}
                                            >
                                                <span>Login</span>
                                            </Link>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                        {
                            user ? <>
                                <div className="ml-auto flex items-center px-6 lg:ml-0 lg:p-0">
                                    {/*        <!-- Avatar --> */}
                                    <Link

                                        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white"
                                    >
                                        <img
                                            src={user?.photoURL}
                                            alt={user?.name}
                                            title={user?.name}
                                            width="40"
                                            height="40"
                                            className="max-w-full rounded-full"
                                        />
                                    </Link>
                                    {/*        <!-- End Avatar --> */}
                                </div>
                            </> : <>
                                <div className="ml-auto flex items-center px-6 lg:ml-0 lg:p-0">
                                </div>
                            </>
                        }
                    </nav>
                </div>
            </header>
            {/*<!-- End Navbar with Avatar--> */}
        </>
    );
};

export default Navbar;