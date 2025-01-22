import { useContext } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../../providers/AuthProvider";

const BookedTrainer = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext);

    const { data: transactions = [] } = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const res = await axiosPublic.get('/save-payment-info');
            return res.data;
        }
    })

    return (
        <>
            {/*<!-- Component: Table with hover state --> */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border border-separate rounded border-slate-200">
                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Transaction ID</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Trainer Name</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Slot Timings</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Amount</th>
                        </tr>
                        {
                            transactions.filter(transaction => transaction.email === user?.email).map(transaction => (
                                <tr key={transaction._id} className="transition-colors duration-300 hover:bg-slate-50">
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{transaction.transactionId}</td>
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{transaction.trainerName}</td>
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{transaction.slotTiming}</td>
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{transaction.price}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {/*<!-- End Table with hover state --> */}
        </>
    );
};

export default BookedTrainer;
