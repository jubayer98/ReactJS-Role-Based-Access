import { useEffect, useState } from "react";

const useTrainers = () => {
    const [fitnessTrainers, setFitnessTrainers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/users`)
            .then(res => res.json())
            .then(data => {
                // Filter the data to include only users with the role of 'trainers'
                const trainers = data.filter(user => user?.role === 'trainer');
                setFitnessTrainers(trainers);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch trainers:', error);
                setLoading(false); 
            });
    }, []);

    return [fitnessTrainers, loading];
};

export default useTrainers;