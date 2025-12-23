import React from 'react';
import MyContainer from '../../../Components/MyContainer';

const HowItWorks = () => {
    return (
        <section className="py-16">
            <MyContainer>
                <div className="">
                    <h2 className="text-3xl font-bold text-center mb-10">
                        How It Works
                    </h2>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            "Register as Donor",
                            "Request Blood",
                            "Confirm Donation",
                            "Save Lives",
                        ].map((step, i) => (
                            <div key={i} className="card bg-base-100 shadow-xl text-center">
                                <div className="card-body">
                                    <div className="text-4xl font-bold text-primary">
                                        {i + 1}
                                    </div>
                                    <h3 className="text-lg font-semibold">{step}</h3>
                                    <p className="text-sm opacity-70">
                                        Simple and secure donation process
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </MyContainer>
        </section>
    );
};

export default HowItWorks;