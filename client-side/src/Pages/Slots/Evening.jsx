import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Evening = () => {
    const trainingInfo = useLoaderData() || {};

    const { _id, name, slot_duration } = trainingInfo;

    return (
        <>
            <div className="grid grid-cols-3 gap-4 my-4">
                {/*<!-- Component: Card with subtitle --> */}
                <div className="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200">
                    <div className="p-6">
                        <header className="mb-4">
                            <h3 className="text-xl font-medium text-slate-700">
                                Basic Membership | Evening
                            </h3>
                            <p className="text-sm text-slate-400">Trainer: {name}, Slot Duration: {slot_duration}</p>
                        </header>
                        <p>
                            <li>Access to gym facilities during regular operating hours.</li>
                            <li>Use of cardio and strength training equipment with very handy usecase.</li>
                            <li>Access to locker rooms and showers.</li>
                        </p>
                    </div>
                    <Link
                        to="/payment"
                        state={{ price: 20, _id, slot_duration, name, slot_timing: "Evening" }}
                        className={`inline-flex w-full mt-2 items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 whitespace-nowrap bg-emerald-500 ${slot_duration === "0" ? 'hover:bg-emerald-600 focus:bg-emerald-700' : 'bg-emerald-300'} focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none`}
                        onClick={e => {
                            if (slot_duration === "0") {
                                e.preventDefault(); // Prevent link action
                                Swal.fire({
                                    title: "No Slot Available!",
                                    icon: "error"
                                });
                            }
                        }}
                        disabled={slot_duration === "0"}
                    >
                        Price $20
                    </Link>
                </div>
                {/*<!-- End Card with subtitle --> */}
                {/*<!-- Component: Card with subtitle --> */}
                <div className="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200">
                    <div className="p-6">
                        <header className="mb-4">
                            <h3 className="text-xl font-medium text-slate-700">
                                Standard Membership | Evening
                            </h3>
                            <p className="text-sm text-slate-400">By {name}, Slot Duration: {slot_duration}</p>
                        </header>
                        <p>
                            <li>All benefits of the basic membership.</li>
                            <li>Access to group fitness classes such as yoga, spinning, and Zumba.
                            </li>
                            <li>Use of additional amenities like a sauna or steam room.</li>
                        </p>
                    </div>
                    <Link
                        to="/payment"
                        state={{ price: 50, _id, slot_duration, name, slot_timing: "Evening" }}
                        className={`inline-flex w-full mt-2 items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 whitespace-nowrap bg-emerald-500 ${slot_duration === "0" ? 'hover:bg-emerald-600 focus:bg-emerald-700' : 'bg-emerald-300'} focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none`}
                        onClick={e => {
                            if (slot_duration === "0") {
                                e.preventDefault(); // Prevent link action
                                Swal.fire({
                                    title: "No Slot Available!",
                                    icon: "error"
                                });
                            }
                        }}
                        disabled={slot_duration === "0"}
                    >
                        Price $50
                    </Link>
                </div>
                {/*<!-- End Card with subtitle --> */}
                {/*<!-- Component: Card with subtitle --> */}
                <div className="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200">
                    <div className="p-6">
                        <header className="mb-4">
                            <h3 className="text-xl font-medium text-slate-700">
                                Premium Membership | Evening
                            </h3>
                            <p className="text-sm text-slate-400">By {name}, Slot Duration: {slot_duration}</p>
                        </header>
                        <p>
                            <li>All benefits of the standard membership.</li>
                            <li>Access to personal training sessions with certified trainers.</li>
                            <li>Discounts on additional services such as massage therapy or nutrition counseling.</li>
                        </p>
                    </div>
                    <Link
                        to="/payment"
                        state={{ price: 100, _id, slot_duration, name, slot_timing: "Evening" }}
                        className={`inline-flex w-full mt-2 items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 whitespace-nowrap bg-emerald-500 ${slot_duration === "0" ? 'hover:bg-emerald-600 focus:bg-emerald-700' : 'bg-emerald-300'} focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none`}
                        onClick={e => {
                            if (slot_duration === "0") {
                                e.preventDefault(); // Prevent link action
                                Swal.fire({
                                    title: "No Slot Available!",
                                    icon: "error"
                                });
                            }
                        }}
                        disabled={slot_duration === "0"}
                    >
                        Price $100
                    </Link>
                </div>
                {/*<!-- End Card with subtitle --> */}
            </div>
        </>
    );
};

export default Evening;