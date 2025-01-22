import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const Balance = () => {

    const axiosPublic = useAxiosPublic();

    const { data: transactions = [] } = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const res = await axiosPublic.get('/save-payment-info');
            return res.data;
        }
    })

    const totalPrice = transactions.reduce((sum, transaction) => sum + transaction.price, 0);

    return (
        <>
            {/*<!-- Component: Table with hover state --> */}
            <div className="w-full overflow-x-auto">
                <h2 className="text-2xl text-emerald-500 font-semibold mb-2 text-center">TOTAL AMOUNT: ${totalPrice}</h2>
                <table className="w-full text-left border border-separate rounded border-slate-200">
                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Transaction ID</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Member Name</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Email Address</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Amount</th>
                        </tr>
                        {
                            transactions.map(transaction => (
                                <tr key={transaction._id} className="transition-colors duration-300 hover:bg-slate-50">
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{transaction.transactionId}</td>
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{transaction.userName}</td>
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{transaction.email}</td>
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

export default Balance;