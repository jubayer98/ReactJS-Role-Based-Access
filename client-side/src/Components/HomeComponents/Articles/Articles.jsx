import ArticlesCard from "../../../shared/ArticlesCard/ArticlesCard";
import useArticles from "../../../hooks/useArticles";

const Articles = () => {

    const [fitnessArticles] = useArticles();    

    return (
        <>
            <h2 className="text-center font-bold text-emerald-500 mt-5 text-2xl">RECENT ARTICLES</h2>
            <hr className="mb-5 border-emerald-500" />
            <div className="grid grid-col-1 md:grid-cols-3 gap-4">
                {
                    fitnessArticles.slice(0, 3).map(fitnessArticle =>
                        <ArticlesCard
                            key={fitnessArticle._id}
                            fitnessArticle={fitnessArticle}
                        />
                    )
                }
            </div>
        </>
    );
};

export default Articles;