import React from 'react';

const Aside = () => {
    return (
        <div>
            <aside className="h-screen w-64 bg-slate-900 text-slate-100 flex flex-col shadow-xl">
                {/* Logo / Brand */}
                <div className="h-16 flex items-center px-6 border-b border-slate-800">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold">A</div>
                    <span className="ml-3 text-lg font-semibold tracking-wide">Admin Panel</span>
                </div>

                {/* Menu */}
                <div className="flex-1 px-4 py-6 space-y-2">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-600 text-white">
                        <div className="w-4 h-4 rounded bg-white/80" />
                        <span className="text-sm font-medium">Dashboard</span>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800">
                        <div className="w-4 h-4 rounded bg-slate-400" />
                        <span className="text-sm">Users</span>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800">
                        <div className="w-4 h-4 rounded bg-slate-400" />
                        <span className="text-sm">Orders</span>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800">
                        <div className="w-4 h-4 rounded bg-slate-400" />
                        <span className="text-sm">Delivery</span>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800">
                        <div className="w-4 h-4 rounded bg-slate-400" />
                        <span className="text-sm">Reports</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-4 py-4 border-t border-slate-800 space-y-2">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800">
                        <div className="w-4 h-4 rounded bg-slate-400" />
                        <span className="text-sm">Settings</span>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10">
                        <div className="w-4 h-4 rounded bg-red-400" />
                        <span className="text-sm">Logout</span>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default Aside;