'use client'
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Swal from 'sweetalert2';


const UpdateUsers = ({ id }) => {


    const { data: adminPageListSingle = [], isLoading, refetch
    } = useQuery({
        queryKey: ['adminPageListSingle'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/allUser/${id}`)
            const data = await res.json()
            return data
        }
    })

    const information = adminPageListSingle[0]
   

    const [editProfile, setEditProfile] = useState(adminPageListSingle)
    console.log(editProfile)

    const handleEditHome = event => {
        event.preventDefault()
        const form = event.target;
        const full_name = form.full_name.value
        const email = form.email.value
        const mobile = form.mobile.value
        const role_name = form.role_name.value
        const editProfileU = {full_name, email, mobile, role_name}
        
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateUsers/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(editProfileU)
        })
            .then(Response => Response.json())
            .then(data => {
                console.log(data)

                if (data.changedRows > 0) {
                    refetch()
                    Swal.fire(
                        'Good job!',
                        'You clicked the button!',
                        'success'
                    )
                }
                else {
                    Swal.fire(
                        'Good job!',
                        'You clicked the button!',
                        'error'
                    )
                }

            })
    }

    const handleChange = event => {
        const field = event.target.name
        const value = event.target.value
        const review = { ...editProfile }
        review[field] = value
        setEditProfile(review)
    }

    return (
        <div>
            <div className='p-3'>

                <div className=" mx-auto">
                    <section className=" border  rounded mx-auto">
                        <li className="list-group-item text-light  p-1 px-4" aria-current="true" style={{ background: '#4267b2' }}>
                            <div className='d-flex justify-content-between'>
                                <h5 >Create Users </h5>
                                <button style={{ background: '#17a2b8' }} className='border-0 text-white shadow-sm rounded-1'><Link href='/Admin/users/users_all'>Back To Users List</Link></button>
                            </div>
                        </li>
                        <form className='p-3' onSubmit={handleEditHome}>
                            <div className="form-group row">
                                <label className="col-form-label col-md-3">Full Name:</label>
                                <div className="col-md-6">
                                    <input type="text"
                                        onChange={handleChange}
                                        defaultValue={information?.full_name}
                                        name='full_name' className="form-control mb-3" placeholder="Enter Full Name" />

                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-md-3">Email:</label>
                                <div className="col-md-6">
                                    <input type="text"
                                        onChange={handleChange}
                                        defaultValue={information?.email}
                                        name='email' className="form-control mb-3" placeholder="Enter Email" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-md-3">Mobile:</label>
                                <div className="col-md-6">
                                    <input type="text" 
                                    onChange={handleChange}
                                    defaultValue={information?.mobile}
                                        name='mobile' className="form-control mb-3" placeholder="Enter Mobile" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-md-3">Role Name:</label>
                                <div className="col-md-6">

                                    <select required="" name="role_name" onChange={handleChange} className="form-control form-control-sm  required integer_no_zero" placeholder="Enter Role Name" defaultValue={information?.role_name}>
                                        <option>Select users Role</option>
                                        <option value="8">Accountant</option>
                                        <option value="6">admin</option>
                                        <option value="9">Administrator</option>
                                        <option value="10">Employee</option>
                                        <option value="5">Librarian</option>
                                        <option value="2">Student</option>
                                        <option value="1">system_analist_admin</option>
                                        <option value="4">Teacher</option>
                                        <option value="12">বিভাগ প্রধান (হেফজ)</option>
                                    </select>

                                </div>
                            </div>
                            <div className="form-group row mt-2">
                                <div className="offset-md-3 col-sm-6">
                                    <input type="submit" className="btn btn-sm btn-success" value="Submit" />
                                </div>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div >
    );
};

export default UpdateUsers;

