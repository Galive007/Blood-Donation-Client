import React from 'react';
import MyContainer from '../../../Components/MyContainer';

const Testimonials = () => {
    return (
        <section className="py-16 bg-base-200">
            <MyContainer>
                <div className="">
                <h2 className="text-3xl font-bold text-center mb-10">
                    What People Say
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <p>
                                    “Blood Care helped my family during an emergency.
                                    Truly lifesaving.”
                                </p>
                                <h4 className="font-semibold mt-4">
                                    — User {i}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            </MyContainer>
        </section>
    );
};

export default Testimonials;