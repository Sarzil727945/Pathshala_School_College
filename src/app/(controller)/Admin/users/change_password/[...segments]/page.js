
import PasswordChange from '@/app/(view)/admin/users/password_change/page';
import React from 'react';

const ChangePassword = ({params}) => {
    const [id] = params.segments || []    
    console.log(id) 
    return (
        <div>
            <PasswordChange
            id={id}
            ></PasswordChange>
        </div>
    );
};

export default ChangePassword;