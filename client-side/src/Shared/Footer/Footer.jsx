import logo from '../../../public/favicon.svg';

const Footer = () => {
    return (
        <>
            {/*    <!-- Component: Footer with Three Columns and Sub Footer --> */}
            <footer className="w-full text-slate-500">
                {/*      <!-- Main footer --> */}
                <div className="border-t border-slate-200 bg-slate-100 pt-16 pb-12 text-sm">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
                            <nav
                                className="col-span-2 md:col-span-4 lg:col-span-4"
                                aria-labelledby="footer-product-3-sub"
                            >
                                <h3
                                    className="mb-6 text-base font-medium text-slate-700"
                                    id="footer-product-3-sub"
                                >
                                    Address
                                </h3>
                                <ul>
                                    <li className="mb-2 leading-6">
                                        <a
                                            href="javascript:void(0)"
                                            className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                                        >
                                            21/4 Shantibari Road, Dhaka, Bangladesh
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                            <nav
                                className="col-span-2 md:col-span-4 lg:col-span-4"
                                aria-labelledby="footer-about-3-sub"
                            >
                                <h3
                                    className="mb-6 text-base font-medium text-slate-700"
                                    id="footer-about-3-sub"
                                >
                                    Hotline
                                </h3>
                                <ul>
                                    <li className="mb-2 leading-6">
                                        <a
                                            href="javascript:void(0)"
                                            className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                                        >
                                            910 023 4481
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                            <nav
                                className="col-span-2 md:col-span-4 lg:col-span-4"
                                aria-labelledby="footer-get-in-touch-3-sub"
                            >
                                <h3
                                    className="mb-6 text-base font-medium text-slate-700"
                                    id="footer-get-in-touch-3-sub"
                                >
                                    Follow Us
                                </h3>
                                <ul>
                                    <li className="mb-2 leading-6">
                                        <a
                                            href="https://www.facebook.com/"
                                            className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                                        >
                                            Facebook
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                {/*      <!-- Sub Footer --> */}
                <div className="border-t border-slate-200 bg-slate-100 py-4 text-sm">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-4 items-center gap-6 md:grid-cols-8 lg:grid-cols-12">
                            
                        <a className='col-span-1 flex items-center gap-2 whitespace-nowrap text-base font-medium leading-6 focus:outline-none md:col-span-4 lg:col-span-6' href="/">
                        <img src={logo} alt="Company Logo" className='w-8' />
                        Fitness Tracker || Copyright 2025
                        </a>
                            <nav
                                className="col-span-3 md:col-span-4 lg:col-span-6"
                                aria-labelledby="subfooter-links"
                            >
                                <h3 className="sr-only" id="subfooter-links">
                                    Get in touch
                                </h3>
                                <ul className="flex flex-wrap items-center justify-end gap-2 lg:gap-4">
                                    <li className="leading-6">
                                        <a
                                            href="https://en.wikipedia.org/wiki/Terms_of_service"
                                            className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                                        >
                                            T&C
                                        </a>
                                    </li>
                                    <li className="leading-6">
                                        <a
                                            href="https://en.wikipedia.org/wiki/Privacy"
                                            className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                                        >
                                            Privacy
                                        </a>
                                    </li>
                                    <li className="leading-6">
                                        <a
                                            href="https://en.wikipedia.org/wiki/HTTP_cookie"
                                            className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                                        >
                                            Cookies
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </footer>
            {/*    <!-- End Footer with Three Columns and Sub Footer --> */}
        </>
    );
};

export default Footer;