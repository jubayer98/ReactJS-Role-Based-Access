import { useEffect, useState } from "react";

const useArticles = () => {

    const [fitnessArticles, setFitnessArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/articles')
            .then(res => res.json())
            .then(data => {
                setFitnessArticles(data);
                setLoading(false);
            });
    }, []);

    

    return [fitnessArticles, loading];
};

export default useArticles;