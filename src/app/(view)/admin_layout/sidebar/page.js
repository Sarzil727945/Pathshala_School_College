'use client'

import './sidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faSignOutAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import { FaAngleDown, FaAngleRight, FaCaretDown } from 'react-icons/fa';
import AdminHeader from '../header/page';
import Loader from '@/api/Loader';
import SideLoader from '@/api/SideLoader';

const AdminSidebar = ({ child }) => {

    useEffect(() => {
        if (typeof document !== 'undefined') {
            // Load jQuery first
            const jQueryScript = document.createElement('script');
            jQueryScript.src = 'https://code.jquery.com/jquery-3.3.1.slim.min.js';
            jQueryScript.integrity = 'sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo';
            jQueryScript.crossOrigin = 'anonymous';
            jQueryScript.async = true;
    
            jQueryScript.onload = () => {
                // Once jQuery is loaded, load Bootstrap
                const bootstrapScript = document.createElement('script');
                bootstrapScript.src = 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js';
                bootstrapScript.integrity = 'sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm';
                bootstrapScript.crossOrigin = 'anonymous';
                bootstrapScript.async = true;
    
                document.body.appendChild(bootstrapScript);
            };
    
            document.body.appendChild(jQueryScript);
    
            return () => {
                // Cleanup: remove both scripts
                document.body.removeChild(jQueryScript);
            };
        }
    }, []);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true);
    const [pageGroup, setPageGroup] = useState('')
    const [controllerName, setControllerName] = useState('')


    const loginPage = () => {
        window.location.href('/admin/login')
        // typeof window !== 'undefined' ? window.location.href('/admin/login') : null;
    };

    const handleLogout = () => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('full_name');
        localStorage.removeItem('role_name');
        localStorage.removeItem('photo');
        sessionStorage.removeItem('pageGroup');
        sessionStorage.removeItem('controllerName');
       typeof window !== 'undefined' ? window.location.href('/admin/login') : null;
    };


    useEffect(() => {
        apiFetch();
    }, [])

    const apiFetch = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/group-names-id`);
        const data = await res.json();
        setUsers(data);
        setLoading(false)
    }


    const samePageGroup = users.filter((users) => users?.page_group === pageGroup);
    const [clickedButtons, setClickedButtons] = useState(new Array(users.length).fill(false));


    const handleClick = (index) => {
        const updatedClickedButtons = [...clickedButtons];
        updatedClickedButtons[index] = !updatedClickedButtons[index];
        setClickedButtons(updatedClickedButtons);
    };


    const formatString = (str) => {
        const words = str?.split('_');
        const formattedWords = words?.map((word) => {
            const capitalizedWord = word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase();
            return capitalizedWord;
        });

        return formattedWords?.join(' ');
    };

    // pageGroup sessionStorage 
    const handelPageGroup = (pageGroup, controllerName) => {
        setPageGroup(pageGroup)
        setControllerName(controllerName);
        sessionStorage.setItem('pageGroup', pageGroup)
        sessionStorage.setItem('controllerName', controllerName)
    }

    // Use localStorage only if running in the browser
    const fullName = typeof window !== 'undefined' ? window.localStorage.getItem('full_name') : null;
    const roleName = typeof window !== 'undefined' ? window.localStorage.getItem('role_name') : null;
    const photo = typeof window !== 'undefined' ? window.localStorage.getItem('photo') : null;
    const pageGroups = typeof window !== 'undefined' ? window.sessionStorage.getItem('pageGroup') : null;
    const controllerNames = typeof window !== 'undefined' ? window.sessionStorage.getItem('controllerName') : null;
    const userId = typeof window !== 'undefined' ? window.localStorage.getItem('user_id') : null;



    const localSPCRemove = () => {
        localStorage.removeItem('pageGroup');
        localStorage.removeItem('controllerName');
        handelPageGroup('', '')
    }


    return (
        <div>
            {
                (userId && fullName && roleName) ?
                    (
                        <div className={`wrapper ${sidebarOpen ? 'sidebar-active' : ''} `}>

                            <div className=' wrapper w-100' >
                                {
                                    loading ? <div>
                                        <SideLoader />
                                    </div> : <div>
                                        <nav id="sidebar" className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
                                            <div className="sidebar-header mt-2">
                                                <div></div>
                                                <div className="media d-flex">
                                                    <img
                                                        title={fullName}
                                                        className="rounded-circle mt-2 ml-1"
                                                        src={`${photo}`}
                                                        alt=""
                                                        width="50"
                                                        height="50"
                                                    />

                                                    <Dropdown>
                                                        <Dropdown.Toggle className='text-start text-white border-0' variant="none" id="dropdown-basic">
                                                            <div className='sideLine'>
                                                                <h6 className='mt-1'>
                                                                    <span className='admin-text text-left'>{fullName}</span>
                                                                    <p className='admin-subtext'>{roleName}
                                                                        <span className=' mb-1 ml-1'><FaCaretDown></FaCaretDown> </span>
                                                                    </p>
                                                                </h6>
                                                            </div>

                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu className=' mt-2 ms-2'>
                                                            <Dropdown.Item href="https://atik.urbanitsolution.com/Admin/users/users_edit/2">
                                                                <FontAwesomeIcon icon={faUserEdit} />  Edit Profile
                                                            </Dropdown.Item>
                                                            <Dropdown.Item href="https://atik.urbanitsolution.com/Admin/users/change_password/2">
                                                                <FontAwesomeIcon icon={faKey} />  Change Password
                                                            </Dropdown.Item>

                                                            {
                                                                userId && <Dropdown.Item href={`/admin/login`} onClick={handleLogout}>
                                                                    <FontAwesomeIcon icon={faSignOutAlt} />  Log Out
                                                                </Dropdown.Item>
                                                            }
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </div>

                                            <ul className="text-white">
                                                <button onClick={localSPCRemove} className='dashboard p-2 '>
                                                    <Link href='/Admin/dashboard'>Dashboard</Link>
                                                </button>

                                                {users?.map((group, index) => (
                                                    <li key={index}>
                                                        <button
                                                            className={`dashboard-dropdown ${clickedButtons[index] ? 'clicked' : ''}`}
                                                            onClick={() => handleClick(index)}
                                                        >
                                                            <a
                                                                href={`#${group?.page_group}`}
                                                                data-toggle="collapse"
                                                                aria-expanded="false"

                                                            >
                                                                <div className="d-flex justify-content-between">
                                                                    {formatString(group?.page_group)}
                                                                    <div>
                                                                        {clickedButtons[index] ? <FaAngleDown /> : <FaAngleRight />}
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            <ul className={`collapse list-unstyled ${pageGroups === group?.page_group ? 'show' : ''}`} style={{ background: '#3b5998' }} id={group?.page_group}>

                                                                <li>

                                                                    {group?.controllers?.map((d, i) => (
                                                                        <div key={i}>
                                                                            <a href={`#${group.page_group}-${d.controller_name}`} data-toggle="collapse" aria-expanded="false" className=" borderBottom"

                                                                            >

                                                                                <div className='d-flex justify-content-between'>
                                                                                    {formatString(d.controller_name)}


                                                                                    <div>
                                                                                        {clickedButtons ? <FaAngleRight /> : <FaAngleDown />}
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                            <ul className={`collapse list-unstyled ${controllerNames === d?.controller_name ? 'show' : ''}`} style={{ background: '#314B81' }} id={`${group.page_group}-${d.controller_name}`}>

                                                                                <li onClick={() => handelPageGroup((group?.page_group), (d?.controller_name))}>

                                                                                    {d.display_names.map((displayName, di) => (

                                                                                        <Link
                                                                                            className='border-bottom1'
                                                                                            key={di}
                                                                                            href={`/Admin/${d?.controller_name}/${displayName.method_names}?page_group=${group?.page_group}`}
                                                                                        >

                                                                                            {displayName.display_name}
                                                                                        </Link>
                                                                                    ))}
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    ))}
                                                                </li>
                                                            </ul>
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </nav>
                                    </div>
                                }



                                {/* Header and subHeader part start  */}
                                <div id="content " className='w-100'>
                                    <AdminHeader toggleSidebar={toggleSidebar}></AdminHeader>
                                    {
                                        pageGroup && <div className='sticky-top' >
                                            <nav style={{ marginTop: '-35px' }} className="navbar  navbar-expand-lg navbar-light bg-light">
                                                <div className="container-fluid" >
                                                    <Link className="navbar-brand  text-primary" href={`/Admin/admin_page_group/admin_page_group_all/${pageGroup}`}>{formatString(pageGroup)}</Link>
                                                    <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#customNavbarCollapse" aria-controls="customNavbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                                                        <i className="fas fa-align-justify"></i>
                                                    </button>
                                                    <div className="collapse navbar-collapse " id="customNavbarCollapse">
                                                        <ul className=" nav navbar-nav ml-auto">
                                                            {
                                                                (samePageGroup[0]?.controllers)?.map((page, i) =>
                                                                    <div key={i}>
                                                                        <div className=" ml-0 dropdown" >

                                                                            <li className="nav-item active">
                                                                                <div className="nav-link" href="#">{formatString(page?.controller_name)}

                                                                                    <span className="fa fa-caret-down ml-1"></span>
                                                                                </div>
                                                                            </li>
                                                                            <ul className="dropdown-menu nav-item active ml-0" aria-labelledby="dropdownMenuButton">
                                                                                {
                                                                                    page.display_names.map(displayNames =>

                                                                                        <>

                                                                                            <li><Link className="dropdown-item" href={`/Admin/${page?.controller_name}/${displayNames.method_names}?page_group=${pageGroup}`}>{displayNames.display_name}

                                                                                            </Link></li>
                                                                                        </>
                                                                                    )
                                                                                }

                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                        </ul>

                                                    </div>
                                                </div>
                                            </nav>
                                        </div>
                                    }

                                <div>
                                    </div>
                                    <div >
                                        {
                                            loading ?
                                                <Loader />
                                                :
                                                <div>
                                                    {child}
                                                </div>
                                        }
                                    </div>

                                </div>
                                {/* Header and subHeader part end  */}
                            </div>
                        </div>
                    ) : (<div> {loginPage()} </div>)
            }
        </div>
    );
}

export default AdminSidebar;

