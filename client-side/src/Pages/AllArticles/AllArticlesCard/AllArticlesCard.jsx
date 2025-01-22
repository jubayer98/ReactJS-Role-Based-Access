import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AllArticlesCard = ({ fitnessArticle }) => {

    const { _id, article_title, article_details, writer_name, article_image_url, article_date, upvote, downvote } = fitnessArticle;

    return (
        <div className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
            {/* Article Image */}
            <img className="w-full h-56 object-cover" src={article_image_url} alt={article_title} />

            {/* Article Info */}
            <div className="px-6 py-4">
                {/* Article Title */}
                <div className="font-bold text-xl mb-2 text-emerald-500">{article_title}</div>

                {/* Article Details */}
                <p className="text-gray-700 text-base mb-3">
                    {article_details.slice(0, 100)}{article_details.length > 100 ? "..." : ""}
                </p>

                {/* Article Published Date */}
                <p className="text-gray-700 text-base mb-3"><span className="font-semibold">Published On:</span> {article_date}</p>

                {/* Article Writer */}
                <p className="text-gray-700 text-base"><span className="font-semibold">Written by:</span> {writer_name}</p>

                {/* Upvote and Downvote Counts */}
                <div className="flex space-x-4 mt-2">
                    <span className="text-green-500">Up-votes: {upvote}</span>
                    <span className="text-red-500">Down-votes: {downvote}</span>
                </div>
            </div>

            {/* Read More Button */}
            <div className="px-6 pb-6">
                <Link
                    to={`/article-details/${_id}`}
                    className="text-white bg-emerald-500 hover:bg-emerald-700 px-4 py-2 rounded-full text-center inline-block"
                >
                    Read More
                </Link>
            </div>
        </div>
    );
};

AllArticlesCard.propTypes = {
    fitnessArticle: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        article_title: PropTypes.string.isRequired,
        article_details: PropTypes.string.isRequired,
        writer_name: PropTypes.string.isRequired,
        article_date: PropTypes.string.isRequired,
        article_image_url: PropTypes.string.isRequired,
        upvote: PropTypes.number.isRequired,
        downvote: PropTypes.number.isRequired,
    }).isRequired,
};

export default AllArticlesCard;