'use client'
import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';
import { useState } from 'react';
import '../userStyle.css'
import { HiEye, HiPencilAlt, HiTrash } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
import { FaTrashAlt } from "react-icons/fa";
import Link from 'next/link';

const UsersList = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/allUser`)
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            })
    }, [])


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
                    <li className="list-group-item text-light  p-1 px-4" aria-current="true" style={{background: '#4267b2'}}>
                      <div className='d-flex justify-content-between'>
                      <h5 > Users List</h5>
                        <button style={{background: '#17a2b8'}} className='border-0 text-white shadow-sm rounded-1'><Link href='/AdminController/CreateUsersController'>Create Users</Link></button>
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
                        <th>Created date</th>
                        <th>Modified date</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        slicedItems?.map((allUser, i) =>
                            <tr key={allUser.id} >
                                <td>
                                    {i + 1}
                                </td>
                                <td>
                                    <p className=" text-sm">
                                        {allUser.full_name}
                                    </p>
                                </td>

                                <td>
                                    <p className=" text-sm">
                                        {allUser.email}
                                    </p>
                                </td>
                                <td>
                                    <p className=" text-sm">
                                        {allUser.mobile}
                                    </p>
                                </td>
                                <td>
                                    <p className=" text-sm">
                                        {allUser.role_name}
                                    </p>
                                </td>
                                <td>
                                    <p className=" text-sm">
                                        {allUser.created_date}
                                    </p>
                                </td>
                                <td>

                                    <p className=" text-sm">
                                        {allUser.modified_date}
                                    </p>

                                </td>
                                <td className="">
                                    <div className="flex items-center ">
                                        <button
                                            style={{ width: "35px ", height: '30px', marginLeft: '2px' }}
                                            className=" rounded border-0 bg-success text-white
                                        
                                            "
                                        >

                                            <HiEye></HiEye>
                                        </button>
                                        <Link href={`/AdminController/UserPageListController/update/${allUser.id}`}>

                                            <button
                                                style={{ width: "35px ", height: '30px', marginLeft: '2px', }}
                                                className=" rounded border-0 bg-primary text-white 
                                         
                                            "
                                            >

                                                <HiPencilAlt></HiPencilAlt>
                                            </button>
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(allUser.id)}
                                            style={{ width: "35px ", height: '30px', marginLeft: '2px' }}
                                            className=" rounded border-0 bg-danger text-white
                                           
                                            "
                                        >
                                            <FaTrashAlt></FaTrashAlt>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
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