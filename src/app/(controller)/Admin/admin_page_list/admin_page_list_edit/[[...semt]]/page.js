'use client'

import { getAllAdminData } from '@/api/adminPage';
import AdminPageEditAll from '@/app/(view)/admin/admin_page_list_edit/page';
import React, { useState } from 'react';

const AdminPageEdit = ({ params }) => {
    const [id] = params.semt || []

    const [controllerName, setControllerName] = useState(null);
    const [pageGroup, setPageGroup] = useState(null);
    const [controllerSort, setControllerSort] = useState(null);
    const [pageGroupSort, setPageGroupSort] = useState(null);
    const [controllerBg, setControllerBg] = useState(null);
    const [controllerColor, setControllerColor] = useState(null);
    getAllAdminData().then(data => {
        const parentUser = data?.filter(user => user?.id === +id);
        setControllerName(parentUser[0]?.controller_name)
        setPageGroup(parentUser[0]?.page_group)
        setControllerSort(parentUser[0]?.controller_sort)
        setPageGroupSort(parentUser[0]?.page_group_sort)
        setControllerBg(parentUser[0]?.controller_bg)
        setControllerColor(parentUser[0]?.controller_color)
    }

    );
    return (
        <div>
            {
                    (controllerName && pageGroup && controllerSort && pageGroupSort && controllerBg && controllerColor) && <AdminPageEditAll
                        Id={id}
                        controllerName={controllerName}
                        pageGroup={pageGroup}
                        controllerSort={controllerSort}
                        pageGroupSort={pageGroupSort}
                        controllerBg={controllerBg}
                        controllerColor={controllerColor}
                    ></AdminPageEditAll>
                }

        </div>
    );
};

export default AdminPageEdit;