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
import ContentLoader from 'react-content-loader';
import Loader from '@/api/Loader';



const AdminSidebar = ({ child, props }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true);
    const [pageGroup, setPageGroup] = useState('')
    const [controllerName, setControllerName] = useState('')


    const loginPage = () => {
         window.location.href = '/admin/login';
    };

    const handleLogout = () => {
        sessionStorage.removeItem('user_id');
        sessionStorage.removeItem('full_name');
        sessionStorage.removeItem('role_name');
        sessionStorage.removeItem('photo');
        sessionStorage.removeItem('pageGroup');
        sessionStorage.removeItem('controllerName');
        window.location.href = '/admin/login';
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

    // Use sessionStorage only if running in the browser
    const fullName = typeof window !== 'undefined' ? window.sessionStorage.getItem('full_name') : null;
    const roleName = typeof window !== 'undefined' ? window.sessionStorage.getItem('role_name') : null;
    const photo = typeof window !== 'undefined' ? window.sessionStorage.getItem('photo') : null;
    const pageGroups = typeof window !== 'undefined' ? window.sessionStorage.getItem('pageGroup') : null;
    const controllerNames = typeof window !== 'undefined' ? window.sessionStorage.getItem('controllerName') : null;
    const userId = typeof window !== 'undefined' ? window.sessionStorage.getItem('user_id') : null;



    const localSPCRemove = () => {
        sessionStorage.removeItem('pageGroup');
        sessionStorage.removeItem('controllerName');
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
                                    loading ? <>
                                        <ContentLoader
                                            speed={2}
                                            width={300}
                                            height={615}
                                            viewBox="0 0 300 615"
                                            backgroundColor="#f5f5f5"
                                            foregroundColor="#ebebeb"
                                            {...props}
                                        >
                                            <rect x="79" y="20" rx="0" ry="0" width="0" height="1" />
                                            <rect x="4" y="1" rx="0" ry="0" width="3" height="600" />
                                            <rect x="4" y="598" rx="0" ry="0" width="294" height="3" />
                                            <rect x="158" y="596" rx="0" ry="0" width="5" height="3" />
                                            <rect x="5" y="1" rx="0" ry="0" width="294" height="3" />
                                            <rect x="296" y="1" rx="0" ry="0" width="3" height="600" />
                                            <rect x="5" y="60" rx="0" ry="0" width="294" height="3" />
                                            <rect x="22" y="20" rx="0" ry="0" width="129" height="23" />
                                            <rect x="35" y="76" rx="4" ry="4" width="81" height="9" />
                                            <rect x="271" y="22" rx="4" ry="4" width="18" height="18" />
                                            <rect x="186" y="76" rx="4" ry="4" width="81" height="9" />
                                            <rect x="150" y="63" rx="0" ry="0" width="2" height="44" />
                                            <rect x="6" y="104" rx="0" ry="0" width="144" height="3" />
                                            <rect x="152" y="106" rx="0" ry="0" width="145" height="1" />
                                            <rect x="28" y="127" rx="4" ry="4" width="243" height="31" />
                                            <rect x="62" y="188" rx="4" ry="4" width="148" height="19" />
                                            <circle cx="39" cy="197" r="10" />
                                            <circle cx="39" cy="247" r="10" />
                                            <circle cx="39" cy="297" r="10" />
                                            <circle cx="39" cy="347" r="10" />
                                            <rect x="64" y="237" rx="4" ry="4" width="148" height="19" />
                                            <rect x="65" y="287" rx="4" ry="4" width="148" height="19" />
                                            <rect x="64" y="337" rx="4" ry="4" width="148" height="19" />
                                            <circle cx="39" cy="547" r="10" />
                                        </ContentLoader>

                                    </> : <>
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
                                    </>
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
                                                <>
                                                    {child}
                                                </>
                                        }

                                    </div>

                                </div>
                                {/* Header and subHeader part end  */}
                            </div>
                        </div>
                    ) : (<div>{ loginPage() }</div>)
            }
        </div>
    );
}

export default AdminSidebar;

