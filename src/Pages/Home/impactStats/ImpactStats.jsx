import React from 'react';
import MyContainer from '../../../Components/MyContainer';

const ImpactStats = () => {
    return (
        <section className="py-16 bg-base-200">
            <MyContainer>
                
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {[
                            { title: "Total Donors", value: "10K+" },
                            { title: "Blood Requests", value: "3.2K+" },
                            { title: "Hospitals", value: "120+" },
                            { title: "Lives Saved", value: "8K+" },
                        ].map((item, i) => (
                            <div key={i} className="stat bg-base-100 rounded-xl shadow">
                                <div className="stat-title">{item.title}</div>
                                <div className="stat-value text-primary">{item.value}</div>
                            </div>
                        ))}
                    </div>
                
            </MyContainer>
        </section>
    );
};

export default ImpactStats;