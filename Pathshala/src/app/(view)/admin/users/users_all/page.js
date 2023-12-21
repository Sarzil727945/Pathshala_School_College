'use client'
import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';
import { useState } from 'react';
import '../../userStyle.css'
import { HiEye, HiPencilAlt, HiTrash } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
import { FaTrashAlt } from "react-icons/fa";
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import '../../../admin_layout/modal/fa.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FaKey } from "react-icons/fa6";

const UsersList = () => {

    const getPageGroup = localStorage.getItem('pageGroup')

    const { data: users = [], isLoading, refetch
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/allUser`)

            const data = await res.json()
            return data
        }
    })

    const [btnIconUsers, setBtnIconUsers] = useState([])
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
            .then(Response => Response.json())
            .then(data => setBtnIconUsers(data))


    }, [])
    // const remove = btnIconUsers.filter(btn => 
    //     btn.method_name !== btn.controller_name + '_create' && 
    //     btn.method_name !== btn.controller_name + '_all' &&
    //     btn.method_name !== btn.display_name === 'Users'
    //   );

    const filteredBtnIconEdit = btnIconUsers.filter(btn =>
        btn.method_sort === 3
    );

    const filteredBtnIconDelete = btnIconUsers.filter(btn =>
        btn.method_sort === 5
    );
    const filteredBtnIconCreate = btnIconUsers.filter(btn =>
        btn.method_sort === 1
    );

    //    console.log(remove, 'remove')
    console.log(btnIconUsers)
    // paigination Start
    const itemsPerPage = 20;



    const [currentPage, setCurrentPage] = useState(0);

    const pageCount = Math.ceil(users?.length / itemsPerPage);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const slicedItems = users?.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage

    );

    // paigination end

    const handleDelete = id => {

        console.log(id)
        const proceed = window.confirm('Are You Sure delete')
        if (proceed) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/allUser/${id}`, {
                method: "DELETE",

            })
                .then(Response => Response.json())
                .then(data => {

                    if (data.affectedRows > 0) {
                        refetch()
                        Swal.fire({
                            title: 'delete!',
                            text: 'user delete Successful !!',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                        console.log(data)
                    }
                })
        }
    }
    return (
        <div className='p-3'>

            <div className=" mx-auto">
                <section className=" border  rounded mx-auto">
                    <li className="list-group-item text-light  p-1 px-4" aria-current="true" style={{ background: '#4267b2' }}>
                        <div className='d-flex justify-content-between'>
                            <h5 > Users List</h5>
                            {
                                filteredBtnIconCreate.map((filteredBtnIconCreate =>


                                    <div key={filteredBtnIconCreate.id} >
                                        <button style={{ background: '#17a2b8', border: "none", }}
                                            className={`${filteredBtnIconCreate.btn} rounded p-1`} ><Link href='/Admin/users/users_create'>Create Users</Link></button>
                                    </div>

                                ))
                            }
                        </div>
                    </li>
                    <Table responsive="lg">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Role</th>

                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                slicedItems?.map((allUser, i) =>
                                    <tr key={allUser.id} >
                                        <td>
                                            {currentPage * itemsPerPage + i + 1}
                                        </td>
                                        <td>
                                            <p className=" text-sm">
                                                {allUser?.full_name}
                                            </p>
                                        </td>

                                        <td>
                                            <p className=" text-sm">
                                                {allUser?.email}
                                            </p>
                                        </td>
                                        <td>
                                            <p className=" text-sm">
                                                {allUser?.mobile}
                                            </p>
                                        </td>
                                        <td>
                                            <p className=" text-sm">
                                                {allUser?.role_name}
                                            </p>
                                        </td>

                                        <td className="">
                                            <div className="flex items-center ">


                                                {/* <button
                                                            key={btnIconUser.id}
                                                            title='Edit'
                                                            style={{ width: "35px ", height: '30px', marginLeft: '5px', marginTop: '5px' }}
                                                            className={btnIconUser?.btn}
                                                        >
                                                            <a
                                                                dangerouslySetInnerHTML={{ __html: btnIconUser?.icon }}
                                                            ></a>
                                                            <Link href={`/Admin/users/edit_users/${allUser.id}`}>
                                                           
                                                            
                                                            </Link>
                                                        </button> */}


                                                <Link href={`/Admin/users/edit_users/${allUser.id}?page_group=${getPageGroup}`}>
                                                    {
                                                        filteredBtnIconEdit.map((filteredBtnIconEdit =>

                                                            <button
                                                                key={filteredBtnIconEdit.id}
                                                                title='Edit'
                                                                style={{ width: "35px ", height: '30px', marginLeft: '5px', marginTop: '5px' }}
                                                                className={filteredBtnIconEdit?.btn}
                                                            >

                                                                <a
                                                                    dangerouslySetInnerHTML={{ __html: filteredBtnIconEdit?.icon }}
                                                                ></a>
                                                            </button>

                                                        ))
                                                    }

                                                </Link>
                                                <Link href={`/Admin/users/change_password/${allUser.id}?page_group=${getPageGroup}`}>
                                                    {
                                                        filteredBtnIconEdit.map((filteredBtnIconEdit =>

                                                            <button
                                                                key={filteredBtnIconEdit.id}
                                                                title='Update'
                                                                style={{ width: "35px ", height: '30px', marginLeft: '5px', marginTop: '5px' }}
                                                                className={filteredBtnIconEdit?.btn}
                                                            >
                                                                <FaKey></FaKey>
                                                                {/* <a
                                                                    dangerouslySetInnerHTML={{ __html: filteredBtnIconEdit?.icon }}
                                                                ></a> */}
                                                            </button>

                                                        ))
                                                    }

                                                </Link>

                                                {
                                                    filteredBtnIconDelete.map((filteredBtnIconDelete =>
                                                        <button
                                                            key={filteredBtnIconDelete.id}
                                                            title='Delete'
                                                            onClick={() => handleDelete(allUser.id)}
                                                            style={{ width: "35px ", height: '30px', marginLeft: '5px', marginTop: '5px' }}
                                                            className={filteredBtnIconDelete?.btn}
                                                        >
                                                            <a
                                                                dangerouslySetInnerHTML={{ __html: filteredBtnIconDelete?.icon }}
                                                            ></a>
                                                        </button>

                                                    ))
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                            {
                                isLoading && <div className='text-center'>
                                    <div className=' my-5 py-5 mr-5 text-white'
                                    >
                                        <FontAwesomeIcon style={{
                                            height: '33px',
                                            width: '33px',
                                        }} icon={faSpinner} spin />
                                    </div>
                                </div>
                            }
                        </tbody>
                    </Table>
                </section>
            </div>
            <div className=" mt-5 ">
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={0}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            </div>
        </div>
    );
};

export default UsersList;