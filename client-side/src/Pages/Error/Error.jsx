import { Link } from "react-router-dom";

const Error = () => {
    return (
        <section className="flex items-center justify-center h-screen bg-gray-50">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-6xl font-extrabold text-red-600">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mt-4">Oops! Page not found</h2>
                <p className="text-lg text-gray-500 mt-4">
                    We couldn’t find the page you’re looking for. It might have been moved or deleted.
                </p>
                <div className="mt-6">
                    <Link
                        to="/"
                        className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Error;