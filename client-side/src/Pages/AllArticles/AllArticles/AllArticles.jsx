import { Helmet } from "react-helmet-async";
import AllArticlesCard from "../AllArticlesCard/AllArticlesCard";
import useArticles from "../../../hooks/useArticles";

const AllArticles = () => {

    const [fitnessArticles] = useArticles();

    return (
        <div className="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Helmet>
                <title>Articles</title>
            </Helmet>
            {

                fitnessArticles.map(fitnessArticle =>
                    <AllArticlesCard
                        key={fitnessArticle._id}
                        fitnessArticle={fitnessArticle}
                    />
                )

            }
        </div>
    );
};

export default AllArticles;