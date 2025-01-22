import TrainersCard from "../../../shared/TrainersCard/TrainersCard";
import useTrainers from "../../../hooks/useTrainers";

function Trainers() {

  const [fitnessTrainers] = useTrainers();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Meet Our Trainers</h2>
        <p className="mt-4 text-lg text-gray-600">
          Our team of dedicated fitness professionals are here to guide you every step of the way. Learn more about our experts below.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            fitnessTrainers.slice(0, 3).map(fitnessTrainer =>
              <TrainersCard
                key={fitnessTrainer._id}
                fitnessTrainer={fitnessTrainer}
              />
            )
          }
        </div>
      </div>
    </section>
  );
}

export default Trainers;