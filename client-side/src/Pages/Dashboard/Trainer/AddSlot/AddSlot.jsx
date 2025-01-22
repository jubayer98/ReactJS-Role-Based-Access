import Swal from "sweetalert2";
import Loading from "../../../../shared/Loading/Loading";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useForm } from 'react-hook-form';
import { useQuery } from "@tanstack/react-query";

const AddSlot = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const { register, handleSubmit, reset } = useForm();

    const [userName, setUserName] = useState(null);
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
                            setUserName(matchedUser.name);
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

    const { data: classes = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosPublic.get('/classes');
            return res.data;
        }
    })

    const onSubmit = data => {
        const postData = {
            email: user.email, // Passing user's email from AuthContext
            slot_duration: data.slot_duration,
            available_classes: data.available_classes
        };

        axiosPublic.patch(`/users/updateByEmail2`, postData)
            .then(response => {
                console.log(response);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "New slot has been added successfully.",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset(); // Reset the form after successful update
                navigate("/dashboard/manage-slot");
            })
            .catch(error => {
                console.error('Update error:', error);
                Swal.fire({
                    position: "top-end",
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Request has been failed! Please try again.',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    if (!user) {
        return <Loading></Loading>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold text-emerald-500 mb-4">Add New Slot</h2>

            {/* Read-only field for displaying trainer's name */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Trainer Name</label>
                <input
                    type="text"
                    id="trainer_name"
                    defaultValue={userName}
                    {...register("trainer_name", { disabled: true })}
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                    readOnly
                />
            </div>

            {/* Input for slot duration */}
            <div className="mb-4">
                <label htmlFor="slot_duration" className="block text-sm font-medium text-gray-700">Slot Duration</label>
                <input type="number" id="slot_duration" {...register('slot_duration', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
            </div>

            {/* Multi-select for class selection */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Select Class</label>
                <select
                    {...register('available_classes', { required: true })}
                    multiple
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                >
                    {classes.map((cls) => (
                        <option key={cls._id} value={cls.class_name}>{cls.class_name}</option>
                    ))}
                </select>
            </div>
            {/* Submit button */}
            <button type="submit" className="w-full py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-md shadow-sm">Submit</button>
        </form>
    );
};

export default AddSlot;