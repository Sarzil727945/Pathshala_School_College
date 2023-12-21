import AdminSettingsEdit from '@/app/(view)/admin/admin_panel_settings/admin_panel_setting_edit/page';
import React from 'react';

const AdminPanelSettingsEdit = ({params}) => {
    const [id] = params.segments || []    
    console.log(id) 
    return (
        <div>
            <AdminSettingsEdit
            id={id}
            ></AdminSettingsEdit>
        </div>
    );
};

export default AdminPanelSettingsEdit;