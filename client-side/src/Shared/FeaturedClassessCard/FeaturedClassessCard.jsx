import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FeaturedClassessCard = ({ fitnessClass }) => {

    const { _id, class_name, class_details, total_bookings } = fitnessClass;

    return (
        <div>
            {/*<!-- Component: Basic blog card --> */}
            <Link to={`/class-details/${_id}`}>
                <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
                    {/*  <!-- Body--> */}
                    <div className="p-6">
                        <header className="mb-4">
                            <h3 className="text-xl font-medium text-slate-700">
                                {class_name}
                            </h3>
                        </header>
                        <p>
                            {class_details.slice(0, 80)}{class_details.length > 80 ? "..." : ""}
                        </p>
                    </div>
                </div>
            </Link>
            {/*<!-- End Basic blog card --> */}
        </div>
    );
};

FeaturedClassessCard.propTypes = {
    fitnessClass: PropTypes.shape({
        class_name: PropTypes.string.isRequired,
        class_details: PropTypes.string.isRequired,
        total_bookings: PropTypes.number.isRequired,
    }).isRequired,
};

export default FeaturedClassessCard;