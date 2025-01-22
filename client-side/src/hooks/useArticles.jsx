import { useEffect, useState } from "react";

const useArticles = () => {

    const [fitnessArticles, setFitnessArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://fitness-tracker-server-tawny.vercel.app/articles')
            .then(res => res.json())
            .then(data => {
                setFitnessArticles(data);
                setLoading(false);
            });
    }, []);

    

    return [fitnessArticles, loading];
};

export default useArticles;