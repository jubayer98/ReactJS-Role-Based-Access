import { NavLink, Outlet } from "react-router-dom";
import { VscGitStashApply } from "react-icons/vsc";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import { MdManageAccounts, MdOutlineBookmark } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaHome, FaUser } from "react-icons/fa";
import { LuSquareActivity } from "react-icons/lu";

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [userRole, setUserRole] = useState(null);

    const handleLogout = () => {
        logout()
            .then(() => { })
            .catch(error => console.log(error));
    }

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

    console.log("user role from dashboard", userRole)

    return (
        <div className="flex">
            {/* Dashboard Sidebar */}
            <div className="w-64 min-h-screen bg-emerald-500 p-5">
                <ul className="space-y-2">
                    <li>
                        <NavLink to="/" className={({ isActive }) =>
                            isActive ? "inline-block w-full px-4 py-2 rounded-md text-white bg-emerald-700"
                                : "inline-block w-full px-4 py-2 rounded-md text-emerald-200 hover:text-white"
                        }>
                            <span className="flex items-center gap-2"><FaHome />Home</span>
                        </NavLink>
                    </li>
                    <hr />
                    {/* Conditional rendering based on role */}
                    {userRole === 'admin' && (
                        <>
                            <li>
                                <NavLink to="/dashboard/all-users" className={({ isActive }) =>
                                    isActive ? "inline-block w-full px-4 py-2 rounded-md text-white bg-emerald-700"
                                        : "inline-block w-full px-4 py-2 rounded-md text-emerald-200 hover:bg-emerald-600 hover:text-white"
                                }>
                                    <span className="flex items-center gap-2"><FaUser />All Users</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/applied-trainer" className={({ isActive }) =>
                                    isActive ? "inline-block w-full px-4 py-2 rounded-md text-white bg-emerald-700"
                                        : "inline-block w-full px-4 py-2 rounded-md text-emerald-200 hover:bg-emerald-600 hover:text-white"
                                }>
                                    <span className="flex items-center gap-2"><VscGitStashApply />Applied Trainer</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/balance" className={({ isActive }) =>
                                    isActive ? "inline-block w-full px-4 py-2 rounded-md text-white bg-emerald-700"
                                        : "inline-block w-full px-4 py-2 rounded-md text-emerald-200 hover:bg-emerald-600 hover:text-white"
                                }>
                                    <span className="flex items-center gap-2"><RiMoneyDollarCircleFill />Balance</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/add-class" className={({ isActive }) =>
                                    isActive ? "inline-block w-full px-4 py-2 rounded-md text-white bg-emerald-700"
                                        : "inline-block w-full px-4 py-2 rounded-md text-emerald-200 hover:bg-emerald-600 hover:text-white"
                                }>
                                    <span className="flex items-center gap-2"><IoIosAddCircle />Add Class</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/add-article" className={({ isActive }) =>
                                    isActive ? "inline-block w-full px-4 py-2 rounded-md text-white bg-emerald-700"
                                        : "inline-block w-full px-4 py-2 rounded-md text-emerald-200 hover:bg-emerald-600 hover:text-white"
                                }>
                                    <span className="flex items-center gap-2"><IoIosAddCircle />Add Article</span>
                                </NavLink>
                            </li>
                        </>
                    )}
                    {userRole === 'trainer' && (
                        <>
                            <li>
                                <NavLink to="/dashboard/manage-slot" className={({ isActive }) =>
                                    isActive ? "inline-block w-full px-4 py-2 rounded-md text-white bg-emerald-700"
                                        : "inline-block w-full px-4 py-2 rounded-md text-emerald-200 hover:bg-emerald-600 hover:text-white"
                                }>
                                    <span className="flex items-center gap-2"><MdManageAccounts />Manage Slot</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/add-slot" className={({ isActive }) =>
                                    isActive ? "inline-block w-full px-4 py-2 rounded-md text-white bg-emerald-700"
                                        : "inline-block w-full px-4 py-2 rounded-md text-emerald-200 hover:bg-emerald-600 hover:text-white"
                                }>
                                    <span className="flex items-center gap-2"><IoIosAddCircle />Add Slot</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/add-article" className={({ isActive }) =>
                                    isActive ? "inline-block w-full px-4 py-2 rounded-md text-white bg-emerald-700"
                                        : "inline-block w-full px-4 py-2 rounded-md text-emerald-200 hover:bg-emerald-600 hover:text-white"
                                }>
                                    <span className="flex items-center gap-2"><IoIosAddCircle />Add Article</span>
                                </NavLink>
                            </li>
                        </>
                    )}
                    {userRole === 'member' && (
                        <>
                            <li>
                                <NavLink to="/dashboard/activity-log" className={({ isActive }) =>
                                    isActive ? "inline-block w-full px-4 py-2 rounded-md text-white bg-emerald-700"
                                        : "inline-block w-full px-4 py-2 rounded-md text-emerald-200 hover:bg-emerald-600 hover:text-white"
                                }>
                                    <span className="flex items-center gap-2"><LuSquareActivity />Activity Log</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/booked-trainer" className={({ isActive }) =>
                                    isActive ? "inline-block w-full px-4 py-2 rounded-md text-white bg-emerald-700"
                                        : "inline-block w-full px-4 py-2 rounded-md text-emerald-200 hover:bg-emerald-600 hover:text-white"
                                }>
                                    <span className="flex items-center gap-2"><MdOutlineBookmark />Booked Trainer</span>
                                </NavLink>
                            </li>
                        </>
                    )}
                    {/* Profile and Logout always shown */}
                    <hr />
                    <li>
                        <NavLink to="/dashboard/profile" className={({ isActive }) =>
                            isActive ? "inline-block w-full px-4 py-2 rounded-md text-white bg-emerald-700"
                                : "inline-block w-full px-4 py-2 rounded-md text-emerald-200 hover:text-white"
                        }>
                            <span className="flex items-center gap-2"><CgProfile />Profile</span>
                        </NavLink>
                    </li>
                    <hr />
                    <li>
                        <button onClick={handleLogout}>
                            <NavLink to="/" className={({ isActive }) =>
                                isActive ? "inline-block w-full px-4 py-2 rounded-md text-white bg-emerald-700"
                                    : "inline-block w-full px-4 py-2 rounded-md text-emerald-200 hover:text-white"
                            }>
                                <span className="flex items-center gap-2"><AiOutlineLogout />Logout</span>
                            </NavLink>
                        </button>
                    </li>
                </ul>
            </div>

            <div className="flex-1 p-5">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;