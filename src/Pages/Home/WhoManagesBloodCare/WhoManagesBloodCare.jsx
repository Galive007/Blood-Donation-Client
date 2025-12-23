import React from 'react';
import MyContainer from '../../../Components/MyContainer';

const WhoManagesBloodCare = () => {
    return (
        <section className="py-16 bg-base-200">
            <MyContainer>
                <div className="">
                    <h2 className="text-3xl font-bold text-center mb-10">
                        Who Manages Blood Care?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                role: "Donors",
                                desc: "Donate blood and save lives",
                            },
                            {
                                role: "Volunteers",
                                desc: "Verify requests and assist patients",
                            },
                            {
                                role: "Admins",
                                desc: "Ensure authenticity and safety",
                            },
                        ].map((item, i) => (
                            <div key={i} className="card bg-base-100 shadow-xl">
                                <div className="card-body text-center">
                                    <h3 className="card-title justify-center">
                                        {item.role}
                                    </h3>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </MyContainer>
        </section>
    );
};

export default WhoManagesBloodCare;