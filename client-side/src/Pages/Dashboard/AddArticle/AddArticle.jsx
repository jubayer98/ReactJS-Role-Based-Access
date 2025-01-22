import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthProvider';
import Loading from '../../../shared/Loading/Loading';

const AddArticle = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const { register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        // This ensures that default values are set after user is fetched
        if (user) {
            setValue('article_writer', user?.displayName);
            setValue('article_date', new Date().toISOString().slice(0, 10)); // Pre-populate the article_date with today's date
        }
    }, [user, setValue]);

    const onSubmit = data => {

        const completeData = {
            ...data,
            writer_name: user?.displayName, // Assuming displayName is the writer's name
            writer_email: user?.email, // Assuming email is available on the user object
            upvote: 0, // Default upvote count
            downvote: 0 // Default downvote count
        };

        axiosPublic.post('/articles', completeData)
            .then(response => {
                console.log(response);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Article posted. Redirecting...",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
                navigate("/all-articles");
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
                    <label htmlFor="article_title" className="block text-sm font-medium text-gray-700">Article Title</label>
                    <input
                        id="article_title"
                        {...register("article_title", { required: "This field is required" })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    />
                </div>
                <div>
                    <label htmlFor="article_details" className="block text-sm font-medium text-gray-700">Article Details</label>
                    <textarea
                        id="article_details"
                        {...register("article_details", { required: "This field is required" })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    />
                </div>
                <div>
                    <label htmlFor="article_writer" className="block text-sm font-medium text-gray-700">Article Writer</label>
                    <input
                        id="article_writer"
                        {...register("article_writer", { disabled: true })}
                        defaultValue={user?.displayName}  // Now the default value is directly manageable and reactive
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        readOnly  // Optionally make this field read-only if it should not be edited
                    />
                </div>
                <div>
                    <label htmlFor="article_date" className="block text-sm font-medium text-gray-700">Article Date</label>
                    <input
                        type="date"
                        id="article_date"
                        {...register("article_date")}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    />
                </div>
                <div>
                    <label htmlFor="article_image_url" className="block text-sm font-medium text-gray-700">Article Image URL</label>
                    <input
                        id="article_image_url"
                        {...register("article_image_url")}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-emerald-500 text-white font-medium rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50">
                    Submit Article
                </button>
            </form>
        </div>
    );
};

export default AddArticle;