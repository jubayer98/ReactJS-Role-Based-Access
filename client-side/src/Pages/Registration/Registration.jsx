import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../../shared/SocialLogin/SocialLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Registration = () => {

    const axiosPublic = useAxiosPublic();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, // Added reset to clear the form
    } = useForm();

    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const registeredUser = result.user;
                console.log(registeredUser);
                updateUserProfile(data.name, data.photoUrl)
                    .then(() => {
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            photoUrl: data.photoUrl,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user profile info updated')
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Registration Successful. You are redirecting ...",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate("/");
                                }
                            })
                    })
                    .catch(() => {
                        Swal.fire({
                            position: "top-end",
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Registration failed! Please try again.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
            })

    };

    const validatePassword = (value) => {
        // Ensure the error is shown only when the field is touched and has invalid value
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(value)) {
            return 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.';
        }
        return true;
    };

    return (
        <>
            <div className="w-8/12 max-w-md mt-20 mx-auto">
                <Helmet>
                    <title>Register</title>
                </Helmet>
                {/* Component: Card with form */}
                <form onSubmit={handleSubmit(onSubmit)} className="overflow-hidden rounded-lg bg-white text-slate-500 shadow-xl shadow-slate-300">
                    {/* Body */}
                    <div className="p-8">
                        <header className="mb-6 text-center">
                            <h3 className="text-2xl font-semibold text-slate-700">Create Your Account</h3>
                        </header>
                        <div className="space-y-6">
                            {/* Name input field */}
                            <div className="relative">
                                <input
                                    id="id-name"
                                    type="text"
                                    name="name"
                                    {...register("name", { required: "Name is required" })}
                                    placeholder="Your Name"
                                    className="peer relative h-12 w-full rounded-lg border border-slate-200 px-4 text-sm text-slate-600 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                                />
                                <label
                                    htmlFor="id-name"
                                    className="absolute left-3 -top-5 text-xs text-slate-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-5 peer-focus:text-xs peer-focus:text-emerald-500"
                                >
                                    Your Name
                                </label>
                            </div>
                            {/* Email input field */}
                            <div className="relative">
                                <input
                                    id="id-email"
                                    type="email"
                                    name="email"
                                    {...register("email", { required: "Email is required" })}
                                    placeholder="you@example.com"
                                    className="peer relative h-12 w-full rounded-lg border border-slate-200 px-4 text-sm text-slate-600 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                                />
                                <label
                                    htmlFor="id-email"
                                    className="absolute left-3 -top-5 text-xs text-slate-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-5 peer-focus:text-xs peer-focus:text-emerald-500"
                                >
                                    Your Email
                                </label>
                            </div>
                            {/* Photo URL input field */}
                            <div className="relative">
                                <input
                                    id="id-photo-url"
                                    type="url"
                                    name="photoUrl"
                                    {...register("photoUrl", { required: "Photo URL is required" })}
                                    placeholder="https://your-photo-url.com"
                                    className="peer relative h-12 w-full rounded-lg border border-slate-200 px-4 text-sm text-slate-600 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                                />
                                <label
                                    htmlFor="id-photo-url"
                                    className="absolute left-3 -top-5 text-xs text-slate-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-5 peer-focus:text-xs peer-focus:text-emerald-500"
                                >
                                    Your Photo URL
                                </label>
                            </div>
                            {/* Password input field */}
                            <div className="relative">
                                <input
                                    id="id-password"
                                    type="password"
                                    name="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        validate: validatePassword, // Adding the validation function
                                    })}
                                    placeholder="********"
                                    className="peer relative h-12 w-full rounded-lg border border-slate-200 px-4 pr-12 text-sm text-slate-600 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                                />
                                <label
                                    htmlFor="id-password"
                                    className="absolute left-3 -top-5 text-xs text-slate-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-5 peer-focus:text-xs peer-focus:text-emerald-500"
                                >
                                    Your Password
                                </label>
                                {/* Display error message for password */}
                                {errors.password && (
                                    <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Action: Register button */}
                    <div className="flex justify-center p-6">
                        <input
                            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-400 focus:outline-none disabled:bg-emerald-300 disabled:cursor-not-allowed"
                            type="submit"
                            value="Register"
                        />
                    </div>
                </form>

                {/* Action: Sign in with Google */}
                <SocialLogin></SocialLogin>

                {/* Already have an account link */}
                <div className="text-center mt-4">
                    <small className="text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link to="/login" className="text-emerald-500 hover:underline">
                            Login here
                        </Link>
                    </small>
                </div>
            </div>
        </>
    );
};

export default Registration;