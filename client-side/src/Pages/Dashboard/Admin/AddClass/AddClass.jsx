import { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Loading from "../../../../shared/Loading/Loading";

const AddClass = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        const completeData = {
            ...data,
            total_bookings: 0, // initializing total bookings to 0 for a new class
            trainers: []       // initializing with an empty array of trainers
        };
    
        axiosPublic.post('/classes', completeData)
            .then(response => {
                console.log(response);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Class added successfully. Redirecting...",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset(); // resetting the form fields
                navigate("/all-classes"); // redirecting to the classes listing page
            })
            .catch(error => {
                console.error('Submission error:', error);
                Swal.fire({
                    position: "top-end",
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Request failed! Please try again.',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    if (!user) {
        return <Loading></Loading>;
    }

    return (
        <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="class_name" className="block text-sm font-medium text-gray-700">Class Name</label>
                    <input
                        id="class_name"
                        {...register("class_name", { required: "This field is required" })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    />
                </div>
                <div>
                    <label htmlFor="class_details" className="block text-sm font-medium text-gray-700">Class Details</label>
                    <textarea
                        id="class_details"
                        {...register("class_details", { required: "This field is required" })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    />
                </div>
                <div>
                    <label htmlFor="class_image_url" className="block text-sm font-medium text-gray-700">Class Image URL</label>
                    <input
                        id="class_image_url"
                        {...register("class_image_url")}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-emerald-500 text-white font-medium rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50">
                    Add Class
                </button>
            </form>
        </div>
    );
};

export default AddClass;