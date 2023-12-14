
import UpdateUsers from '@/app/(view)/admin/users/update_users/page';
import React from 'react';

const editUSers = ({params}) => {
    const [id] = params.segments || []    
    console.log(id)   
    return (
        <div>
            <UpdateUsers
            id={id}
            ></UpdateUsers>
        </div>
    );
};

export default editUSers;