import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TrainersCard = ({ fitnessTrainer }) => {

    const { _id, name, photoUrl, biography, areas_of_expertise } = fitnessTrainer;

    return (
        <Link to={`/trainer-details/${_id}`}>
            <div>
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <img
                        src={photoUrl}
                        alt={name}
                        className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
                    <p className="mt-2 text-gray-600">
                        {biography.slice(0, 100)}{biography.length > 100 ? "..." : ""}
                    </p>
                    <h4 className="mt-4 font-medium text-gray-800">Expertise:</h4>
                    <ul className="mt-2 text-gray-600 flex justify-between">
                        {areas_of_expertise.map((area_of_expertise, index) => (
                            <li key={index} className="text-sm">{area_of_expertise}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </Link>
    );
};

TrainersCard.propTypes = {
    fitnessTrainer: PropTypes.shape({
        name: PropTypes.string.isRequired,
        photoUrl: PropTypes.string.isRequired,
        biography: PropTypes.string.isRequired,
        areas_of_expertise: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default TrainersCard;