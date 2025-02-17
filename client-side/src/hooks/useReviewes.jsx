import { useEffect, useState } from "react";

const useReviewes = () => {

    const [fitnessTrainerReviews, setFitnessTrainerReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://fitness-tracker-server-tawny.vercel.app/reviews')
            .then(res => res.json())
            .then(data => {
                setFitnessTrainerReviews(data);
                setLoading(false);
            });
    }, []);

    return [fitnessTrainerReviews, loading];
};

export default useReviewes;