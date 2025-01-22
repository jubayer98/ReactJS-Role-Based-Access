import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../../providers/AuthProvider";


const ActivityLog = () => {

    const { user } = useContext(AuthContext);

    const axiosPublic = useAxiosPublic();
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userStatus, setUserStatus] = useState(null);
    const [userRole, setUserRole] = useState(null);

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
                            setUserEmail(matchedUser.email);
                            setUserName(matchedUser.name);
                            setUserStatus(matchedUser.request_status);
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

    return (
       <>
            {/*<!-- Component: Table with hover state --> */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border border-separate rounded border-slate-200" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Name</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Email Address</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Current Role</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Request Status</th>
                        </tr>
                        <tr className="transition-colors duration-300 hover:bg-slate-50">
                            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{userName}</td>
                            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{userEmail}</td>
                            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{userRole}</td>
                            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{userStatus}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/*<!-- End Table with hover state --> */}
        </>
    );
};

export default ActivityLog; 