import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { House } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import useAuth from '../Hooks/useAuth';
import Logo from './Logo';
import MyContainer from './MyContainer';
import MyLink from './MyLink';

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const { user, logOut } = useAuth()
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");


  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);


  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };


    const links = <div className='flex flex-col lg:flex-row lg:items-center lg:justify-center *:mr-3'>
        <MyLink to='/' className='text-lg'>Home</MyLink>
        <MyLink to='all-request' className='text-lg'>All Request</MyLink>
        <MyLink to='search' className='text-lg'>Search</MyLink>
        <MyLink to='donate' className='text-lg'>Donate</MyLink>

    </div>
    const logout = () => {
        logOut()
    }

    return (
        <MyContainer>

            <div className="navbar my-3 bg-transparent">
                <div className="navbar-start">
                    <div className="dropdown text-secondary">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content  rounded-box z-20 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to='/'>
                        <div className='flex items-center gap-2'>
                            {/* <img src={logo} alt="" className='w-2/5 md:w-1/6
                            h-3/5 rounded-full' /> */}
                            <Logo></Logo>
                            <div className='hidden md:block'>
                                <div className="text-sm md:text-xl lg:text-3xl text-primary font-bold">
                                    <h1>Blood Care</h1>
                                </div>
                                <div className="text-xs gradient-text
                                ">
                                    <h4>
                                        A Platform for Life-Saving Donations
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </Link>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <input
                        onChange={(e) => handleTheme(e.target.checked)}
                        type="checkbox"
                        defaultChecked={localStorage.getItem('theme') === "dark"}
                        className="toggle mr-3" />
                    <nav className="flex items-center gap-4">
                        {!user ? (
                            <div className="flex items-center gap-2">
                                <Link to="/login" className="px-3 py-2 rounded-full gradient-animate-btn ">Login</Link>
                                <Link to="/register" className="px-3 py-2 rounded-full
                                gradient-animate-btn">Register</Link>
                            </div>
                        ) : (
                            <div className="relative">

                                <div className='flex items-center gap-2'>
                                    <Link to='/dashboard' className="btn">Dashboard</Link>

                                    <button onClick={() => setOpen(o => !o)} className="w-10 h-10 rounded-full overflow-hidden border-2 border-secondary">
                                        <img src={user.photoURL || 'https://source.unsplash.com/120x120/?face'} alt="user" className="w-full h-full object-cover" />
                                    </button>
                                </div>
                                {open && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md p-2 z-40 flex flex-col shadow-2xl">
                                        <h1 className='font-semibold  text-xl text-center'>{user?.displayName}</h1>
                                        <MyLink to='/dashboard/profile' className=' text-center text-primary'>
                                            Profile
                                        </MyLink>
                                        
                                        <MyLink to='/dashboard/settings' className='text-center text-primary'>
                                            Settings
                                        </MyLink>
                                        <button onClick={() => { logout(); setOpen(false) }} className="w-full gradient-animate-btn rounded-2xl text-primary">Logout</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </nav>
                </div>

            </div>
        </MyContainer>




    );
};

export default Navbar;



{/* <header className="bg-white shadow">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-yellow-400 flex items-center justify-center text-white font-bold">LF</div>
                    <div>
                        <Link to="/" className="text-lg font-semibold">Local Food Lovers</Link>
                        <div className="text-xs text-gray-500">Discover & share local food gems</div>
                    </div>
                </div>
                <nav className="flex items-center gap-4">
                    <Link to="/" className="text-sm">Home</Link>
                    <Link to="/reviews" className="text-sm">All Reviews</Link>
                    <Link to="/events" className="text-sm">Events</Link>
                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link to="/login" className="px-3 py-2 border rounded-full text-sm">Login</Link>
                            <Link to="/register" className="px-3 py-2 bg-red-500 text-white rounded-full text-sm">Register</Link>
                        </div>
                    ) : (
                        <div className="relative">
                            <button onClick={() => setOpen(o => !o)} className="w-10 h-10 rounded-full overflow-hidden border-2">
                                <img src={user.photo || 'https://source.unsplash.com/80x80/?face'} alt="user" className="w-full h-full object-cover" />
                            </button>
                            {open && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg p-2 z-10">
                                    <Link to="/add-review" className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">Add Review</Link>
                                    <Link to="/my-reviews" className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">My Reviews</Link>
                                    <Link to="/my-favorites" className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">My Favorites</Link>
                                    <button onClick={() => { logout(); setOpen(false) }} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded">Logout</button>
                                </div>
                            )}
                        </div>
                    )}
                </nav>
            </div>
        </header> */}