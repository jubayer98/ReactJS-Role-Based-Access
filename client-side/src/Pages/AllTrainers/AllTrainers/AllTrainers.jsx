import useTrainers from "../../../hooks/useTrainers";
import AllTrainersCard from "../AllTrainersCard/AllTrainersCard";
import { Helmet } from "react-helmet-async";

const AllTrainers = () => {

    const [fitnessTrainers] = useTrainers();

    return (
        <div className="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Helmet>
                <title>Our Trainers</title>
            </Helmet>
            {

                fitnessTrainers.map(fitnessTrainer =>
                    <AllTrainersCard
                        key={fitnessTrainer._id}
                        fitnessTrainer={fitnessTrainer}
                    />
                )

            }
        </div>
    );
};

export default AllTrainers;