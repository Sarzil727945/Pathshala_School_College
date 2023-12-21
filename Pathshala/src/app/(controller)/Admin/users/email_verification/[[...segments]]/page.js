import EmailVerifi from '@/app/(view)/admin/users/email_verify/page';
import React from 'react';

const EmailVerification = ({params}) => {
    const [id] = params.segments || []    
    console.log(id)   
    return (
        <div>
            <EmailVerifi
            id={id}
            ></EmailVerifi>
        </div>
    );
};

export default EmailVerification;