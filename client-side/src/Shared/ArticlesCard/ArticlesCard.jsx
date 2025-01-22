import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ArticlesCard = ({ fitnessArticle }) => {
    const { _id, article_title, writer_name, article_image_url, article_date } = fitnessArticle;

    return (
        <div>
            {/*<!-- Component: Image overlay card --> */}
            <Link to={`/article-details/${_id}`}>
                <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
                    {/*  <!-- Image --> */}
                    <figure className="relative">
                        <img
                            src={article_image_url}
                            alt="card image"
                            className="aspect-video w-full"
                        />
                        <figcaption className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 p-6 text-white">
                            <h3 className="text-lg font-medium ">{article_title}</h3>
                            <p className="text-sm opacity-75"> By {writer_name}, {article_date}</p>
                        </figcaption>
                    </figure>
                </div>
            </Link>
            {/*<!-- End Image overlay card --> */}
        </div>
    );
};

ArticlesCard.propTypes = {
    fitnessArticle: PropTypes.shape({
        article_title: PropTypes.string.isRequired,
        article_image_url: PropTypes.string.isRequired,
        writer_name: PropTypes.string.isRequired,
        article_date: PropTypes.string.isRequired,
    }).isRequired,
};

export default ArticlesCard;