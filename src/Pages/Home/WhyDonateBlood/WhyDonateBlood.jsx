import React from 'react';
import MyContainer from '../../../Components/MyContainer';

const WhyDonateBlood = () => {
    return (
        <section className="py-16 bg-base-200">
            <MyContainer>
                <div className="">
                    <h2 className="text-3xl font-bold text-center mb-10">
                        Why Donate Blood?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            "One donation can save 3 lives",
                            "Free health checkup",
                            "Safe & doctor approved",
                            "Emergency support",
                            "Community responsibility",
                            "Proud to help others",
                        ].map((item, i) => (
                            <div key={i} className="alert bg-base-100 shadow">
                                <span>❤️ {item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </MyContainer>
        </section>
    );
};

export default WhyDonateBlood;