import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {

    const { googleLogin } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || '/';

    const handleGoogleSignIn = () => {
        console.log('Attempting to sign in with Google');
        googleLogin()
            .then(result => {
                console.log('Google login successful:', result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photoUrl: result.user?.photoURL
                };
                console.log('Sending user info to server:', userInfo);
                return axiosPublic.post('/users', userInfo);
            })
            .then(res => {
                console.log('Server response received:', res.data);
                console.log('Redirecting to:', from);

                // Attempt to close the tab
                try {
                    window.close();
                } catch (e) {
                    console.error('Failed to close tab:', e);
                    navigate(from); // Fallback to navigation if tab cannot be closed
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 409) {
                    console.error('Conflict detected:', error.message);
                    window.close();
                } else {
                    console.error('Error during Google sign-in or navigation:', error);
                }
            });
    };

    return (
        <div className="flex justify-center p-6">
            <button onClick={handleGoogleSignIn} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-slate-500 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-400 focus:outline-none disabled:bg-emerald-300 disabled:cursor-not-allowed">
                Sign in with Google
            </button>
        </div>
    );
};

export default SocialLogin;