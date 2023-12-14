'use client'
import React, { useEffect, useState } from 'react';
import '../../(view)/admin/adminStyle.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminSidebar from '@/app/(view)/admin_layout/sidebar/page';
import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';




const AdminTemplate = ({ children }) => {
    const router = useRouter()

    const [isSidebarActive, setSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setSidebarActive(!isSidebarActive);
    };
    const userInfo = typeof window !== 'undefined' ? window.localStorage.getItem('user_id') : null;

    const { data: singleUsers = [], isLoading, refetch } = useQuery({
        queryKey: ['singleUsers'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/allUser/${userInfo}`);
            const data = await res.json();
            return data;
        },
    });

    console.log(singleUsers[0]?.verifiy_codes)
    const verifyCode = singleUsers[0]?.OTP
    const userId = typeof window !== 'undefined' ? window.localStorage.getItem('user_id') : null;

    const login = () => {
        router.push('/admin/login')
    }

    useEffect(() => {

        if (!userInfo) {

            router.push('/admin/login');
        } else if (verifyCode === '1') {

            router.push(`/Admin/users/email_verification/${userId}`);
            // router.push(`/Admin/users/number_verification/${userId}`);
            // router.push(`/Admin/users/change_password/${userId}`);
        }
        // else if(otp !== '1'){
        //     router.push(`/Admin/dashboard`);
        // }
    }, [userInfo, verifyCode, userId, router]);




    return (
        <div>
            {/* class="wrapper" */}
            <div>
                <div id='wrapper' className={`wrapper ${isSidebarActive ? 'sidebar-active' : ''}`}>
                    {userInfo ? (
                        <AdminSidebar
                            isSidebarActive={isSidebarActive}
                            child={children}
                            toggleSidebar={toggleSidebar}
                        />
                    ) : <>
                        {login()}
                    </>}
                </div>
            </div>

        </div>
    );
};

export default AdminTemplate;