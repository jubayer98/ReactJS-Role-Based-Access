import { useEffect } from "react"
import Glide from "@glidejs/glide"
import { Link } from "react-router-dom";

const Banner = () => {
    useEffect(() => {
        const slider = new Glide(".glide-01", {
            type: "carousel",
            focusAt: "center",
            perView: 3,
            autoplay: 3000,
            animationDuration: 700,
            gap: 24,
            classNames: {
                nav: {
                    active: "[&>*]:bg-wuiSlate-700",
                },
            },
            breakpoints: {
                1024: {
                    perView: 2,
                },
                640: {
                    perView: 1,
                },
            },
        }).mount()

        return () => {
            slider.destroy()
        }
    }, [])

    return (
        <>
            {/*<!-- Component: Carousel with controls inside --> */}
            <div className="glide-01 relative w-full">
                {/*    <!-- Slides --> */}
                <div className="overflow-hidden" data-glide-el="track">
                    <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
                        <li>
                            <img
                                src="https://i.ibb.co/6Fk70W1/banner-img-1.webp"
                                className="m-auto max-h-full w-full max-w-full"
                            />
                            {/*<!-- Component: Large link button with trailing icon  --> */}
                            <button className="inline-flex w-full h-12 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-50 hover:text-emerald-600 focus:bg-emerald-100 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent">
                                <Link to="/class-details/678c0d014608c7294b9ad8f7"><span>Learn More About BODY PUMP</span></Link>
                                <span className="relative only:-mx-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        role="graphics-symbol"
                                        aria-labelledby="title-78 desc-78"
                                    >
                                        <title id="title-78">Icon title</title>
                                        <desc id="desc-78">A more detailed description of the icon</desc>
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </span>
                            </button>
                            {/*<!-- End Large link button with trailing icon  --> */}
                        </li>
                        <li>
                            <img
                                src="https://i.ibb.co/xz3FnV7/banner-img-2.webp"
                                className="m-auto max-h-full w-full max-w-full"
                            />
                            {/*<!-- Component: Large link button with trailing icon  --> */}
                            <button className="inline-flex w-full h-12 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-50 hover:text-emerald-600 focus:bg-emerald-100 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent">
                                <Link to="/class-details/678c0d254608c7294b9ad8f8"><span>Learn More About SPIN</span></Link>
                                <span className="relative only:-mx-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        role="graphics-symbol"
                                        aria-labelledby="title-78 desc-78"
                                    >
                                        <title id="title-78">Icon title</title>
                                        <desc id="desc-78">A more detailed description of the icon</desc>
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </span>
                            </button>
                            {/*<!-- End Large link button with trailing icon  --> */}
                        </li>
                        <li>
                            <img
                                src="https://i.ibb.co/D5c60b1/banner-img-3.webp"
                                className="m-auto max-h-full w-full max-w-full"
                            />
                            {/*<!-- Component: Large link button with trailing icon  --> */}
                            <button className="inline-flex w-full h-12 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-50 hover:text-emerald-600 focus:bg-emerald-100 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent">
                                <Link to="/class-details/678c0cdc4608c7294b9ad8f6"><span>Learn More About YOGA</span></Link>
                                <span className="relative only:-mx-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        role="graphics-symbol"
                                        aria-labelledby="title-78 desc-78"
                                    >
                                        <title id="title-78">Icon title</title>
                                        <desc id="desc-78">A more detailed description of the icon</desc>
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </span>
                            </button>
                            {/*<!-- End Large link button with trailing icon  --> */}
                        </li>
                        <li>
                            <img
                                src="https://i.ibb.co/J2X8zv3/banner-img-4.webp"
                                className="m-auto max-h-full w-full max-w-full"
                            />
                            {/*<!-- Component: Large link button with trailing icon  --> */}
                            <button className="inline-flex w-full h-12 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-50 hover:text-emerald-600 focus:bg-emerald-100 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent">
                                <Link to="/class-details/678c0aa94608c7294b9ad8f5"><span>Learn More About HIIT</span></Link>
                                <span className="relative only:-mx-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        role="graphics-symbol"
                                        aria-labelledby="title-78 desc-78"
                                    >
                                        <title id="title-78">Icon title</title>
                                        <desc id="desc-78">A more detailed description of the icon</desc>
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </span>
                            </button>
                            {/*<!-- End Large link button with trailing icon  --> */}
                        </li>
                    </ul>
                </div>
                {/*    <!-- Controls --> */}
                <div
                    className="absolute left-0 top-1/2 flex h-0 w-full items-center justify-between px-4 "
                    data-glide-el="controls"
                >
                    <button
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
                        data-glide-dir="<"
                        aria-label="prev slide"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <title>prev slide</title>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                            />
                        </svg>
                    </button>
                    <button
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
                        data-glide-dir=">"
                        aria-label="next slide"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <title>next slide</title>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/Glide.js/3.0.2/glide.js"></script>
            {/*<!-- End Carousel with controls inside --> */}
        </>
    );
};

export default Banner;