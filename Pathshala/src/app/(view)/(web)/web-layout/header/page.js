import Link from 'next/link';
import React from 'react';
import { FaEnvelope, FaFacebook, FaPhoneAlt, FaUser } from 'react-icons/fa';

const WebHeader = () => {
    return (
        <div>
            <div className=' d-flex align-items-center justify-content-between'>
                <div className=' d-flex'>
                    <div class="nav-item dropdown font-weight-bold ">
                        <a class="nav-link  dlmenu-txt-164  "> <FaPhoneAlt /> 01893254443 </a>
                    </div>
                    <div class="nav-item dropdown font-weight-bold ">
                        <a class="nav-link  dlmenu-txt-164  "> <FaEnvelope /> sarzilmuntaha@gmail.com </a>
                    </div>
                    <div class="nav-item dropdown font-weight-bold ">
                        <a class="nav-link  dlmenu-txt-164  "> <FaFacebook /> Facebook </a>
                    </div>
                </div>
                <div>
                    <Link class="nav-link  dlmenu-txt-164 " href="/admin/login"> <FaUser /> Login </Link>
                </div>
            </div>
        </div>
    );
};

export default WebHeader;