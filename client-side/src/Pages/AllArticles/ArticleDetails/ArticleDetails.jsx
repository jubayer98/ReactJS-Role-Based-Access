import { useState, useEffect } from 'react';
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';


const ArticleDetails = () => {
    const article = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const [vote, setVote] = useState({ upvote: 0, downvote: 0, userVoted: null });

    useEffect(() => {
        if (article) {
            setVote({ ...vote, upvote: article.upvote, downvote: article.downvote });
        }
    }, [article]);

    const handleVote = (type) => {
        if (vote.userVoted) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "You have already voted.",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        axiosPublic.post(`/articles/${article._id}/vote`, { type })
            .then(response => {
                setVote({ ...vote, ...response.data, userVoted: type });
            })
            .catch(error => {
                console.error('Vote failed:', error);
                Swal.fire({
                    position: "top-end",
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Voting failed! Please check try again.',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    if (!article) {
        return <div>No Article Data</div>;
    }

    const { article_title, article_details, article_date, article_image_url, writer_name } = article;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={article_image_url} alt="Article Image" className="w-full h-64 object-cover" />
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{article_title}</h1>
                    <p className="text-gray-700 text-lg mb-5">{article_details}</p>
                    <div className="flex justify-between items-center text-gray-600 text-sm mb-4">
                        <span>By {writer_name}</span>
                        <span>{article_date}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={() => handleVote('upvote')} className="flex items-center px-3 py-1 text-green-600 border border-green-600 rounded hover:bg-green-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                            </svg>
                            {vote.upvote}
                        </button>
                        <button onClick={() => handleVote('downvote')} className="flex items-center px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                            {vote.downvote}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetails;