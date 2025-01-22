import { FcCancel } from "react-icons/fc";
import { MdDoneOutline } from "react-icons/md";
import Loading from "../../../../shared/Loading/Loading";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AppliedTrainer = () => {

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { data: users, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axiosPublic.get('/users');
            return response.data.filter(user => user.request_status === 'requested'); // Filter users by request_status
        }
    });

    const approveUser = async (userId) => {
        try {
            const response = await axiosPublic.patch(`/users/${userId}/approve`);
            console.log(response.data); // Handle success
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Request approved. You are redirecting ...",
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/dashboard/all-users");
        } catch (error) {
            console.error('Error approving user:', error); // Handle error
            Swal.fire({
                position: "top-end",
                icon: 'error',
                title: 'Oops...',
                text: 'Request failed! Please try again.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const rejectUser = async (userId) => {
        try {
            const response = await axiosPublic.patch(`/users/${userId}/reject`);
            console.log(response.data); // Handle success
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Request rejected. You are redirecting ...",
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/dashboard/all-users");
        } catch (error) {
            console.error('Error rejecting user:', error); // Handle error
            Swal.fire({
                position: "top-end",
                icon: 'error',
                title: 'Oops...',
                text: 'Request failed! Please try again.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    if (isLoading) return <Loading />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            {/*<!-- Component: Table with hover state --> */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border border-separate rounded border-slate-200" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Name</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Email Address</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Request Status</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Action</th>
                        </tr>
                        {
                            users.map(user => <tr key={user._id} className="transition-colors duration-300 hover:bg-slate-50">
                                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{user?.name}</td>
                                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{user?.email}</td>
                                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{user?.request_status}</td>
                                <td className=" flex justify-around items-center h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                    <button onClick={() => approveUser(user._id)}>
                                        <MdDoneOutline />
                                    </button>
                                    <button onClick={() => rejectUser(user._id)}>
                                        <FcCancel />
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {/*<!-- End Table with hover state --> */}
        </>
    );
};

export default AppliedTrainer;