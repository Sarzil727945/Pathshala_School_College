'use client'
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import '../../admin_layout/modal/fa.css'
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';
import '../userStyle.css'
import Link from 'next/link';
import { getAllAdminData } from '@/api/adminPage';
import { Spinner } from 'react-bootstrap';
import Pagination from "@/common/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ContentLoader from "react-content-loader";



const AdminPageListA = ({ searchParams, props }) => {

    const [users, setUsers] = useState([]);
    const [pageUsers, setPageUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        allAdminData()
    }, [])

    const allAdminData = () => {
        getAllAdminData().then(data => {
            setUsers(data)
            setLoading(false)
        })
    }
    const parentUsers = users.filter((users) => users.parent_id === 0);

    const totalData = parentUsers?.length
    const dataPerPage = 20

    const totalPages = Math.ceil(totalData / dataPerPage)

    let currentPage = 1


    if (Number(searchParams.page) >= 1) {
        currentPage = Number(searchParams.page)
    }


    let pageNumber = []
    for (let index = currentPage - 2; index <= currentPage + 2; index++) {
        if (index < 1) {
            continue
        }
        if (index > totalPages) {
            break
        }
        pageNumber.push(index)
    }



    const editIcon = []
    const copyIcon = []
    const deleteIcon = []

    for (let index = 0; index < pageUsers.length; index++) {
        const element = pageUsers[index];
        const allChildren = users.filter(u => u?.parent_id === element?.id)
        const editAll = allChildren.filter(edit => edit?.method_sort === 3)
        const copyAll = allChildren.filter(copy => copy?.method_sort === 4)
        const deleteAll = allChildren.filter(d => (d?.method_sort) === 5)
        editIcon.push(editAll)
        copyIcon.push(copyAll)
        deleteIcon.push(deleteAll)

    }

    useEffect(() => {
        getUsers();
    }, [currentPage]);

    const getUsers = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/Pagination/${currentPage}/${dataPerPage}`;
        const response = await fetch(url);
        const data = await response.json();
        setPageUsers(data);
    };

    const activePage = searchParams?.page ? parseInt(searchParams.page) : 1;


    const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure you want to delete?');
        const idArr = [id]

        const allChildren = users.filter(u => u?.parent_id === id)
        for (let index = 0; index < allChildren.length; index++) {
            const element = allChildren[index];
            idArr.push(element?.id)
        }

        for (let index = 0; index < idArr.length; index++) {
            const id = idArr[index];
            const deleteId = { id }
            if (proceed) {
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/delete`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(deleteId)
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.affectedRows > 0) {
                            Swal.fire({
                                title: 'Delete!',
                                text: 'User deleted successfully!',
                                icon: 'success',
                                confirmButtonText: 'Ok',
                            });
                        }
                        allAdminData()
                        getUsers();
                    })
            }
        }

    };


    return (
        <div className='px-3'>
            <div className=" mt-2">
                <Pagination pageNumber={pageNumber} activePage={activePage} currentPage={currentPage} totalPages={totalPages} totalData={totalData} />
            </div>

            {
                loading ? <>
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
                </> : <>
                <div className=" mx-auto my-3">
                <section className=" border  rounded mx-auto">
                    <li className="list-group-item text-light  p-1 px-4" aria-current="true" style={{ background: '#4267b2' }}>
                        <div className='d-flex justify-content-between'>
                            <h5 className='mt-2'> Admin Page List List</h5>
                            <button style={{ background: '#17a2b8' }} className='border-0 text-white shadow-sm rounded-1 rounded'><Link href='/Admin/admin_page_list/admin_page_list_create'>Create Admin Page List</Link></button>
                        </div>
                    </li>
                    <Table responsive="lg">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Display Name</th>
                                <th>Controller Name</th>
                                <th>Page Group</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pageUsers?.map((adminPageAll, index) =>
                                    <tr key={adminPageAll.id} >
                                        <td>

                                            {((currentPage - 1) * 20) + (index + 1)}

                                        </td>
                                        <td>
                                            <p className=" text-sm">
                                                {adminPageAll.display_name}
                                            </p>
                                        </td>

                                        <td>
                                            <p className=" text-sm">
                                                {adminPageAll.controller_name}
                                            </p>
                                        </td>

                                        <td>
                                            <p className=" text-sm">
                                                {adminPageAll.page_group}
                                            </p>
                                        </td>
                                        <td>
                                            <div className="flex items-center">
                                                {
                                                    editIcon[index]?.map((e, i) =>
                                                        <Link key={e?.id} href={`/Admin/admin_page_list/admin_page_list_edit/${adminPageAll.id}?page_group=${adminPageAll.page_group}`}>
                                                            <button
                                                                title='Edit'
                                                                style={{ width: "35px ", height: '30px', marginLeft: '2px' }}
                                                                className={e?.btn}
                                                            >
                                                                <div>
                                                                    <span
                                                                        dangerouslySetInnerHTML={{ __html: e?.icon }}
                                                                    ></span>
                                                                </div>

                                                            </button>
                                                        </Link>

                                                    )
                                                }
                                                {
                                                    copyIcon[index]?.map((c, i) =>
                                                        <Link key={c?.id} href={`/Admin/admin_page_list/admin_page_list_copy/${adminPageAll.id}?page_group=${adminPageAll.page_group}`}>
                                                            <button
                                                                title='Copy' style={{ width: "35px ", height: '30px', marginLeft: '2px' }}
                                                                className={c?.btn}
                                                            >
                                                                <div>
                                                                    <span
                                                                        dangerouslySetInnerHTML={{ __html: c?.icon }}
                                                                    ></span>
                                                                </div>

                                                            </button>
                                                        </Link>

                                                    )
                                                }
                                                {
                                                    deleteIcon[index]?.map((d, i) =>
                                                        <button
                                                            key={d?.id}
                                                            title='Delete'
                                                            onClick={() => handleDelete(adminPageAll.id)}
                                                            style={{ width: "35px ", height: '30px', marginLeft: '2px' }}
                                                            className={d?.btn}
                                                        >
                                                            <div>
                                                                <span
                                                                    dangerouslySetInnerHTML={{ __html: d?.icon }}
                                                                ></span>
                                                            </div>

                                                        </button>

                                                    )
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }


                            {
                                loading && <tr className='text-center'>
                                    <td colSpan='100%' className='my-5 py-5 border-bottom-0 '>
                                        <div className=' my-5 py-5 text-primary'>
                                            <FontAwesomeIcon style={{
                                                height: '40px',
                                                width: '40px',
                                            }} icon={faSpinner} spin />
                                        </div>

                                    </td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                </section>
            </div>
                </>
            }

            

            <div className=" my-4 pb-5">
                <Pagination pageNumber={pageNumber} activePage={activePage} currentPage={currentPage} totalPages={totalPages} totalData={totalData} />
            </div>

        </div>
    );
};

export default AdminPageListA;




