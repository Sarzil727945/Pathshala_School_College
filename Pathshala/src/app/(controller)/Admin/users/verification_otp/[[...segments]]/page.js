import VerificationOTP from '@/app/(view)/admin/users/verification_code/page';
import React from 'react';

const VerificationCode = ({params}) => {
    const [id] = params.segments || []    
    console.log(id) 
    return (
        <div>
            <VerificationOTP
            id={id}
            ></VerificationOTP>
        </div>
    );
};

export default VerificationCode;