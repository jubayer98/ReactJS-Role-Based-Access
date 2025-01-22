const FeaturedSection = () => {
    return (
        <>
        <h2 className="text-center font-bold text-emerald-500 mt-5 text-2xl">OUR FEATURES</h2>
        <hr className="mb-5 border-emerald-500" />
            <div className="flex justify-between gap-4">
                {/*<!-- Component: Card with icon --> */}
                <div className="overflow-hidden text-center bg-white rounded shadow-md text-slate-500 shadow-slate-200">
                    {/*  <!-- Icon --> */}
                    <figure className="p-6 pb-0">
                    </figure>
                    {/*  <!-- Body--> */}
                    <div className="p-6">
                        <h3 className="mb-4 text-xl font-medium text-emerald-500">Fast Performance</h3>
                        <p>
                            Experience lightning-fast load times with optimized resources and minimal latency.
                        </p>
                    </div>
                </div>
                {/*<!-- End Card with icon --> */}
                {/*<!-- Component: Card with icon --> */}
                <div className="overflow-hidden text-center bg-white rounded shadow-md text-slate-500 shadow-slate-200">
                    {/*  <!-- Icon --> */}
                    <figure className="p-6 pb-0">
                    </figure>
                    {/*  <!-- Body--> */}
                    <div className="p-6">
                        <h3 className="mb-4 text-xl font-medium text-emerald-500">Secure Payments</h3>
                        <p>
                            We ensure the highest level of security for all your transactions with top-notch encryption.
                        </p>
                    </div>
                </div>
                {/*<!-- End Card with icon --> */}
                {/*<!-- Component: Card with icon --> */}
                <div className="overflow-hidden text-center bg-white rounded shadow-md text-slate-500 shadow-slate-200">
                    {/*  <!-- Icon --> */}
                    <figure className="p-6 pb-0">
                    </figure>
                    {/*  <!-- Body--> */}
                    <div className="p-6">
                        <h3 className="mb-4 text-xl font-medium text-emerald-500">Easy Customization</h3>
                        <p>
                            Tailor your experience to meet your specific needs with our customizable features.
                        </p>
                    </div>
                </div>
                {/*<!-- End Card with icon --> */}
                {/*<!-- Component: Card with icon --> */}
                <div className="overflow-hidden text-center bg-white rounded shadow-md text-slate-500 shadow-slate-200">
                    {/*  <!-- Icon --> */}
                    <figure className="p-6 pb-0">
                    </figure>
                    {/*  <!-- Body--> */}
                    <div className="p-6">
                        <h3 className="mb-4 text-xl font-medium text-emerald-500">24/7 Support</h3>
                        <p>
                            Get assistance anytime you need it with our around-the-clock customer service team.
                        </p>
                    </div>
                </div>
                {/*<!-- End Card with icon --> */}
            </div>
        </>
    );
};

export default FeaturedSection;