'use client'


import React, { useState } from 'react';
import './sidebar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { FaAngleDown, FaAngleRight, FaBars, FaKey, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import AdminHeader from '../header/page';
import { FaCaretDown } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SideLoader from '@/common/SideLoader';
import Loader from '@/common/Loader';


const AdminSidebar = ({ child }) => {

  const router = useRouter()
  const [userLogin, setUserLogin] = useState(null)
  const [isSidebarActive, setSidebarActive] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => {
    setSidebarActive(!isSidebarActive);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/group-names-id`);
        const data = await res.json();
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);


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


  const [clickedButtons, setClickedButtons] = useState(new Array(users.length).fill(false));

  const handleClick = (index) => {
    const updatedClickedButtons = [...clickedButtons];
    updatedClickedButtons[index] = !updatedClickedButtons[index];
    setClickedButtons(updatedClickedButtons);
  };



  const formatString = (str) => {
    const words = str?.split('_');
    const formattedWords = words?.map((word) => {
      const capitalizedWord = word?.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      return capitalizedWord;
    });
    return formattedWords?.join(' ');
  };


  const [pageGroup, setPageGroup] = useState('')
  const [controllerName, setControllerName] = useState('')


  const handleLinkClick = (selectedPageGroup, controllerName) => {
    setControllerName(controllerName)
    setPageGroup(selectedPageGroup);
    localStorage.setItem('controllerName', controllerName)
    localStorage.setItem('pageGroup', selectedPageGroup);
  };


  const [displayNames, setDisplayNames] = useState('')
  const handleDisplayName = (displayNames, controllerName) => {
    setDisplayNames(displayNames)
    setControllerName(controllerName)
    localStorage.setItem('controllerName', controllerName)
    localStorage.setItem('displayName', displayNames)
  }


  const page_group = typeof window !== 'undefined' ? window.localStorage.getItem('pageGroup') : null;;
  const filterUser = users.filter(u => u.page_group === page_group)
  const pageGroupNav = filterUser[0]?.controllers

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('full_name');
    localStorage.removeItem('role_name');
    localStorage.removeItem('photo');
    localStorage.removeItem('pageGroup');
    localStorage.removeItem('controllerName');
    localStorage.removeItem('displayName');
    router.push('/admin/login')
  };




  // Use localStorage only if running in the browser
  const userId = typeof window !== 'undefined' ? window.localStorage.getItem('user_id') : null;
  const userName = typeof window !== 'undefined' ? window.localStorage.getItem('full_name') : null;
  const userRoleName = typeof window !== 'undefined' ? window.localStorage.getItem('role_name') : null;
  const photo = typeof window !== 'undefined' ? window.localStorage.getItem('photo') : null;
  const pageGroups = typeof window !== 'undefined' ? window.localStorage.getItem('pageGroup') : null;
  const fullName = typeof window !== 'undefined' ? window.localStorage.getItem('full_name') : null;
  const roleName = typeof window !== 'undefined' ? window.localStorage.getItem('role_name') : null;

  const controllerNames = typeof window !== 'undefined' ? window.localStorage.getItem('controllerName') : null;



  useEffect(() => {
    (userId && fullName && roleName) ? setUserLogin('user login') : router.push('/admin/login');
  }, [userId, fullName, roleName])


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });

  const toggleMenu = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom,
      left: rect.right,
    });
    setIsMenuOpen(!isMenuOpen);
  };


  const handleDashboardClick = () => {
    sessionStorage.removeItem('pageGroup');
    localStorage.removeItem('pageGroup');
    sessionStorage.removeItem('controllerName');
    handleLinkClick('')
  };

  useEffect(() => {
    if (window.location.pathname === "/Admin/dashboard") {
      localStorage.removeItem('pageGroup');
      sessionStorage.removeItem('pageGroup');
      sessionStorage.removeItem('controllerName')
    }
  }, []);



  const [sideNav, setSideNav] = useState([])


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/admin_panel_settings`)
      .then(Response => Response.json())
      .then(data => setSideNav(data))
  }, [])
  console.log(sideNav)

  const filteredCategories = sideNav.filter(category => category.status === 1);
  console.log(filteredCategories[0]?.admin_template, 'filteredCategories[0]?.admin_template')

  return (

    <div id='wrapper' className={`wrapper ${isSidebarActive ? 'sidebar-active' : ''}`}>
      {(userLogin) && <>
        <div class="wrapper w-100" >

          {
            filteredCategories[0]?.left_menu === 1 ?
              <nav id="sidebar" className={`sidebar ${isSidebarActive ? 'active' : ''} side_menu_bg`}>
                <div className="sidebar-header mt-2 side_menu_bg" >
                  <div></div>
                  <div className="media d-flex " style={{ marginLeft: '6px' }}>
                    <img
                      className="rounded-circle mt-2"
                      src={photo}
                      alt=""
                      width="50"
                      height="50"
                    />
                    <div className="position-relative">
                      <div className='sideLine  ' style={{ marginTop: '14px', marginLeft: '5px' }} onClick={(e) => toggleMenu(e)}>
                        <h6 className='mt-2 ml-2'>
                          <span className='admin-text'>{userName}</span>
                          <p className='admin-subtext mt-1'>{userRoleName}
                            <FaCaretDown></FaCaretDown>
                          </p>
                        </h6>
                      </div>
                      {isMenuOpen && (
                        <div className='position-absolute bg-light text-dark' style={{ top: menuPosition.top, right: menuPosition.right }}>

                          <div class="dropdown-menu show btn" aria-labelledby="dropdownMenuButton" x-placement="bottom-start">
                            <a class="dropdown-item" href={`/Admin/users/edit_users/${userId}`}>
                              <FaUserEdit></FaUserEdit> Edit Profile
                            </a>

                            <a onClick={handleLogout} class="dropdown-item" >
                              <FaSignOutAlt></FaSignOutAlt> Log Out
                            </a>

                            <a class="dropdown-item " >
                              <FaKey></FaKey>
                              Change Password
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <ul className="text-white" style={{ marginTop: '-5px' }}>
                  <button className='dashboard p-2 side_menu_bg' >
                    <Link onClick={handleDashboardClick} className='' href='/Admin/dashboard'>
                      Dashboard
                    </Link>
                  </button>
                  {
                    users?.map((group, index) => (
                      <li key={group?.page_group_id} className=''>
                        <button
                          className={`dashboard-dropdown ${clickedButtons[index] ? 'clicked' : ''} side_menu_l1_bg`}
                          onClick={() => handleClick(index)}>
                          <Link
                            onClick={() => handleLinkClick((group?.page_group))}
                            href={`/Admin/Admin_page_group/Admin_page_group_all?page_group=${group?.page_group}`}>
                            <div className="d-flex justify-content-between ">
                              {formatString(group?.page_group)}
                            </div>
                          </Link>
                        </button>
                      </li>
                    ))}
                </ul>
              </nav>
              :
              <>
                {
                  isLoading ?
                    <>
                      <SideLoader />
                    </>
                    :
                    <>
                      <nav id="sidebar" className={`sidebar ${isSidebarActive ? 'active' : ''} side_menu_bg custom-sidebar`}>
                        <div className="sidebar-header my-2 side_menu_bg" >
                          <div></div>
                          <div className="media d-flex " style={{ marginLeft: '6px' }}>
                            <img
                              className="rounded-circle mt-2"
                              src={photo}
                              alt=""
                              width="50"
                              height="50"
                            />
                            <div className="position-relative">
                              <div className='sideLine  ' style={{ marginTop: '14px', marginLeft: '5px' }} onClick={(e) => toggleMenu(e)}>
                                <h6 className='mt-2 ml-2'>
                                  <span className='admin-text'>{userName}</span>
                                  <p className='admin-subtext mt-1'>{userRoleName}
                                    <FaCaretDown></FaCaretDown>
                                  </p>
                                </h6>
                              </div>
                              {isMenuOpen && (
                                <div className='position-absolute bg-light text-dark' style={{ top: menuPosition.top, right: menuPosition.right }}>
                                  <div class="dropdown-menu show btn" aria-labelledby="dropdownMenuButton" x-placement="bottom-start">
                                    <Link class="dropdown-item" href={`/Admin/users/edit_users/${userId}`}>
                                      <FaUserEdit></FaUserEdit> Edit Profile
                                    </Link>
                                    <Link class="dropdown-item " href={`/Admin/users/change_password/${userId}`}>
                                      <FaKey></FaKey>
                                      Change Password
                                    </Link>

                                    <a onClick={handleLogout} class="dropdown-item" >
                                      <FaSignOutAlt></FaSignOutAlt> Log Out
                                    </a>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <ul className="text-white" style={{ marginTop: '-5px' }}>
                          <button className='dashboard p-2 side_menu_bg' >
                            <Link onClick={handleDashboardClick} className='' href='/Admin/dashboard'>
                              Dashboard
                            </Link>
                          </button>
                          {
                            users?.map((group, index) => (
                              <li key={group?.page_group_id} className=''>
                                <button
                                  className={`dashboard-dropdown ${clickedButtons[index] ? 'clicked' : ''} side_menu_l1_bg`}
                                  onClick={() => handleClick(index)}>
                                  <a
                                    href={`#${group?.page_group}`}
                                    data-toggle="collapse"
                                    aria-expanded="false"
                                    className=''>
                                    <div className="d-flex justify-content-between ">
                                      {formatString(group?.page_group)}
                                      <div>
                                        {clickedButtons[index] ? <FaAngleDown /> : <FaAngleRight />}
                                      </div>
                                    </div>
                                  </a>
                                  <ul className={`collapse list-unstyled ${page_group === group?.page_group ? 'show' : ''} `} style={{ background: '#3b5998' }} id={group?.page_group}>

                                    <li className=''>
                                      {group?.controllers?.map((d, index) => (
                                        <div key={d.controller_name}>
                                          <a href={`#${group.page_group}-${d.controller_name}`} data-toggle="collapse" aria-expanded="false" className="side_menu_l2_bg borderBottom">
                                            <div className='d-flex justify-content-between'>
                                              {formatString(d.controller_name)}
                                              <div>
                                                {clickedButtons ? <FaAngleDown /> : <FaAngleRight />}
                                              </div>
                                            </div>
                                          </a>
                                          <ul className={`collapse list-unstyled ${controllerNames === d?.controller_name ? 'show' : ''} `} style={{ background: '#314B81' }} id={`${group.page_group}-${d.controller_name}`}>

                                            <li
                                              onClick={() => handleLinkClick((group?.page_group), (d?.controller_name))}>
                                              {d.display_names.map((displayName, di) => (
                                                <Link
                                                  onClick={() => handleDisplayName(displayName.display_name)}
                                                  className='border-bottom1 side_menu_l3_bg'
                                                  key={di}
                                                  href={`/Admin/${d?.controller_name}/${displayName.method_names}?page_group=${group?.page_group}`}>
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
              </>
          }

          <div id="content " className='w-100 ' >
            <AdminHeader toggleSidebar={toggleSidebar}></AdminHeader>
            <div className='sticky-top' >
              {
                pageGroupNav &&
                <nav className="navbar  navbar-expand-lg navbar-light bg-light sub_header_background_color">
                  <div className="container-fluid" >
                    <Link className="navbar-brand  text-primary" href="">{formatString(page_group)}</Link>
                    <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#customNavbarCollapse" aria-controls="customNavbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                      <FaBars></FaBars>
                    </button>
                    <div className="collapse navbar-collapse " id="customNavbarCollapse">
                      <ul class=" nav navbar-nav ml-auto">
                        {
                          pageGroupNav?.map(page =>
                            <>
                              <div class=" ml-0 dropdown " >

                                <li className="nav-item active
                          "

                                >
                                  <Link className="nav-link" href=""


                                    style={{
                                      color: controllerNames === page?.controller_name ? '#28a745' : 'inherit',
                                      fontWeight: controllerNames === page?.controller_name ? '600' : 'normal',
                                    }}
                                  >{formatString(page?.controller_name)}

                                    <FaCaretDown></FaCaretDown>
                                  </Link>
                                </li>
                                <ul class="dropdown-menu nav-item active ml-0" aria-labelledby="dropdownMenuButton">
                                  {
                                    page.display_names.map(displayNames =>

                                      <>

                                        <li

                                        ><Link


                                          onClick={() => handleDisplayName((displayNames.display_name), (page?.controller_name))}
                                          class="dropdown-item" href={`/Admin/${page?.controller_name}/${displayNames.method_names}?page_group=${page_group}`}>{displayNames.display_name}

                                          </Link></li>
                                      </>
                                    )
                                  }

                                </ul>
                              </div>
                            </>
                          )}
                      </ul>
                    </div>
                  </div>
                </nav>
              }

              <div className='body_bg p-lg-5 p-md-5 p-1 '>
                {
                  isLoading ?

                    <Loader />

                    :

                    <div>
                      {child}


                      <div className='d-flex justify-content-between px-4 mt-5 '>
                        <div>
                          <ul class="navbar-nav mr-auto">
                            <li class="nav-item active float-left text-center">
                              <a class="nav-link text-success" href="https://atik.urbanitsolution.com/" target="_blank"> All Rights Reserved <br /><strong>Pathshala School & College</strong> </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <ul class="navbar-nav">
                            <li class="nav-item active float-left text-center">
                              <a class="nav-link text-danger" href="http://urbanitsolution.com" target="_blank">Developed & Maintenance by <br /><strong>Urban IT Solution</strong>  </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>


                }

              </div>
            </div>
          </div>
        </div>
      </>
      }
    </div>
  );
}

export default AdminSidebar;
