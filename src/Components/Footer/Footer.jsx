import React from 'react';
import { Link } from 'react-router';
import Logo from '../Logo';

const Footer = () => {
    return (
        <footer className="">
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* Brand */}
                <div>
                    <div className='flex items-center gap-3 mb-3'>
                        <Logo></Logo>
                        <h3 className="text-2xl font-bold mb-3">Blood Care</h3>
                    </div>
                    <p className="text-sm">
                        A platform connecting blood donors with people in need.
                        Together, we save lives.
                    </p>
                </div>

                {/* Useful Links */}
                <div>
                    <h4 className="font-semibold mb-3">Useful Links</h4>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:underline">Home</Link></li>
                        <li><Link to="/search" className="hover:underline">Search Donors</Link></li>
                        <li><Link to="/register" className="hover:underline">Become a Donor</Link></li>
                        <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="font-semibold mb-3">Contact</h4>
                    <p>📞 +880 1768 509 351</p>
                    <p>📧 support@bloodcare.com</p>
                </div>
            </div>

            <div className="border-t text-center py-4 text-sm">
                © {new Date().getFullYear()} BloodCare. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;