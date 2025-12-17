import React from 'react';
import { LayoutDashboard, Users, Package, Truck, BarChart3, Settings, LogOut, House } from "lucide-react";
import { NavLink, useNavigate } from 'react-router';
import Logo from '../Logo';
import useAuth from '../../Hooks/useAuth';



const Aside1 = () => {
    const {logOut}=useAuth()
    const navigate=useNavigate()

    const logout=()=>{
        // console.log('clicked');
        logOut()
        navigate('/')
        
    }
    const menu = [
        { name: "Home", icon: House, path: "/" },
        { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { name: "AddRequest", icon: Users, path: "/dashboard/add-request" },
        { name: "Users", icon: Users, path: "/admin/users" },
        { name: "Orders", icon: Package, path: "/admin/orders" },
        { name: "Delivery", icon: Truck, path: "/admin/delivery" },
        { name: "Reports", icon: BarChart3, path: "/admin/reports" },
    ];
    return (
        <div>
            <aside className="h-screen w-64 bg-slate-900 text-slate-100 flex flex-col shadow-xl">
                {/* Logo */}
                <div className="h-18 flex items-center px-6 border-b border-slate-800 gap-2">
                    <Logo></Logo>
                    <h1 className="text-xl font-bold tracking-wide">Admin Panel</h1>
                    
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {menu.map(({ name, icon: Icon , path }) => (
                        <NavLink
                            key={name}
                            to={path}
                            end={path === "/" || path === "/dashboard"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium 
               ${isActive ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-800"}`
                            }
                        >
                            <Icon size={18} />
                            <span>{name}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="px-4 py-4 border-t border-slate-800">
                    <NavLink
                        to="/admin/settings"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
                    >
                        <Settings size={18} />
                        Settings
                    </NavLink>
                    <button onClick={logout} className="mt-2 w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10">
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>
        </div>
    );
};

export default Aside1;