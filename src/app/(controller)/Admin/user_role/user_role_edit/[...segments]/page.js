import UserRoleEdit from '@/app/(view)/admin/user_roles/user_role_edit/page';
import React from 'react';

const UserRoleEdits = ({params}) => {
    const [id] = params.segments || []    
    console.log(id) 
    return (
        <div>
            <UserRoleEdit
            id={id}
            ></UserRoleEdit>
        </div>
    );
};

export default UserRoleEdits;