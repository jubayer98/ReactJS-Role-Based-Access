import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2';
import SocialLogin from "../../shared/SocialLogin/SocialLogin";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successful. You are redirecting ...",
                    showConfirmButton: false,
                    timer: 1500
                  });
                form.reset(); // Reset the form after successful login
                navigate(from, {replace: true});
            })
            .catch(error => {
                console.error('Login failed:', error);
                Swal.fire({
                    position: "top-end",
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Login failed! Please check your credentials and try again.',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    return (
        <>
            <div className="w-8/12 max-w-md mt-20 mx-auto">
                <Helmet>
                    <title>Login</title>
                </Helmet>
                <form onSubmit={handleLogin} className="overflow-hidden rounded-lg bg-white text-slate-500 shadow-xl shadow-slate-300">
                    <div className="p-8">
                        <header className="mb-6 text-center">
                            <h3 className="text-2xl font-semibold text-slate-700">Login</h3>
                        </header>
                        <div className="space-y-6">
                            <div className="relative">
                                <input
                                    id="id-b03"
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    className="peer relative h-12 w-full rounded-lg border border-slate-200 px-4 text-sm text-slate-600 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                                />
                                <label
                                    htmlFor="id-b03"
                                    className="absolute left-3 -top-5 text-xs text-slate-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-5 peer-focus:text-xs peer-focus:text-emerald-500"
                                >
                                    Your Email
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    id="id-b13"
                                    type="password"
                                    name="password"
                                    placeholder="********"
                                    className="peer relative h-12 w-full rounded-lg border border-slate-200 px-4 pr-12 text-sm text-slate-600 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                                />
                                <label
                                    htmlFor="id-b13"
                                    className="absolute left-3 -top-5 text-xs text-slate-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-5 peer-focus:text-xs peer-focus:text-emerald-500"
                                >
                                    Your Password
                                </label>
                            </div>
                            <div className="flex justify-between">
                                <small className="text-xs text-slate-500">
                                    <Link to="/" className="text-emerald-500 hover:underline">Forgot Password?</Link>
                                </small>
                                <small className="text-xs text-slate-500">
                                    <Link to="/registration" className="text-emerald-500 hover:underline">Don't Have An Account?</Link>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center p-6">
                        <input
                            type="submit"
                            value="Login"
                            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-400 focus:outline-none disabled:bg-emerald-300 disabled:cursor-not-allowed"
                        />
                    </div>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </>
    );
};

export default Login;