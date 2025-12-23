import React from 'react';
import Orb from './Orb/Orb';
import Banner from '../../Components/Banner/Banner';
import ContactUs from '../../Components/ContactUs/ContactUs';
import ImpactStats from './impactStats/impactStats';
import HowItWorks from './HowItWorks/HowItWorks';
import WhyDonateBlood from './WhyDonateBlood/WhyDonateBlood';
import RecentRequests from './RecentRequests/RecentRequests';
import WhoManagesBloodCare from './WhoManagesBloodCare/WhoManagesBloodCare';
import DonationSection from './DonationSection/DonationSection';
import Testimonials from './Testimonials/Testimonials';
import Partners from './Partners/Partners';
import FinalCTA from './FinalCTA/FinalCTA';
import Marquee from "react-fast-marquee";


const Home = () => {


    const hospitals = [
        "Dhaka Medical College Hospital",
        "Bangabandhu Sheikh Mujib Medical University",
        "Square Hospitals Ltd.",
        "United Hospital Limited",
        "Apollo Hospitals Dhaka",
        "Ibn Sina Hospital",
        "Popular Diagnostic Centre",
        "Evercare Hospital Dhaka"
    ];




    return (
        <div className="relative min-h-screen w-full overflow-hidden">

            {/* 🔹 Background Effect */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="w-full h-[500px] relative">
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

            <div>

                {/* ================= Impact Stats ================= */}
                <div data-aos="fade-up" data-aos-duration="1000">
                    <ImpactStats />
                </div>

                {/* ================= How It Works ================= */}
                <div data-aos="fade-right" data-aos-duration="1000">
                    <HowItWorks />
                </div>

                {/* ================= Why Donate Blood ================= */}
                <div data-aos="fade-left" data-aos-duration="1000">
                    <WhyDonateBlood />
                </div>

                {/* ================= Recent Requests ================= */}
                <div data-aos="zoom-in" data-aos-duration="900">
                    <RecentRequests />
                </div>

                {/* ================= Volunteer & Admin ================= */}
                <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                    <WhoManagesBloodCare />
                </div>

                {/* ================= Donation Section ================= */}
                <div data-aos="zoom-in-up" data-aos-duration="1000">
                    <DonationSection />
                </div>

                {/* ================= Testimonials ================= */}
                <div data-aos="fade-up" data-aos-delay="150" data-aos-duration="900">
                    <Testimonials />
                </div>

                {/* ================= Partners ================= */}
                <div data-aos="fade-up" data-aos-duration="800" className="py-16">
                    <h1 className="text-center text-3xl font-bold mb-10">
                        Partners
                    </h1>

                    <Marquee pauseOnHover speed={40}>
                        <div className="flex flex-wrap justify-center gap-6">
                            {hospitals.map((hospital, i) => (
                                <div
                                    key={i}
                                    className="badge badge-outline mr-3 badge-lg p-6 text-sm md:text-base"
                                >
                                    {hospital}
                                </div>
                            ))}
                        </div>
                    </Marquee>
                </div>

                {/* ================= Final CTA ================= */}
                <div data-aos="zoom-in" data-aos-duration="1000">
                    <FinalCTA />
                </div>

                {/* ================= Contact ================= */}
                <div data-aos="fade-up" data-aos-duration="900">
                    <ContactUs />
                </div>

            </div>


        </div>
    );
};

export default Home;