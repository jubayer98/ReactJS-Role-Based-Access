import { useEffect, useState } from "react";

const useReviewes = () => {

    const [fitnessTrainerReviews, setFitnessTrainerReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/reviews')
            .then(res => res.json())
            .then(data => {
                setFitnessTrainerReviews(data);
                setLoading(false);
            });
    }, []);

    return [fitnessTrainerReviews, loading];
};

export default useReviewes;