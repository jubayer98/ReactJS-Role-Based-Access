import { useQuery } from "@tanstack/react-query";
import { Link, useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ClassDetails = () => {

    const classInfo = useLoaderData() || {};
    const axiosPublic = useAxiosPublic();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    })

    if (!classInfo) {
        return <div>No Class Data</div>;
    }

    const {
        _id,
        class_name,
        class_image_url,
        total_bookings,
    } = classInfo;

    return (
        <div className="bg-emerald-500 text-white p-4 max-w-4xl mx-auto rounded-lg">
            <h1 className="text-2xl font-bold"></h1>
            <p className="mt-2 text-2xl font-bold text-center">{class_name}</p>
            <div className="flex">
                <div>
                    <img src={class_image_url} alt="Class" className="w-80 rounded-lg" />
                </div>
                <div className="ml-4 mt-4">
                    <div className="mt-4">
                        <h2 className="font-semibold">Trainers:</h2>
                        <ul>
                            {users.filter(user => user.role === "trainer").map((user) => (
                                <Link key={user._id} to={`/trainer-details/${user._id}`}>
                                    <li className="my-1">
                                        {user.name}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassDetails;