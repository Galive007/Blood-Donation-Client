import React from 'react';
import MyContainer from '../../../Components/MyContainer';

const RecentRequests = () => {
    return (
        <section className="py-16">
            <MyContainer>
                <div className="">
                    <h2 className="text-3xl font-bold text-center mb-10">
                        Recent Blood Requests
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h3 className="card-title text-primary">
                                        A+ Blood Needed
                                    </h3>
                                    <p>📍 Dhaka Medical College</p>
                                    <p>⏰ Urgent</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary btn-sm">
                                            Donate Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </MyContainer>
        </section>
    );
};

export default RecentRequests;