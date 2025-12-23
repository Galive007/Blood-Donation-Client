import React from 'react';
import { Link } from 'react-router';

const FinalCTA = () => {
    return (
        <section className="py-20 bg-primary text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Blood Can Save a Life Today
            </h2>
            <div className="flex justify-center gap-4">
                <Link to={'/login'} className="btn btn-outline text-white">
                    Become a Donor
                </Link>
                <button className="btn bg-white text-primary">
                    Request Blood
                </button>
            </div>
        </section>
    );
};

export default FinalCTA;