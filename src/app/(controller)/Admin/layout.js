'use client'

import React, { useEffect, useState } from 'react';
import '../../(view)/admin/adminStyle.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminSidebar from '@/app/(view)/admin_layout/sidebar/page';


// export const metadata = {
//     title: 'Pathshala School & College | School Management System',
//     description: 'Pathshala School & College | School Management System',
//   }

const AdminTemplate = ({ children }) => {
    const isBrowser = typeof window !== 'undefined';
  const userId = isBrowser ? sessionStorage?.getItem('user_id') : null;
  const fullName = isBrowser ? sessionStorage?.getItem('full_name') : null;
  const roleName = isBrowser ? sessionStorage?.getItem('role_name') : null;

      const loginPage = () => {
        window.location.href = '/admin/login';
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);


    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className='wrapper'>
            {
                 (userId && fullName && roleName) ? 
                    (
                        <div className={`wrapper ${sidebarOpen ? 'sidebar-active' : ''} `} >
                            <AdminSidebar
                                toggleSidebar={toggleSidebar}
                                child={children}
                                sidebarOpen={sidebarOpen}
                                setSidebarOpen={setSidebarOpen}
                            ></AdminSidebar>
    
    
                        </div>
                    ) : <div>{loginPage()}</div>
                
            }
            

        </div>
    );
};

export default AdminTemplate;