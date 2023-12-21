
import NumberVerifi from '@/app/(view)/admin/users/number_verify/page';
import React from 'react';

const OTP = ({params}) => {
    const [id] = params.segments || []    
    console.log(id) 
    return (
        <div>
            <NumberVerifi
            id={id}
            ></NumberVerifi>
        </div>
    );
};

export default OTP;