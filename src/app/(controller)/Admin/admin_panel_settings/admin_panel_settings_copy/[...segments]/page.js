import AdminSettingsCopy from '@/app/(view)/admin/admin_panel_settings/admin_panel_settings_copy/page';
import React from 'react';

const AdminPanelSettingsCopy = ({params}) => {
    const [id] = params.segments || []    
    console.log(id) 
    return (
        <div>
         <AdminSettingsCopy
         id={id}
         
         ></AdminSettingsCopy>
        </div>
    );
};

export default AdminPanelSettingsCopy;