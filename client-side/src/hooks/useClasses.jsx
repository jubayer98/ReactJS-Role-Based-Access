import { useEffect, useState } from "react";

const useClasses = () => {

    const [fitnessClasses, setFitnessClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://fitness-tracker-server-tawny.vercel.app/classes')
            .then(res => res.json())
            .then(data => {
                setFitnessClasses(data);
                setLoading(false);
            });
    }, []);

    return [fitnessClasses, loading];
};

export default useClasses;