import React from 'react';
import MyContainer from './MyContainer';
import { Link } from 'react-router';
import logo from '../assets/Logos/Local_Food_Lovers_Network_2-removebg-preview.png'
import { FaFacebook } from "react-icons/fa";
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <MyContainer>
            <footer className=" border-t">
                <div className="max-w-8xl mx-auto px-4 py-8 grid grid-cols-1 text-center md:text-start md:grid-cols-4 gap-6">
                    <Link to='/'>
                        <div className='flex justify-center md:justify-start items-center gap-2'>
                            <img src={logo} alt="" className='w-1/5 md:w-1/6 h-3/5 rounded-full' />
                            <div className='hidden md:block'>
                                <div className="text-sm md:text-lg text-secondary font-semibold">Local Food Lovers</div>
                                <div className="text-xs text-primary
                                ">Discover & Share Local Food Reviews</div>
                            </div>
                        </div>
                    </Link>

                    <div>
                        <div className="font-semibold mb-2 text-secondary">Explore</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/reviews">All Reviews</Link></li>
                            <li><Link to="/events">Events</Link></li>
                        </ul>
                    </div>
                    <div>
                        <div className="font-semibold mb-2 text-secondary">Policy</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li><Link to="/events">Blogs</Link></li>
                            <li><Link to="/">Terms & conditions</Link></li>
                            <li><Link to="/reviews">Our Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <div className="font-semibold mb-2 text-secondary">Follow Us</div>
                        <div className="flex justify-center md:justify-start gap-3 text-xl">
                            
                            <div className='border-2 border-primary rounded-full p-2'><a href="#" aria-label="facebook" className='text-primary'><Facebook /></a></div>
                            <div className='border-2 border-primary rounded-full p-2'><a href="#" aria-label="facebook" className='text-primary'><Instagram /></a></div>
                            <div className='border-2 border-primary rounded-full p-2'><a href="#" aria-label="facebook" className='text-primary'><Linkedin /></a></div>
                            {/* <a href="#" aria-label="instagram">🟣</a>
                            <a href="#" aria-label="twitter">🔷</a> */}
                        </div>
                        <div className="text-xs text-gray-400 mt-4">© {new Date().getFullYear()} Local Food Lovers Network</div>
                    </div>
                </div>
            </footer>
        </MyContainer>
    )
};

export default Footer;