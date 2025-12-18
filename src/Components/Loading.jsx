import React from 'react';
import { Circles } from 'react-loader-spinner';
import MyContainer from './MyContainer';


const Loading = () => {
    return (
        <MyContainer>
            <div className='flex justify-center  my-[250px] max-h-screen'>
                <Circles
                    height="80"
                    width="80"
                    color="#a3141f"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        </MyContainer>
    );
};

export default Loading;