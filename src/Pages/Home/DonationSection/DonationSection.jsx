import React from 'react';
import MyContainer from '../../../Components/MyContainer';

const DonationSection = () => {
    return (
        <section className="py-16">
            <MyContainer>
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Support Blood Care
                    </h2>
                    <p className="mb-6 opacity-80">
                        Your donation helps manage emergency blood services
                    </p>
                    <button className="btn btn-primary btn-lg">
                        Donate Funds
                    </button>
                </div>
            </MyContainer>
        </section>
    );
};

export default DonationSection;