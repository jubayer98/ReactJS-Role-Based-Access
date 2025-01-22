import PropTypes from 'prop-types';

const AllClassesCard = ({ fitnessClass }) => {

    const { _id, class_name, class_image_url, class_details, total_bookings } = fitnessClass;

    return (
        <div className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
            {/* Class Image */}
            <img className="w-full h-56 object-cover" src={class_image_url} alt={class_name} />

            {/* Class Info */}
            <div className="px-6 py-4">
                {/* Class Name */}
                <div className="font-bold text-xl mb-2 text-emerald-500">{class_name}</div>

                {/* Class Details */}
                <p className="text-gray-700 text-base mb-3">
                {class_details.slice(0, 100)}{class_details.length > 100 ? "..." : ""}
                </p>
            </div>

            {/* Know More Button */}
            <div className="px-6 text-center pb-6">
                <a
                    href={`/class-details/${_id}`}
                    className="text-white bg-emerald-500 hover:bg-emerald-700 px-4 py-2 rounded-full text-center inline-block"
                >
                    More Details & See Trainers
                </a>
            </div>
        </div>
    );
};

AllClassesCard.propTypes = {
    fitnessClass: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        class_name: PropTypes.string.isRequired,
        class_image_url: PropTypes.string.isRequired,
        class_details: PropTypes.string.isRequired,
        total_bookings: PropTypes.number.isRequired,
        trainers: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default AllClassesCard;