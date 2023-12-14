'use client'


import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Link from 'next/link';
import './sidebar.css'
import { useQuery } from '@tanstack/react-query';
import { FaAngleDown, FaAngleRight, FaBars, FaKey, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import AdminHeader from '../header/page';
import { FaCaretDown } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ContentLoader from 'react-content-loader';
import { useEffect } from 'react';
import { Fragment } from 'react';





const AdminSidebar = ({ isSidebarActive, child, toggleSidebar, props }) => {

  const router = useRouter()
  const { data: userss = [], isLoading, refetch } = useQuery({
    queryKey: ['userss'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/group-names-id`);
      const data = await res.json();

      return data;
    },
  });

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



  const [clickedButtons, setClickedButtons] = useState(new Array(userss.length).fill(false));



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

  const convertToCamelCase = (input) => {
    return input.toLowerCase().replace(/ /g, '_');
  };


  const [pageGroup, setPageGroup] = useState('')
  console.log(pageGroup)

  const [controllerName, setControllerName] = useState('')


  const handleLinkClick = (selectedPageGroup, controllerName) => {

    setControllerName(controllerName)
    setPageGroup(selectedPageGroup);

    // Save the selected pageGroup to local storage.
    sessionStorage.setItem('controllerName', controllerName)
    localStorage.setItem('pageGroup', selectedPageGroup);


  };

  const handleLinkClicks = (selectedPageGroup, controllerName) => {

    setControllerName(controllerName)
    setPageGroup(selectedPageGroup);

    // Save the selected pageGroup to local storage.
    sessionStorage.setItem('controllerName', controllerName)
    localStorage.setItem('pageGroups', selectedPageGroup);


  };




  const [displayNames, setDisplayNames] = useState('')
  const handleDisplayName = (displayNames, controllerName) => {
    setDisplayNames(displayNames)
    setControllerName(controllerName)
    sessionStorage.setItem('controllerName', controllerName)
    sessionStorage.setItem('displayName', displayNames)
  }

  console.log(displayNames, 'displayNames')






  const page_group = localStorage.getItem('pageGroup');

  const filterUser = userss.filter(u => u.page_group === page_group)

  console.log(filterUser[0]?.controllers, 'filterUser[0]?.controllers')

  const pageGroupNav = filterUser[0]?.controllers
  // const displayNames = (pageGroupNav?.map(paegGroups => paegGroups.display_names.map(displayName => displayName.display_name)))
  console.log(pageGroupNav?.map(paegGroups => paegGroups.display_names.map(displayName => displayName.display_name)))



  const handleLogout = () => {

    localStorage.removeItem('user_id');
    localStorage.removeItem('full_name');
    localStorage.removeItem('role_name');
    localStorage.removeItem('photo');
    localStorage.removeItem('pageGroup');
    localStorage.removeItem('controllerName');
    router.push('/admin/login')
  };

  const userEmail = localStorage.getItem('userEmail');
  // const userRoleName = localStorage.getItem('userRoleName');
  // const userName = localStorage.getItem('userName');

  // Use localStorage only if running in the browser
  const userId = typeof window !== 'undefined' ? window.localStorage.getItem('user_id') : null;
  const userName = typeof window !== 'undefined' ? window.localStorage.getItem('full_name') : null;
  const userRoleName = typeof window !== 'undefined' ? window.localStorage.getItem('role_name') : null;
  const photo = typeof window !== 'undefined' ? window.localStorage.getItem('photo') : null;
  const pageGroups = typeof window !== 'undefined' ? window.localStorage.getItem('pageGroup') : null;
  const fullName = typeof window !== 'undefined' ? window.localStorage.getItem('full_name') : null;
  const roleName = typeof window !== 'undefined' ? window.localStorage.getItem('role_name') : null;

  const controllerNames = typeof window !== 'undefined' ? window.localStorage.getItem('controllerName') : null;




  console.log(pageGroupNav, 'pageGroupNav')


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
    // localStorage.clear();
  };

  useEffect(() => {

    if (window.location.pathname === "/Admin/dashboard") {
      localStorage.removeItem('pageGroup');
      // localStorage.clear();
      sessionStorage.removeItem('pageGroup');
      sessionStorage.removeItem('controllerName')
    }
  }, []);

  console.log(controllerName, 'controllerName')



  // const [loading, setLoading] = useState(false)
  // useEffect(() => {
  //   setLoading(true)
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 2000)
  // }, [])

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
    <div class="wrapper w-100" >


      {
        filteredCategories[0]?.left_menu === 1 ?

          <nav id="sidebar" className={`sidebar ${isSidebarActive ? 'active' : ''} side_menu_bg`}>
            <div className="sidebar-header mt-2 side_menu_bg" >
              <div></div>
              <div className="media d-flex " style={{ marginLeft: '6px' }}>
                <img
                  className="rounded-circle mt-2"
                  src="https://atik.urbanitsolution.com/web_content/img/user.png"
                  alt=""
                  width="50"
                  height="50"
                />
                <div className="position-relative">
                  <div className='sideLine  ' style={{ marginTop: '14px', marginLeft: '5px' }} onClick={(e) => toggleMenu(e)}>
                    <h6 className='mt-1'>
                      <span className='admin-text'>{userName}</span>
                      <p className='admin-subtext'>{userRoleName}
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

                userss?.map((group, index) => (
                  <li key={group?.page_group_id} className=''>
                    <button
                      className={`dashboard-dropdown ${clickedButtons[index] ? 'clicked' : ''} side_menu_l1_bg`}
                      onClick={() => handleClick(index)}
                    >
                      <Link
                        onClick={() => handleLinkClick((group?.page_group))}
                        // onClick={() => handleLinkClicks((group?.page_group))}
                        href={`/Admin/Admin_page_group/Admin_page_group_all?page_group=${group?.page_group}`}

                      >
                        <div className="d-flex justify-content-between ">
                          {formatString(group?.page_group)}

                        </div>
                      </Link>
                      <ul style={{ background: '#314B81' }} >

                      </ul>

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
                  {/* <div className='text-center'>
        <div className=' my-5 py-5 mr-5 text-center text-white'
        >
          <FontAwesomeIcon style={{
            height: '33px',
            width: '33px',
          }} icon={faSpinner} spin />
        </div>
      </div> */}
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

                </>
                :
                <>
                  <nav id="sidebar" className={`sidebar ${isSidebarActive ? 'active' : ''} side_menu_bg custom-sidebar`}>
                    <div className="sidebar-header mt-2 side_menu_bg" >
                      <div></div>
                      <div className="media d-flex " style={{ marginLeft: '6px' }}>
                        <img
                          className="rounded-circle mt-2"
                          src="https://atik.urbanitsolution.com/web_content/img/user.png"
                          alt=""
                          width="50"
                          height="50"
                        />
                        <div className="position-relative">
                          <div className='sideLine  ' style={{ marginTop: '14px', marginLeft: '5px' }} onClick={(e) => toggleMenu(e)}>
                            <h6 className='mt-1'>
                              <span className='admin-text'>{userName}</span>
                              <p className='admin-subtext'>{userRoleName}
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

                        userss?.map((group, index) => (
                          <li key={group?.page_group_id} className=''>
                            <button
                              className={`dashboard-dropdown ${clickedButtons[index] ? 'clicked' : ''} side_menu_l1_bg`}
                              onClick={() => handleClick(index)}
                            >
                              <a
                                href={`#${group?.page_group}`}
                                data-toggle="collapse"
                                aria-expanded="false"
                                className=''
                              >
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
                                      <a href={`#${group.page_group}-${d.controller_name}`} data-toggle="collapse" aria-expanded="false" className="side_menu_l2_bg borderBottom"

                                      >
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

  );
}

export default AdminSidebar;



// 'use client'


// import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { useEffect, useState } from 'react';
// import Dropdown from 'react-bootstrap/Dropdown';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faKey, faSignOutAlt, faSpinner, faUserEdit } from '@fortawesome/free-solid-svg-icons';
// import Link from 'next/link';

// import { FaAngleDown, FaAngleRight, FaCaretDown } from 'react-icons/fa';
// import AdminHeader from '../header/page';
// import { Spinner } from 'react-bootstrap';


// const AdminSidebar = ({ sidebarOpen, child, toggleSidebar }) => {

//     const [users, setUsers] = useState([])
//     const [loading, setLoading] = useState(true);
//     const [pageGroup, setPageGroup] = useState('')
//     const [controllerName, setControllerName] = useState('')

//     const userId = sessionStorage.getItem('user_id');
//     const fullName = sessionStorage.getItem('full_name');
//     const roleName = sessionStorage.getItem('role_name');
//     const photo = sessionStorage.getItem('photo');

//     const handleLogout = () => {
//         sessionStorage.removeItem('user_id');
//         sessionStorage.removeItem('full_name');
//         sessionStorage.removeItem('role_name');
//         sessionStorage.removeItem('photo');
//         sessionStorage.removeItem('pageGroup');
//         sessionStorage.removeItem('controllerName');
//         window.location.href = '/admin/login/login';
//     };


//     useEffect(() => {
//         apiFetch();
//     }, [])

//     const apiFetch = async () => {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/group-names-id`);
//         const data = await res.json();
//         setUsers(data);
//         setLoading(false)
//     }


//     const samePageGroup = users.filter((users) => users?.page_group === pageGroup);
//     const [clickedButtons, setClickedButtons] = useState(new Array(users.length).fill(false));


//     const handleClick = (index) => {
//         const updatedClickedButtons = [...clickedButtons];
//         updatedClickedButtons[index] = !updatedClickedButtons[index];
//         setClickedButtons(updatedClickedButtons);
//     };


//     const formatString = (str) => {
//         const words = str?.split('_');

//         const formattedWords = words?.map((word) => {
//             const capitalizedWord = word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase();
//             return capitalizedWord;
//         });

//         return formattedWords?.join(' ');
//     };

//     // pageGroup localStorage
//     const handelPageGroup = (pageGroup, controllerName) => {
//         setPageGroup(pageGroup)
//         setControllerName(controllerName);
//         sessionStorage.setItem('pageGroup', pageGroup)
//         sessionStorage.setItem('controllerName', controllerName)
//     }
//     const pageGroups = sessionStorage.getItem('pageGroup')
//     const controllerNames = sessionStorage.getItem('controllerName')



//     const localSPCRemove = () => {
//         sessionStorage.removeItem('pageGroup');
//         sessionStorage.removeItem('controllerName');
//         handelPageGroup('', '')
//     }


//     return (
//         <div className=' wrapper w-100'>

//             <nav id="sidebar" className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
//                 <div className="sidebar-header mt-2">
//                     <div></div>
//                     <div className="media d-flex">
//                         <img
//                             title={fullName}
//                             className="rounded-circle mt-2 ml-1"
//                             src={`${photo}`}
//                             alt=""
//                             width="50"
//                             height="50"
//                         />

//                         <Dropdown>
//                             <Dropdown.Toggle className='text-start text-white border-0' variant="none" id="dropdown-basic">
//                                 <div className='sideLine'>
//                                     <h6 className='mt-1'>
//                                         <span className='admin-text text-left'>{fullName}</span>
//                                         <p className='admin-subtext'>{roleName}
//                                             <span className=' mb-1 ml-1'><FaCaretDown></FaCaretDown> </span>
//                                         </p>
//                                     </h6>
//                                 </div>

//                             </Dropdown.Toggle>

//                             <Dropdown.Menu className=' mt-2 ms-2'>
//                                 <Dropdown.Item href="https://atik.urbanitsolution.com/Admin/users/users_edit/2">
//                                     <FontAwesomeIcon icon={faUserEdit} />  Edit Profile
//                                 </Dropdown.Item>
//                                 <Dropdown.Item href="https://atik.urbanitsolution.com/Admin/users/change_password/2">
//                                     <FontAwesomeIcon icon={faKey} />  Change Password
//                                 </Dropdown.Item>

//                                 {
//                                     userId && <Dropdown.Item href={`/admin/login`} onClick={handleLogout}>
//                                         <FontAwesomeIcon icon={faSignOutAlt} />  Log Out
//                                     </Dropdown.Item>
//                                 }
//                             </Dropdown.Menu>
//                         </Dropdown>
//                     </div>
//                 </div>

//                 <ul className="text-white">
//                     <button onClick={localSPCRemove} className='dashboard p-2 '>
//                         <Link href='/Admin/dashboard'>Dashboard</Link>
//                     </button>

//                     {users?.map((group, index) => (
//                         <li key={index}>
//                             <button
//                                 className={`dashboard-dropdown ${clickedButtons[index] ? 'clicked' : ''}`}
//                                 onClick={() => handleClick(index)}
//                             >
//                                 <a
//                                     href={`#${group?.page_group}`}
//                                     data-toggle="collapse"
//                                     aria-expanded="false"

//                                 >
//                                     <div className="d-flex justify-content-between">
//                                         {formatString(group?.page_group)}
//                                         <div>
//                                             {clickedButtons[index] ? <FaAngleDown /> : <FaAngleRight />}
//                                         </div>
//                                     </div>
//                                 </a>
//                                 <ul className={`collapse list-unstyled ${pageGroups === group?.page_group ? 'show' : ''}`} style={{ background: '#3b5998' }} id={group?.page_group}>

//                                     <li>

//                                         {group?.controllers?.map((d, i) => (
//                                             <div key={i}>
//                                                 <a href={`#${group.page_group}-${d.controller_name}`} data-toggle="collapse" aria-expanded="false" className=" borderBottom"

//                                                 >

//                                                     <div className='d-flex justify-content-between'>
//                                                         {formatString(d.controller_name)}


//                                                         <div>
//                                                             {clickedButtons ? <FaAngleRight /> : <FaAngleDown />}
//                                                         </div>
//                                                     </div>
//                                                 </a>
//                                                 <ul className={`collapse list-unstyled ${controllerNames === d?.controller_name ? 'show' : ''}`} style={{ background: '#314B81' }} id={`${group.page_group}-${d.controller_name}`}>

//                                                     <li onClick={() => handelPageGroup((group?.page_group), (d?.controller_name))}>

//                                                         {d.display_names.map((displayName, di) => (

//                                                             <Link
//                                                                 className='border-bottom1'
//                                                                 key={di}
//                                                                 href={`/Admin/${d?.controller_name}/${displayName.method_names}?page_group=${group?.page_group}`}
//                                                             >

//                                                                 {displayName.display_name}
//                                                             </Link>
//                                                         ))}
//                                                     </li>
//                                                 </ul>
//                                             </div>
//                                         ))}
//                                     </li>
//                                 </ul>
//                             </button>
//                         </li>
//                     ))}


//                     {
//                         loading && <div className='text-center'>
//                             <div className=' my-5 py-5 mr-5 text-white'
//                               >
//                                 <FontAwesomeIcon   style={{
//                                     height: '33px',
//                                     width: '33px',
//                                 }} icon={faSpinner} spin />
//                             </div>
//                         </div>
//                     }

//                 </ul>
//             </nav>

//             {/* Header and subHeader part start  */}
//             <div id="content " className='w-100'>
//                 <AdminHeader toggleSidebar={toggleSidebar}></AdminHeader>
//                 {
//                     pageGroup && <div className='sticky-top' >
//                         <nav style={{ marginTop: '-35px' }} className="navbar  navbar-expand-lg navbar-light bg-light">
//                             <div className="container-fluid" >
//                                 <Link className="navbar-brand  text-primary" href={`/Admin/admin_page_group/admin_page_group_all/${pageGroup}`}>{formatString(pageGroup)}</Link>
//                                 <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#customNavbarCollapse" aria-controls="customNavbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
//                                     <i className="fas fa-align-justify"></i>
//                                 </button>
//                                 <div className="collapse navbar-collapse " id="customNavbarCollapse">
//                                     <ul className=" nav navbar-nav ml-auto">
//                                         {
//                                             (samePageGroup[0]?.controllers)?.map((page, i) =>
//                                                 <div key={i}>
//                                                     <div className=" ml-0 dropdown" >

//                                                         <li className="nav-item active">
//                                                             <div className="nav-link" href="#">{formatString(page?.controller_name)}

//                                                                 <span className="fa fa-caret-down ml-1"></span>
//                                                             </div>
//                                                         </li>
//                                                         <ul className="dropdown-menu nav-item active ml-0" aria-labelledby="dropdownMenuButton">
//                                                             {
//                                                                 page.display_names.map(displayNames =>

//                                                                     <>

//                                                                         <li><Link className="dropdown-item" href={`/Admin/${page?.controller_name}/${displayNames.method_names}?page_group=${pageGroup}`}>{displayNames.display_name}

//                                                                         </Link></li>
//                                                                     </>
//                                                                 )
//                                                             }

//                                                         </ul>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                     </ul>

//                                 </div>
//                             </div>
//                         </nav>
//                     </div>
//                 }


//                 {child}

//             </div>
//             {/* Header and subHeader part end  */}
//         </div>
//     );
// }

// export default AdminSidebar;













// //       {/* <ul className="text-white">
// //       <button className='dashboard p-2 '>
// //         <Link className='' href='/Admin/dashboard'>Dashboard</Link>
// //       </button>
// //       {userss?.map((group, index) => (
// //         <li key={group?.page_group_id}>
// //           <button
// //             className={`dashboard-dropdown ${clickedButtons[index] ? 'clicked' : ''}`}
// //             onClick={() => handleClick(index)}
// //           >
// //             <a
// //               href={`#${group?.page_group}`}
// //               data-toggle="collapse"
// //               aria-expanded="false"
// //             >
// //               <div className="d-flex justify-content-between">
// //                 {formatString(group?.page_group)}
// //                 <div>
// //                   {clickedButtons[index] ? <FaAngleDown /> : <FaAngleRight />}
// //                 </div>
// //               </div>
// //             </a>
// //             <ul className="collapse list-unstyled" style={{ background: '#3b5998' }} id={group?.page_group}>
// //               <li>
// //                 {group?.controllers?.map((d, controllerIndex) => (
// //                   <div key={d.controller_name}>
// //                     <a
// //                       href={`#${group.page_group}-${d.controller_name}`}
// //                       data-toggle="collapse"
// //                       aria-expanded="false"
// //                     >
// //                       <div className='d-flex justify-content-between'>
// //                         {formatString(d.controller_name)}
// //                         <div>
// //                           {clickedButtons[index] ? <FaAngleDown /> : <FaAngleRight />}
// //                         </div>
// //                       </div>
// //                     </a>
// //                     <ul className="collapse list-unstyled " style={{ background: '#314B81' }} id={`${group.page_group}-${d.controller_name}`}>
// //                       <li>
// //                         {d.display_names.map((displayName, displayNameIndex) => (
// //                           <Link
// //                             className='border-bottom'
// //                             key={displayNameIndex}
// //                             href={`/Admin/admin_page_list/admin_page_list_create?page_group=${group?.page_group}`}
// //                           >
// //                             {formatString(displayName)}{' '}
// //                           </Link>
// //                         ))}
// //                       </li>
// //                     </ul>
// //                   </div>
// //                 ))}
// //               </li>
// //             </ul>
// //           </button>
// //         </li>
// //       ))}
// //     </ul> */}




// // {/* <ul className=" text-white">
// //         {userss?.map((group, index) => (

// //           <button className={`dashboard-dropdown ${clickedButtons[index] ? 'clicked' : ''}`} onClick={() => handleClick(index)} key={group?.page_group_id}>
// //             <li>
// //               <a
// //                 href={`#${group?.page_group}`}
// //                 data-toggle="collapse"
// //                 aria-expanded="false"

// //               >
// //                 <div className="d-flex justify-content-between">
// //                   {formatString(group?.page_group)}
// //                   <div>
// //                     {clickedButtons[index] ? <FaAngleDown /> : <FaAngleRight />}
// //                   </div>
// //                 </div>
// //               </a>
// //               <ul className="collapse list-unstyled" style={{ background: '#3b5998' }} id={group?.page_group}>
// //                 <li>
// //                   {group?.controllers?.map((d) => (
// //                     <div key={d.controller_name}>
// //                       <a href={`#${d.controller_name}`} data-toggle="collapse" aria-expanded="false" className=" borderBottom">
// //                       <div className='d-flex justify-content-between'>
// //                       {formatString(d.controller_name)}
// //                         <div>
// //                     {clickedButtons[index] ? <FaAngleDown /> : <FaAngleRight />}
// //                   </div>
// //                       </div>
// //                       </a>
// //                       <ul className="collapse list-unstyled " style={{ background: '#314B81' }} id={d.controller_name}>
// //                         <li>
// //                           {d.display_names.map((displayName) => (
// //                             <Link className='border-bottom' key={displayName} href={`/Admin/admin_page_list/admin_page_list_create?page_group=${group?.page_group}`}>{formatString(displayName)} </Link>
// //                           ))}
// //                         </li>
// //                       </ul>
// //                     </div>
// //                   ))}
// //                 </li>
// //               </ul>
// //             </li>
// //           </button>
// //         ))}
// //       </ul> */}


// // {/* <ul class="text-white">
// //   <button class='dashboard p-2 '>
// //     <a class='' href='/Admin/dashboard'>Dashboard</a>
// //   </button>
// //   <li>
// //     <button class="dashboard-dropdown">
// //       <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" >
// //         <div class="d-flex justify-content-between">
// //           Dummy Heading
// //           <div>
// //             <i class="fa fa-angle-right"></i>
// //           </div>
// //         </div>
// //       </a>
// //       <ul class="collapse list-unstyled"  id="homeSubmenu">
// //         <li>
// //           <a href="#homeSubmenu1" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Home 1</a>
// //           <ul class="collapse list-unstyled"  id="homeSubmenu1">
// //             <li>
// //               <a href="#homeSubmenu2" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Home 1</a>
// //               <ul class="collapse list-unstyled"  id="homeSubmenu2">
// //                 <li>
// //                   <a href="#">Submenu 1.1</a>
// //                 </li>
// //                 <li>
// //                   <a href="#">Submenu 1.2</a>
// //                 </li>
// //               </ul>
// //             </li>
// //           </ul>
// //         </li>
// //       </ul>
// //     </button>
// //   </li>
// //   <li>
// //     <button class="dashboard-dropdown">
// //       <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Pages</a>
// //       <ul class="collapse list-unstyled"  id="pageSubmenu">
// //         <li>
// //           <a href="#">Page 1</a>
// //         </li>
// //         <li>
// //           <a href="#">Page 2</a>
// //         </li>
// //         <li>
// //           <a href="#">Page 3</a>
// //         </li>
// //       </ul>
// //     </button>
// //   </li>
// //   <li>
// //     <button class="dashboard-dropdown">
// //       <a href="#">Portfolio</a>
// //     </button>
// //   </li>
// //   <li>
// //     <button class="dashboard-dropdown">
// //       <a href="#">Contact</a>
// //     </button>
// //   </li>
// // </ul> */}



















// {/* <ul className="text-white">
//       <button className='dashboard p-2 '>
//         <Link className='' href='/Admin/dashboard'>Dashboard</Link>
//       </button>
//       {userss?.map((group, index) => (
//         <li key={group?.page_group_id}>
//           <button
//             className={`dashboard-dropdown ${clickedButtons[index] ? 'clicked' : ''}`}
//             onClick={() => handleClick(index)}
//           >
//             <a
//               href={`#${group?.page_group}`}
//               data-toggle="collapse"
//               aria-expanded="false"
//             >
//               <div className="d-flex justify-content-between">
//                 {formatString(group?.page_group)}
//                 <div>
//                   {clickedButtons[index] ? <FaAngleDown /> : <FaAngleRight />}
//                 </div>
//               </div>
//             </a>
//             <ul className="collapse list-unstyled" style={{ background: '#3b5998' }} id={group?.page_group}>
//               <li>
//                 {group?.controllers?.map((d, controllerIndex) => (
//                   <div key={d.controller_name}>
//                     <a
//                       href={`#${group.page_group}-${d.controller_name}`}
//                       data-toggle="collapse"
//                       aria-expanded="false"
//                     >
//                       <div className='d-flex justify-content-between'>
//                         {formatString(d.controller_name)}
//                         <div>
//                           {clickedButtons[index] ? <FaAngleDown /> : <FaAngleRight />}
//                         </div>
//                       </div>
//                     </a>
//                     <ul className="collapse list-unstyled " style={{ background: '#314B81' }} id={`${group.page_group}-${d.controller_name}`}>
//                       <li>
//                         {d.display_names.map((displayName, displayNameIndex) => (
//                           <Link
//                             className='border-bottom'
//                             key={displayNameIndex}
//                             href={`/Admin/admin_page_list/admin_page_list_create?page_group=${group?.page_group}`}
//                           >
//                             {formatString(displayName)}{' '}
//                           </Link>
//                         ))}
//                       </li>
//                     </ul>
//                   </div>
//                 ))}
//               </li>
//             </ul>
//           </button>
//         </li>
//       ))}
//     </ul> */}




// {/* <ul className=" text-white">
//         {userss?.map((group, index) => (

//           <button className={`dashboard-dropdown ${clickedButtons[index] ? 'clicked' : ''}`} onClick={() => handleClick(index)} key={group?.page_group_id}>
//             <li>
//               <a
//                 href={`#${group?.page_group}`}
//                 data-toggle="collapse"
//                 aria-expanded="false"

//               >
//                 <div className="d-flex justify-content-between">
//                   {formatString(group?.page_group)}
//                   <div>
//                     {clickedButtons[index] ? <FaAngleDown /> : <FaAngleRight />}
//                   </div>
//                 </div>
//               </a>
//               <ul className="collapse list-unstyled" style={{ background: '#3b5998' }} id={group?.page_group}>
//                 <li>
//                   {group?.controllers?.map((d) => (
//                     <div key={d.controller_name}>
//                       <a href={`#${d.controller_name}`} data-toggle="collapse" aria-expanded="false" className=" borderBottom">
//                       <div className='d-flex justify-content-between'>
//                       {formatString(d.controller_name)}
//                         <div>
//                     {clickedButtons[index] ? <FaAngleDown /> : <FaAngleRight />}
//                   </div>
//                       </div>
//                       </a>
//                       <ul className="collapse list-unstyled " style={{ background: '#314B81' }} id={d.controller_name}>
//                         <li>
//                           {d.display_names.map((displayName) => (
//                             <Link className='border-bottom' key={displayName} href={`/Admin/admin_page_list/admin_page_list_create?page_group=${group?.page_group}`}>{formatString(displayName)} </Link>
//                           ))}
//                         </li>
//                       </ul>
//                     </div>
//                   ))}
//                 </li>
//               </ul>
//             </li>
//           </button>
//         ))}
//       </ul> */}


// {/* <ul class="text-white">
//   <button class='dashboard p-2 '>
//     <a class='' href='/Admin/dashboard'>Dashboard</a>
//   </button>
//   <li>
//     <button class="dashboard-dropdown">
//       <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" >
//         <div class="d-flex justify-content-between">
//           Dummy Heading
//           <div>
//             <i class="fa fa-angle-right"></i>
//           </div>
//         </div>
//       </a>
//       <ul class="collapse list-unstyled"  id="homeSubmenu">
//         <li>
//           <a href="#homeSubmenu1" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Home 1</a>
//           <ul class="collapse list-unstyled"  id="homeSubmenu1">
//             <li>
//               <a href="#homeSubmenu2" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Home 1</a>
//               <ul class="collapse list-unstyled"  id="homeSubmenu2">
//                 <li>
//                   <a href="#">Submenu 1.1</a>
//                 </li>
//                 <li>
//                   <a href="#">Submenu 1.2</a>
//                 </li>
//               </ul>
//             </li>
//           </ul>
//         </li>
//       </ul>
//     </button>
//   </li>
//   <li>
//     <button class="dashboard-dropdown">
//       <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Pages</a>
//       <ul class="collapse list-unstyled"  id="pageSubmenu">
//         <li>
//           <a href="#">Page 1</a>
//         </li>
//         <li>
//           <a href="#">Page 2</a>
//         </li>
//         <li>
//           <a href="#">Page 3</a>
//         </li>
//       </ul>
//     </button>
//   </li>
//   <li>
//     <button class="dashboard-dropdown">
//       <a href="#">Portfolio</a>
//     </button>
//   </li>
//   <li>
//     <button class="dashboard-dropdown">
//       <a href="#">Contact</a>
//     </button>
//   </li>
// </ul> */}





