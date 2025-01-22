import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const TrainerDetails = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const trainer = useLoaderData() || {}; // Default to an empty object if loader data is undefined
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

    if (!trainer) {
        return <div>No Trainer Data</div>;
    }

    const {
        _id,
        name,
        photoUrl,
        biography,
        areas_of_expertise = [], // Default to an empty array if undefined
        years_of_experience,
        available_slots = [] // Default to an empty array if undefined
    } = trainer;
    console.log("user data", trainer)

    // Define if the link should be disabled
    const isLinkDisabled = userRole === "trainer" || userRole === "admin";
    console.log("role from trainer details", userRole)

    return (
        <div className="container mx-auto my-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <img className="h-48 w-full object-cover md:w-48" src={photoUrl} alt={name} />
                    </div>
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{name}</div>
                        <p className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{biography}</p>
                        <p className="mt-2 text-gray-500">Years of Experience: {years_of_experience}</p>
                        <div>
                            <span className='font-semibold text-emerald-500'>Areas of Expertise:</span>
                            <ul className="list-disc ml-5 mt-1">
                                {areas_of_expertise.map((area_of_expertise, index) => (
                                    <li key={index}>{area_of_expertise}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="p-8">
                    <h3 className="font-semibold text-xl text-emerald-500 mb-4">Available Slots</h3>
                    <div className="flex flex-wrap">
                        {available_slots.map((slot, index) => {
                            // Determine the path based on the slot value
                            let path;
                            if (slot.toLowerCase().includes("morning")) {
                                path = `/morning/${_id}`;
                            } else if (slot.toLowerCase().includes("afternoon")) {
                                path = `/afternoon/${_id}`;
                            } else if (slot.toLowerCase().includes("evening")) {
                                path = `/evening/${_id}`;
                            } else {
                                path = `/default/${_id}`; // Default path if none of the conditions match
                            }

                            return (
                                <Link
                                    key={index}
                                    to={path} // Dynamically set the destination based on slot time
                                    className={`mr-2 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded ${isLinkDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    tabIndex={isLinkDisabled ? -1 : 0} // Accessibility: Prevents focusing when disabled
                                    aria-disabled={isLinkDisabled} // Accessibility: Indicates disabled state for assistive technologies
                                    onClick={(e) => {
                                        if (isLinkDisabled) {
                                            e.preventDefault(); // Prevent navigation when disabled
                                        }
                                    }}
                                >
                                    {slot}
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <div className="flex justify-end m-2">
                    <Link
                        to="/become-trainer"
                        className={`bg-slate-500 text-center hover:bg-slate-700 text-white font-bold rounded w-full p-2 ${isLinkDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        tabIndex={isLinkDisabled ? -1 : 0} // Accessibility: Prevents focusing when disabled
                        aria-disabled={isLinkDisabled} // Accessibility: Indicates disabled state for assistive technologies
                        onClick={(e) => isLinkDisabled && e.preventDefault()} // Prevent navigation when disabled
                    >
                        Become A Trainer
                    </Link>
                </div>
            </div>
        </div>
    );
};

TrainerDetails.propTypes = {
    trainer: PropTypes.shape({
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        photoUrl: PropTypes.string.isRequired,
        biography: PropTypes.string.isRequired,
        areas_of_expertise: PropTypes.arrayOf(PropTypes.string).isRequired,
        years_of_experience: PropTypes.number.isRequired,
        available_slots: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
};

export default TrainerDetails;
