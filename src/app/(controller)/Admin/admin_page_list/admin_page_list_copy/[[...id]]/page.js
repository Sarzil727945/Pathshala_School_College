'use client'

import AdminPageCopyAll from '@/app/(view)/admin/admin_page_list_copy/page';
import React, { useState } from 'react';

const AdminPageCopy = ({ params }) => {
    const [id] = params.id || []
    return (
        <div>

            {
                <AdminPageCopyAll
                    Id={id}
                ></AdminPageCopyAll>
            }
        </div>
    );
};

export default AdminPageCopy;