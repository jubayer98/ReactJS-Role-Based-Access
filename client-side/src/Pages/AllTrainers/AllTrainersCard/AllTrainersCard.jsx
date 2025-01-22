import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AllTrainersCard = ({ fitnessTrainer }) => {
    const { _id, name, photoUrl, biography, areas_of_expertise, years_of_experience, available_slots, social_url } = fitnessTrainer;
    return (
        <div className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
            {/* Trainer Profile Image */}
            <img className="w-full h-56 object-cover" src={photoUrl} alt={name} />

            {/* Trainer Info */}
            <div className="px-6 py-4">
                {/* Trainer Name */}
                <div className="font-bold text-xl mb-2 text-emerald-500">{name}</div>

                {/* Biography */}
                <p className="text-gray-700 text-base mb-3">
                    {biography.slice(0, 100)}{biography.length > 100 ? "..." : ""}
                </p>

                {/* Areas of Expertise */}
                <p className="text-gray-700 text-base">
                    <span className='font-semibold text-emerald-500'>Areas of Expertise:</span>
                    <ul className="list-disc ml-5 mt-1">
                        {areas_of_expertise && areas_of_expertise.map((area, index) => (
                            <li key={index}>{area}</li>
                        ))}
                    </ul>
                </p>

                {/* Years of Experience */}
                <p className="text-gray-700 text-base mt-2"><span className='font-semibold text-emerald-500'>Years of Experience:</span> {years_of_experience}</p>

                {/* Available Slots */}
                <p className="text-gray-700 text-base mt-2">
                    <span className='font-semibold text-emerald-500'>Available Slots:</span>
                    <ul className="list-disc ml-5 mt-1">
                        {available_slots && available_slots.map((slot, index) => (
                            <li key={index}>{slot}</li>
                        ))}
                    </ul>
                </p>

                {/* Social Links */}
                <div className="flex space-x-3 mt-3">
                    {social_url && social_url.map((link, index) => (
                        <a key={index} href={link.url} className="text-emerald-500 hover:text-emerald-700" target="_blank" rel="noopener noreferrer">
                            {link.platform}
                        </a>
                    ))}
                </div>
            </div>

            {/* Know More Button */}
            <div className="px-6 pb-6">
                <Link
                    to={`/trainer-details/${_id}`}
                    className="text-white bg-emerald-500 hover:bg-emerald-700 px-4 py-2 rounded-full text-center inline-block"
                >
                    Know More
                </Link>
            </div>
        </div >
    );
};

AllTrainersCard.propTypes = {
    fitnessTrainer: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        photoUrl: PropTypes.string.isRequired,
        biography: PropTypes.string.isRequired,
        areas_of_expertise: PropTypes.arrayOf(PropTypes.string).isRequired,
        years_of_experience: PropTypes.number.isRequired,
        available_slots: PropTypes.arrayOf(PropTypes.string).isRequired,  // Assume this should be an array of strings
        social_url: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string.isRequired,
                platform: PropTypes.string.isRequired
            })
        ).isRequired,
    }).isRequired,
};

export default AllTrainersCard;