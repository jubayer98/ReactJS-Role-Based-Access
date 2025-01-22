import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { GrUpdate } from "react-icons/gr";
import { Link } from "react-router-dom";

const ManageSlot = () => {

    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const [availableClasses, setAvailableClasses] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [slotDuration, setSlotDuration] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user && user.email) {
                try {
                    const response = await axiosPublic.get(`/users?email=${user?.email}`);
                    if (response.data) {
                        // Assuming response.data is an array of users
                        const matchedUser = response.data.find(u => u.email === user.email);
                        if (matchedUser) {
                            setSlotDuration(matchedUser.slot_duration);
                            setUserEmail(matchedUser.email);
                            setAvailableClasses(matchedUser.available_classes);
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
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Available Classes</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Slot Duration</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Action</th>
                        </tr>
                        {availableClasses && (
                            <tr className="transition-colors duration-300 hover:bg-slate-50">
                                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                                    {availableClasses.map((classItem, index) => (
                                        <li key={index}>{classItem}</li>
                                    ))}
                                </td>
                                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                                    {slotDuration}
                                </td>
                                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                                    <Link to="/dashboard/update-slot">
                                        <GrUpdate />
                                    </Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/*<!-- End Table with hover state --> */}
        </>
    );
};

export default ManageSlot;