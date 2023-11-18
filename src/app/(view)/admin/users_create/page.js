'use client'
import Link from 'next/link';
import React from 'react';

const UsersCreate = () => {
const handleSubmit = (event) => {
    event.preventDefault()
}

    return (
        <div>
            <div className='p-3'>

                <div className=" mx-auto">
                    <section className=" border  rounded mx-auto">
                        <li className="list-group-item text-light  p-1 px-4" aria-current="true" style={{ background: '#4267b2' }}>
                            <div className='d-flex justify-content-between'>
                                <h5 >Create Users </h5>
                                <button style={{ background: '#17a2b8' }} className='border-0 text-white shadow-sm rounded-1'><Link href='/AdminController/UserPageListController'>Back To Users List</Link></button>
                            </div>
                        </li>
                        <form className='p-3' onSubmit={handleSubmit}>
                            <div className="form-group row">
                                <label className="col-form-label col-md-3">Full Name:</label>
                                <div className="col-md-6">
                                <input type="text" className="form-control mb-3" placeholder="Enter Full Name" />

                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-md-3">Email:</label>
                                <div className="col-md-6">
                                <input type="text" className="form-control mb-3" placeholder="Enter Email" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-md-3">Password:</label>
                                <div className="col-md-6">
                                <input type="text" className="form-control mb-3" placeholder="Enter Password" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-md-3">Confirm Password:</label>
                                <div className="col-md-6">
                                <input type="text" className="form-control mb-3" placeholder="Enter Confirm Password" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-md-3">Mobile:</label>
                                <div className="col-md-6">
                                <input type="text" className="form-control mb-3" placeholder="Enter Mobile" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-md-3">Role Name:</label>
                                <div className="col-md-6">

                                    <select required="" name="role_name" className="form-control form-control-sm  required integer_no_zero" id="role_name" placeholder="Enter Role Name">
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
                                    <input type="submit" name="create" className="btn btn-sm btn-success" value="Submit" />
                                </div>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div >
    );
};

export default UsersCreate;