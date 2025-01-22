import useClasses from "../../../hooks/useClasses";
import AllClassesCard from "../AllClassesCard/AllClassesCard";
import { Helmet } from "react-helmet-async";

const AllClasses = () => {

    const [fitnessClasses] = useClasses();

    return (
        <div className="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Helmet>
                <title>Our Classes</title>
            </Helmet>
            {

                fitnessClasses.map(fitnessClass =>
                    <AllClassesCard
                        key={fitnessClass._id}
                        fitnessClass={fitnessClass}
                    />
                )

            }
        </div>
    );
};

export default AllClasses;