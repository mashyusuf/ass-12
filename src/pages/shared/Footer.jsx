import logo from '../../assets/logo.jpg'; // Replace with your logo

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-900 to-blue-600 text-white">
            <div className="container mx-auto py-12 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-24">
                    {/* Left Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <img src={logo} alt="osudpotro" className="h-10 rounded-full" />
                            <div>
                                <h2 className="text-3xl font-bold">Yusuf House</h2>
                                <p className="text-sm text-gray-300">Your trusted partner in health</p>
                            </div>
                        </div>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-white hover:text-gray-400">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="text-white hover:text-gray-400">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="text-white hover:text-gray-400">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-white hover:text-gray-400">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                    {/* Right Section */}
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                        <div>
                            <h3 className="text-lg font-semibold">Quick Links</h3>
                            <ul className="mt-2">
                                <li><a href="#" className="hover:text-gray-400">About Us</a></li>
                                <li><a href="#" className="hover:text-gray-400">Terms and Conditions</a></li>
                                <li><a href="#" className="hover:text-gray-400">Refund and Return Policy</a></li>
                                <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-gray-400">Disclaimer</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Useful Links</h3>
                            <ul className="mt-2">
                                <li><a href="#" className="hover:text-gray-400">Buy Medicines Online</a></li>
                                <li><a href="#" className="hover:text-gray-400">Top 10 Pharmaceutical</a></li>
                                <li><a href="#" className="hover:text-gray-400">Contact us</a></li>
                                <li><a href="#" className="hover:text-gray-400">Blogs</a></li>
                                <li><a href="#" className="hover:text-gray-400">FAQ</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="text-sm text-center mt-8">
                    <p className="text-gray-300">Online Drug License: DC-22813 | DBID License: 384191730 | Trade License: TRAD/DNCC/048628/2022 | Model Pharmacy License: DC-21000</p>
                    <p className="text-gray-300">SSL Commerz Enabled</p>
                    <p className="text-gray-300">&copy; {new Date().getFullYear()} Yusuf House. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
