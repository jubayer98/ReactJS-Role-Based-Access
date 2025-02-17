import { useEffect, useState } from "react";

const useClasses = () => {

    const [fitnessClasses, setFitnessClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/classes')
            .then(res => res.json())
            .then(data => {
                setFitnessClasses(data);
                setLoading(false);
            });
    }, []);

    return [fitnessClasses, loading];
};

export default useClasses;