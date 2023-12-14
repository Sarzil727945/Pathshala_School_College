'use client'
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import '../../../admin_layout/modal/fa.css'
import Swal from 'sweetalert2';

const UsersRoleList = () => {

    const { data: usersRole = [], isLoading, refetch
    } = useQuery({
        queryKey: ['usersRole'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/role`)

            const data = await res.json()
            return data
        }
    })
    console.log(usersRole)

    const [btnIconUsers, setBtnIconUsers] = useState([])
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-role/btn`)
            .then(Response => Response.json())
            .then(data => setBtnIconUsers(data))


    }, [])

    const filteredBtnIconEdit = btnIconUsers.filter(btn =>
        btn.method_sort === 3
    );
    console.log(filteredBtnIconEdit)
    const filteredBtnIconDelete = btnIconUsers.filter(btn =>
        btn.method_sort === 5
    );
    const filteredBtnIcon = btnIconUsers.filter(btn =>
        btn.method_sort === 3
    );
    const filteredBtnCreate = btnIconUsers.filter(btn =>
        btn.method_sort === 1
    );
    console.log(filteredBtnCreate[0], 'create')

    // console.log(usersRole?.users[0]?.id)

    const handleDelete = (id) => {
        console.log(id)

        const proceed = window.confirm('Are You Sure delete')
        if (proceed) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/user-role/delete/${id}`, {
                method: "DELETE",

            })
                .then(Response => Response.json())
                .then(data => {
                    console.log(data)

                    refetch()
                    // if (data.affectedRows > 0) {
                    //     Swal.fire({
                    //         title: 'delete!',
                    //         text: 'user delete Successful !!',
                    //         icon: 'success',
                    //         confirmButtonText: 'Ok'
                    //     })
                    // }
                })
        }
    }

    
    



    return (
        <div className="col-md-12 bg-light body-content  p-4">

                <div className="alert alert-success font-weight-bold">
                    Data saved Successfully
                </div>
   
        
       
     
              
            <div

                className=" border-primary shadow-sm border-0">
                <div
                    style={{ backgroundColor: '#4267b2' }}
                    className="card-header custom-card-header  py-1 clearfix  text-white ">
                    <h5 className="card-title card-header-color font-weight-bold mb-0  float-left mt-1">User Role List</h5>
                    <div className="card-title card-header-color font-weight-bold mb-0  float-right">
                        <Link href={`/Admin/${filteredBtnCreate[0]?.controller_name}/${filteredBtnCreate[0]?.method_name}?page-group=${filteredBtnCreate[0]?.page_group}`} className="btn btn-sm btn-info">Create User role</Link></div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover table-striped table-sm ">
                            <tbody><tr>
                                <th>Role Name</th>
                                <th>Action</th>
                            </tr>
                                {
                                    usersRole?.users?.map(userRle =>


                                        <tr key={userRle.id}>
                                            <td>{userRle.role_name}</td>

                                            <td>
                                                <Link href={`/Admin/${filteredBtnIcon.map(btn => btn.controller_name)}/${filteredBtnIcon.map(btn => btn.method_name)}/${userRle.id}?page_group=${filteredBtnIcon.map(btn => btn.page_group)}`}>
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

                                                {
                                                    filteredBtnIconDelete.map((filteredBtnIconDelete =>
                                                        <button
                                                            key={filteredBtnIconDelete.id}
                                                            title='Delete'
                                                            onClick={() => handleDelete(userRle.id)}
                                                            style={{ width: "35px ", height: '30px', marginLeft: '5px', marginTop: '5px' }}
                                                            className={filteredBtnIconDelete?.btn}
                                                        >
                                                            <a
                                                                dangerouslySetInnerHTML={{ __html: filteredBtnIconDelete?.icon }}
                                                            ></a>
                                                        </button>

                                                    ))
                                                }

                                            </td>
                                        </tr>
                                    )
                                }


                            </tbody></table>
                    </div>
                    <div className="w-100 justify-content-around font-weight-bold">
                        <p className="float-left mb-0 my-2">Showing 1 to 9 of 9 results.</p>
                    </div>
                </div >
            </div >
        </div >
    );
};

export default UsersRoleList;