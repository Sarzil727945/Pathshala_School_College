'use client'

import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const AdminHeader = ({ toggleSidebar }) => {


    return (
        <nav className="navbar navbar-expand-lg px-4">
            <div className="container-fluid ">
                <button type="button" onClick={toggleSidebar} id="sidebarCollapse" className="btn btn-info d-lg-none">
                    =
                </button>
                <div className=' d-flex gap-3 mt-3'>
                    <div className=' px-3'>
                        <img src="https://atik.urbanitsolution.com/files/logo/thumbnail/7632b474c6d5b78e3f6233a87461bf623f453c67.jpeg" className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt=""
                            width='40'
                        />
                    </div>
                    <div style={{ marginTop: '-8px', }}>
                        <h4 className='header-tag'>Pathshala School & College
                        </h4>
                        <p style={{ marginTop: '-5px' }}><strong>College Management System</strong></p>
                    </div>

                </div>
                <div>
                    <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        =
                    </button>
                </div>

                <div className="collapse navbar-collapse d-lg-flex justify-content-end navbar-upper" id="navbarSupportedContent">


                    <div className='header-right mb-lg-0 mb-3 w-full'>
                        <ul className="nav justify-content-center">
                            <li className="nav-item py-1 bg-light border rounded-circle mr-2"></li>
                            <li className="nav-item py-1 bg-light border rounded-circle mr-2 mx-2"></li>
                            <li className="nav-item py-1 bg-light border rounded-circle mr-2 ">
                                <a href="https://atik.urbanitsolution.com/Admin/admin_panel_settings/admin_panel_settings_edit/9?page_group=system_setup" className="nav-link text-success">
                                    <FontAwesomeIcon icon={faCog} className="zt-1" />
                                </a>
                            </li>
                            <li className="nav-item py-1 bg-light border rounded-circle mr-2 mx-3">
                                <a className="nav-link text-danger" href="#">
                                    <FontAwesomeIcon icon={faCommentDots}
                                        className="zt-1 blink_me" />

                                    <span className=" iconBotton badge badge-danger badge-pill position-absolute bg-danger">0</span>
                                </a>
                            </li>
                            <li className="nav-item py-1 bg-light border rounded-circle">
                                <a className="nav-link text-secondary" href="#">
                                    <FontAwesomeIcon icon={faBell} className="zt-1 swingimage" />
                                    <span className="iconBotton badge badge-danger badge-pill  position-absolute bg-danger mb-5">0</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default AdminHeader


