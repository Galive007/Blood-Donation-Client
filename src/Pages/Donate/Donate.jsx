import React from 'react';
import MyContainer from '../../Components/MyContainer';
import { useAxios } from '../../Hooks/useAxios';
import useAuth from '../../Hooks/useAuth';
import LightRays from './LightRays/LightRays';

const Donate = () => {

  const axiosInstance = useAxios()
  const { user } = useAuth()



  const handleCheckOut = (e) => {
    e.preventDefault()


    const donarEmail = user?.email
    const donarName = user?.displayName
    const donateAmount = e.target.donateAmount.value

    const formData = {
      donarEmail, donateAmount, donarName
    }
    console.log(formData);

    axiosInstance.post('/create-payment-checkout', formData)
      .then(res => {
        console.log(res.data);
        window.location.href = res.data.url
      })
  }
  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* 🔹 Background Layer */}
      <div className="absolute inset-0 z-0 min-h-screen pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        />
      </div>

      {/* 🔹 Content Layer */}
      <div className="relative z-10">
        <MyContainer>
          <div className="flex justify-center items-center min-h-screen">
            <form
              onSubmit={handleCheckOut}
              className="flex gap-3 backdrop-blur-md p-6 rounded-xl"
            >
              <input
                type="number"
                name="donateAmount"
                placeholder="Donate For Helpless People"
                className="input w-auto md:w-[450px]"
                required
              />
              <button className="btn btn-primary" type="submit">
                Donate
              </button>
            </form>
          </div>
        </MyContainer>
      </div>

    </div>
  );
};

export default Donate;