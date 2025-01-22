const AboutSection = () => {
    return (
        <>
            <h2 className="text-center font-bold text-emerald-500 mt-5 text-2xl">ABOUT US</h2>
            <hr className="mb-5 border-emerald-500" />
            {/*<!-- Component: Icon accordion --> */}
            <section className="w-full divide-y divide-slate-200 rounded">
                <details className="group p-4" open>
                    <summary className="relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6  shrink-0  stroke-emerald-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            aria-labelledby="title-ac05 desc-ac05"
                        >
                            <title id="title-ac05">Our Purpose</title>
                            <desc id="desc-ac05">Icon symbolizing the purpose of the company</desc>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z"
                            />
                        </svg>
                        What is our mission?
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            aria-labelledby="title-ac06 desc-ac06"
                        >
                            <title id="title-ac06">Open icon</title>
                            <desc id="desc-ac06">Icon representing the state of the summary</desc>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                    </summary>
                    <p className="mt-4 text-slate-500">
                        Our mission is to empower individuals through fitness by providing accessible, engaging, and effective workout tools. We are committed to helping people lead healthier, more fulfilling lives, regardless of their fitness background.
                    </p>
                </details>

                <details className="group p-4">
                    <summary className="relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6  shrink-0  stroke-emerald-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            aria-labelledby="title-ac07 desc-ac07"
                        >
                            <title id="title-ac07">Core Values</title>
                            <desc id="desc-ac07">Icon that represents the values of our company</desc>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                            />
                        </svg>
                        What values drive us?
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            aria-labelledby="title-ac08 desc-ac08"
                        >
                            <title id="title-ac08">Open icon</title>
                            <desc id="desc-ac08">Icon representing the state of the summary</desc>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                    </summary>
                    <p className="mt-4 text-slate-500">
                        At our core, we believe in inclusivity, innovation, and integrity. We strive to create an environment where fitness is accessible to all, innovation in our products and services is key, and we are honest and transparent in all that we do.
                    </p>
                </details>

                <details className="group p-4">
                    <summary className="relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6  shrink-0  stroke-emerald-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            aria-labelledby="title-ac09 desc-ac09"
                        >
                            <title id="title-ac09">Our Vision</title>
                            <desc id="desc-ac09">Icon that describes the vision of our company</desc>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                            />
                        </svg>
                        What is our long-term vision?
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            aria-labelledby="title-ac10 desc-ac10"
                        >
                            <title id="title-ac10">Open icon</title>
                            <desc id="desc-ac10">Icon representing the state of the summary</desc>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                    </summary>
                    <p className="mt-4 text-slate-500">
                        We aim to become a global leader in fitness innovation by continuously adapting to emerging trends and technologies. Our goal is to make fitness a central part of people’s lives, with solutions tailored to individual needs and preferences.
                    </p>
                </details>

                <details className="group p-4">
                    <summary className="relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6  shrink-0  stroke-emerald-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            aria-labelledby="title-ac11 desc-ac11"
                        >
                            <title id="title-ac11">Get Involved</title>
                            <desc id="desc-ac11">Icon symbolizing how you can help</desc>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                            />
                        </svg>
                        How can I contribute to Fitness Tracker?
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            aria-labelledby="title-ac12 desc-ac12"
                        >
                            <title id="title-ac12">Open icon</title>
                            <desc id="desc-ac12">Icon representing the state of the summary</desc>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                    </summary>
                    <p className="mt-4 text-slate-500">
                        We welcome feedback and contributions from the community! You can help us improve Fitness Tracker by sharing your thoughts on our Discord channel or by suggesting new features and improvements.
                    </p>
                </details>
            </section>
            {/*<!-- End Icon accordion --> */}
        </>

    );
};

export default AboutSection;