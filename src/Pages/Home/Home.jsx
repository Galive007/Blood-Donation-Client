import React from 'react';
import Orb from './Orb/Orb';
import Banner from '../../Components/Banner/Banner';
import ContactUs from '../../Components/ContactUs/ContactUs';


const Home = () => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">

            {/* 🔹 Background Effect */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="w-full h-[500px] relativ">
                    <Orb
                        hoverIntensity={0.5}
                        rotateOnHover={true}
                        hue={0}
                        forceHoverState={false}
                    />
                </div>
            </div>

            {/* 🔹 Content */}
            <div className="relative z-10 flex items-center justify-center p-15 md:p-30">
                <Banner></Banner>
            </div>
                <ContactUs></ContactUs>

        </div>
    );
};

export default Home;