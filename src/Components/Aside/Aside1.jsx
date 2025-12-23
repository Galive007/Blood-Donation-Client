import React from 'react';
import { LayoutDashboard, Users, Package, Truck, BarChart3, Settings, LogOut, House, GitPullRequestArrow, SquareChartGantt } from "lucide-react";
import { NavLink, useNavigate } from 'react-router';
import Logo from '../Logo';
import useAuth from '../../Hooks/useAuth';


const Aside1 = () => {
    const { logOut, role, roleLoading } = useAuth()
    const navigate = useNavigate()
    //console.log(role);
    
    const logout = () => {
        //console.log('clicked');
        logOut()
        navigate('/')

    }
    if (roleLoading) {
        return <div className="w-64 bg-slate-900 p-4 text-slate-400">Loading...</div>;
    }
    const menu = [
        { name: "Home", icon: House, path: "/", roles: ["admin", "donor","volunteer"] },
        { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard", roles: ["admin", "donor","volunteer"] },
        { name: "Profile", icon: Users, path: "/dashboard/profile", roles: ["admin", "donor","volunteer"] },
        { name: "Add Request", icon: GitPullRequestArrow, path: "/dashboard/add-request", roles: ["admin", "donor"] },
        { name: "Manage Request", icon: SquareChartGantt, path: "/dashboard/manage-request", roles: ["admin","volunteer"] },
        { name: "My Request", icon: SquareChartGantt, path: "/dashboard/my-request", roles: ["donor","volunteer"] },
        { name: "All Users", icon: Users, path: "/dashboard/all-users", roles: ["admin"] },
        
        { name: "Orders", icon: Package, path: "/admin/orders" },
        { name: "Delivery", icon: Truck, path: "/admin/delivery" },
        { name: "Reports", icon: BarChart3, path: "/admin/reports" },
    ];
    return (
        <div>
            <aside className="md:h-screen h-full w-64 bg-slate-900 text-slate-100 flex flex-col shadow-xl">
                {/* Logo */}
                <div className="h-18 flex items-center px-6 border-b border-slate-800 gap-2">
                    <Logo></Logo>
                    <h1 className="text-xl font-bold tracking-wide">{role?.toUpperCase()} Panel</h1>

                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {menu
                        .filter(item => item.roles?.includes(role))
                        .map(({ name, icon: Icon , path }) => (
                            
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
                        to="/dashboard/settings"
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