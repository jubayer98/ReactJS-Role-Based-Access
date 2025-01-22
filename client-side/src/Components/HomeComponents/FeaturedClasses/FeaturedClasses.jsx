import useClasses from "../../../hooks/useClasses";
import FeaturedClassessCard from "../../../shared/FeaturedClassessCard/FeaturedClassessCard";

const FeaturedClasses = () => {

    const [fitnessClasses] = useClasses();

    return (
        <>
            <h2 className="text-center font-bold text-emerald-500 mt-5 text-2xl">TOP CLASSES</h2>
            <hr className="mb-5 border-emerald-500" />
            <div className="grid grid-col-1 md:grid-cols-3 gap-4">
                {
                    fitnessClasses.slice(0, 6).map(fitnessClass => 
                        <FeaturedClassessCard
                            key={fitnessClass._id}
                            fitnessClass={fitnessClass}
                        />
                    )
                }
            </div>
        </>
    );
};

export default FeaturedClasses;