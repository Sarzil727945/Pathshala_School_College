'use client'

import './sidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faSignOutAlt, faSpinner, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import { FaAngleDown, FaAngleRight, FaCaretDown } from 'react-icons/fa';
import AdminHeader from '../header/page';
import ContentLoader from 'react-content-loader';


const AdminSidebar = ({ sidebarOpen, child, toggleSidebar, props }) => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true);
    const [pageGroup, setPageGroup] = useState('')
    const [controllerName, setControllerName] = useState('')



    const handleLogout = () => {
        sessionStorage.removeItem('user_id');
        sessionStorage.removeItem('full_name');
        sessionStorage.removeItem('role_name');
        sessionStorage.removeItem('photo');
        sessionStorage.removeItem('pageGroup');
        sessionStorage.removeItem('controllerName');
        window.location.href = '/admin/login/login';
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

    // pageGroup localStorage 
    const handelPageGroup = (pageGroup, controllerName) => {
        setPageGroup(pageGroup)
        setControllerName(controllerName);
        sessionStorage.setItem('pageGroup', pageGroup)
        sessionStorage.setItem('controllerName', controllerName)
    }




    const userId = sessionStorage?.getItem('user_id');
    const fullName = sessionStorage
        ?.getItem('full_name');
    const roleName = sessionStorage?.getItem('role_name');
    const photo = sessionStorage?.getItem('photo');
    const pageGroups = sessionStorage?.getItem('pageGroup')
    const controllerNames = sessionStorage?.getItem('controllerName')



    const localSPCRemove = () => {
        sessionStorage.removeItem('pageGroup');
        sessionStorage.removeItem('controllerName');
        handelPageGroup('', '')
    }


    return (
        <div className=' wrapper w-100'>

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

                            <ContentLoader

                                viewBox="0 0 1000 550"
                                backgroundColor="#eaeced"
                                foregroundColor="#ffffff"
                                {...props}
                            >
                                <rect x="51" y="45" rx="3" ry="3" width="906" height="17" />
                                <circle cx="879" cy="123" r="11" />
                                <circle cx="914" cy="123" r="11" />
                                <rect x="104" y="115" rx="3" ry="3" width="141" height="15" />
                                <rect x="305" y="114" rx="3" ry="3" width="299" height="15" />
                                <rect x="661" y="114" rx="3" ry="3" width="141" height="15" />
                                <rect x="55" y="155" rx="3" ry="3" width="897" height="2" />
                                <circle cx="880" cy="184" r="11" />
                                <circle cx="915" cy="184" r="11" />
                                <rect x="105" y="176" rx="3" ry="3" width="141" height="15" />
                                <rect x="306" y="175" rx="3" ry="3" width="299" height="15" />
                                <rect x="662" y="175" rx="3" ry="3" width="141" height="15" />
                                <rect x="56" y="216" rx="3" ry="3" width="897" height="2" />
                                <circle cx="881" cy="242" r="11" />
                                <circle cx="916" cy="242" r="11" />
                                <rect x="106" y="234" rx="3" ry="3" width="141" height="15" />
                                <rect x="307" y="233" rx="3" ry="3" width="299" height="15" />
                                <rect x="663" y="233" rx="3" ry="3" width="141" height="15" />
                                <rect x="57" y="274" rx="3" ry="3" width="897" height="2" />
                                <circle cx="882" cy="303" r="11" />
                                <circle cx="917" cy="303" r="11" />
                                <rect x="107" y="295" rx="3" ry="3" width="141" height="15" />
                                <rect x="308" y="294" rx="3" ry="3" width="299" height="15" />
                                <rect x="664" y="294" rx="3" ry="3" width="141" height="15" />
                                <rect x="58" y="335" rx="3" ry="3" width="897" height="2" />
                                <circle cx="881" cy="363" r="11" />
                                <circle cx="916" cy="363" r="11" />
                                <rect x="106" y="355" rx="3" ry="3" width="141" height="15" />
                                <rect x="307" y="354" rx="3" ry="3" width="299" height="15" />
                                <rect x="663" y="354" rx="3" ry="3" width="141" height="15" />
                                <rect x="57" y="395" rx="3" ry="3" width="897" height="2" />
                                <circle cx="882" cy="424" r="11" />
                                <circle cx="917" cy="424" r="11" />
                                <rect x="107" y="416" rx="3" ry="3" width="141" height="15" />
                                <rect x="308" y="415" rx="3" ry="3" width="299" height="15" />
                                <rect x="664" y="415" rx="3" ry="3" width="141" height="15" />
                                <rect x="55" y="453" rx="3" ry="3" width="897" height="2" />
                                <rect x="51" y="49" rx="3" ry="3" width="2" height="465" />
                                <rect x="955" y="49" rx="3" ry="3" width="2" height="465" />
                                <circle cx="882" cy="484" r="11" />
                                <circle cx="917" cy="484" r="11" />
                                <rect x="107" y="476" rx="3" ry="3" width="141" height="15" />
                                <rect x="308" y="475" rx="3" ry="3" width="299" height="15" />
                                <rect x="664" y="475" rx="3" ry="3" width="141" height="15" />
                                <rect x="55" y="513" rx="3" ry="3" width="897" height="2" />
                                <rect x="52" y="80" rx="3" ry="3" width="906" height="17" />
                                <rect x="53" y="57" rx="3" ry="3" width="68" height="33" />
                                <rect x="222" y="54" rx="3" ry="3" width="149" height="33" />
                                <rect x="544" y="55" rx="3" ry="3" width="137" height="33" />
                                <rect x="782" y="56" rx="3" ry="3" width="72" height="33" />
                                <rect x="933" y="54" rx="3" ry="3" width="24" height="33" />
                            </ContentLoader>

                            :
                            <>
                                {child}
                            </>
                    }

                </div>

            </div>
            {/* Header and subHeader part end  */}
        </div>
    );
}

export default AdminSidebar;

