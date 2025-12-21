

import { Link } from "react-router";


const Banner = () => {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Donate Blood, Save Lives ❤️
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Join our community of lifesavers and help people in need by donating blood.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/register" className="btn btn-outline btn-lg hover:text-red-700 ">
            Join as a Donor
          </Link>
          <Link to="/search" className="btn btn-outline btn-lg hover:text-red-700">
            Search Bloods
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
