import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';

const BecomeTrainer = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if (user) {
            setValue('trainer_name', user?.displayName);
            setValue('trainer_image_url', user?.photoURL);
        }
    }, [user, setValue]);

    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const onSubmit = data => {
        const postData = {
            email: user.email, // Passing user's email from AuthContext
            biography: data.biography,
            areas_of_expertise: data.areas_of_expertise,
            years_of_experience: data.years_of_experience,
            available_slots: data.available_slots,
            social_url: [
                { url: data.facebook_url, platform: "Facebook" },
                { url: data.twitter_url, platform: "Twitter" }
            ]
        };
    
        axiosPublic.patch(`/users/updateByEmail`, postData)
            .then(response => {
                console.log(response);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your profile has been updated.",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset(); // Reset the form after successful update
                navigate("/dashboard/activity-log");
            })
            .catch(error => {
                console.error('Update error:', error);
                Swal.fire({
                    position: "top-end",
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Update failed! Please try again.',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };
    console.log("userid",user.email)
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 max-w-lg mx-auto bg-white rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-emerald-500 mb-4">Your Information</h2>

            <div className="mb-4">
                <label htmlFor="trainer_name" className="block text-sm font-medium text-gray-700">Trainer Name</label>
                <input type="text" id="trainer_name" {...register('trainer_name', { disabled: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
                {errors.trainer_name && <span className="text-red-500 text-xs">This field is required</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="trainer_image_url" className="block text-sm font-medium text-gray-700">Trainer Image URL</label>
                <input
                    type="text" id="trainer_image_url" {...register('trainer_image_url', { disabled: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
                {errors.trainer_name && <span className="text-red-500 text-xs">This field is required</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="years_of_experience" className="block text-sm font-medium text-gray-700">Years of Experience</label>
                <input type="number" id="years_of_experience" {...register('years_of_experience', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
                {errors.trainer_name && <span className="text-red-500 text-xs">This field is required</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="biography" className="block text-sm font-medium text-gray-700">Biography</label>
                <textarea id="biography" {...register('biography', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"></textarea>
                {errors.biography && <span className="text-red-500 text-xs">This field is required</span>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Areas of Expertise</label>
                <select {...register('areas_of_expertise', { required: true })} multiple className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="Yoga">Yoga</option>
                    <option value="Mindfulness">Mindfulness</option>
                    <option value="Wellness">Wellness</option>
                    <option value="Sports Nutrition">Sports Nutrition</option>
                    <option value="Diet Plans">Diet Plans</option>
                    <option value="Conditioning">Conditioning</option>
                    <option value="Hydration Strategies">Hydration Strategies</option>
                    <option value="Strength Training">Strength Training</option>
                    <option value="Nutrition">Nutrition</option>
                </select>
                {errors.areas_of_expertise && <span className="text-red-500 text-xs">Please select at least one area of expertise</span>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Available Slots</label>
                <select {...register('available_slots', { required: true })} multiple className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                </select>
                {errors.available_slots && <span className="text-red-500 text-xs">Please select at least one slot</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="facebook_url" className="block text-sm font-medium text-gray-700">Facebook URL</label>
                <input type="url" id="facebook_url" {...register('facebook_url')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
            </div>

            <div className="mb-4">
                <label htmlFor="twitter_url" className="block text-sm font-medium text-gray-700">Twitter URL</label>
                <input type="url" id="twitter_url" {...register('twitter_url')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
            </div>

            <button type="submit" className="mt-4 px-4 py-2 font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-md shadow-sm">
                Submit
            </button>
        </form>
    );
};

export default BecomeTrainer;
