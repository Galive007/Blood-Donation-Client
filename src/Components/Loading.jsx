import React from 'react';
import MyContainer from './MyContainer';
import { Circles } from 'react-loader-spinner';

const Loading = () => {
    return (
        <MyContainer>
            <div className='flex justify-center  my-[250px] max-h-screen'>
                <Circles
                    height="80"
                    width="80"
                    color="#a6412f"
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