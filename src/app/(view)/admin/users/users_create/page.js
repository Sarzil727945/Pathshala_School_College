// 'use client'
// import Link from 'next/link';
// import React from 'react';

// const UsersCreate = () => {
//     const handleSubmit = (event) => {
//         event.preventDefault()
//         const form = event.target
//         const full_name = form.full_name.value
//         const email = form.email.value
//         const password = form.password.value
//         const confirm_password = form.confirm_password.value
//         const mobile = form.mobile.value
//         const role_name = form.role_name.value

//         // console.log(full_name, email, password, mobile, role_name)
//         const users = { full_name, email, password, mobile, role_name }


//         if(password === confirm_password){
//             fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-users`, {
//                 method: 'POST',
//                 headers: {
//                     'content-type': 'application/json'
//                 },
//                 body: JSON.stringify(users)

//             })
//                 .then(Response => Response.json())
//                 .then(data => {
//                     //   setCreatedUserEmail(email)
//                     console.log(data)
//                     if (data.acknowledged) {

//                         Swal.fire({
//                             position: 'top-end',
//                             icon: 'success',
//                             title: 'Your work has been saved',
//                             showConfirmButton: false,
//                             timer: 1500
//                           })

//                     }
//                 })
//                 .catch(error => console.error(error))
//         }
//         // form.reset('')
//     }

//     return (
//         <div>
//             <div className='p-3'>

//                 <div className=" mx-auto">
//                     <section className=" border  rounded mx-auto">
//                         <li className="list-group-item text-light  p-1 px-4" aria-current="true" style={{ background: '#4267b2' }}>
//                             <div className='d-flex justify-content-between'>
//                                 <h5 >Create Users </h5>
//                                 <button style={{ background: '#17a2b8' }} className='border-0 text-white shadow-sm rounded-1'><Link href='/Admin/users/users_list'>Back To Users List</Link></button>
//                             </div>
//                         </li>
//                         <form className='p-3' onSubmit={handleSubmit}>
//                             <div className="form-group row">
//                                 <label className="col-form-label col-md-3">Full Name:</label>
//                                 <div className="col-md-6">
//                                 <input type="text"
//                                 name='full_name' className="form-control mb-3" placeholder="Enter Full Name" />

//                                 </div>
//                             </div>
//                             <div className="form-group row">
//                                 <label className="col-form-label col-md-3">Email:</label>
//                                 <div className="col-md-6">
//                                 <input type="text" 
//                                 name='email' className="form-control mb-3" placeholder="Enter Email" />
//                                 </div>
//                             </div>
//                             <div className="form-group row">
//                                 <label className="col-form-label col-md-3">Password:</label>
//                                 <div className="col-md-6">
//                                 <input type="text"
//                                 name='password' className="form-control mb-3" placeholder="Enter Password" />
//                                 </div>
//                             </div>
//                             <div className="form-group row">
//                                 <label className="col-form-label col-md-3">Confirm Password:</label>
//                                 <div className="col-md-6">
//                                 <input 
//                                 name='confirm_password'
//                                 type="text" className="form-control mb-3" placeholder="Enter Confirm Password" />
//                                 </div>
//                             </div>
//                             <div className="form-group row">
//                                 <label className="col-form-label col-md-3">Mobile:</label>
//                                 <div className="col-md-6">
//                                 <input type="text"
//                                 name='mobile' className="form-control mb-3" placeholder="Enter Mobile" />
//                                 </div>
//                             </div>
//                             <div className="form-group row">
//                                 <label className="col-form-label col-md-3">Role Name:</label>
//                                 <div className="col-md-6">

//                                     <select required="" name="role_name" className="form-control form-control-sm  required integer_no_zero" id="role_name" placeholder="Enter Role Name">
//                                         <option>Select users Role</option>
//                                         <option value="8">Accountant</option>
//                                         <option value="6">admin</option>
//                                         <option value="9">Administrator</option>
//                                         <option value="10">Employee</option>
//                                         <option value="5">Librarian</option>
//                                         <option value="2">Student</option>
//                                         <option value="1">system_analist_admin</option>
//                                         <option value="4">Teacher</option>
//                                         <option value="12">বিভাগ প্রধান (হেফজ)</option>
//                                     </select>

//                                 </div>
//                             </div>
//                             <div className="form-group row mt-2">
//                                 <div className="offset-md-3 col-sm-6">
//                                     <input type="submit" className="btn btn-sm btn-success" value="Submit" />
//                                 </div>
//                             </div>
//                         </form>
//                     </section>
//                 </div>
//             </div>
//         </div >
//     );
// };

// export default UsersCreate;


'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const UsersCreate = () => {




  const { data: usersRole = [], isLoading, refetch
  } = useQuery({
    queryKey: ['usersRole'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/role_all`)

      const data = await res.json()
      return data
    }
  })
  console.log(usersRole)
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedRoleOTP, setSelectedRoleOTP] = useState(null);

  const handleRoleChange = (event) => {
    const selectedRoleId = event.target.value;
    setSelectedRole(selectedRoleId);

    // Find the selected role in the usersRole array
    const selectedRoleData = usersRole.find((role) => role.id === parseInt(selectedRoleId));
    
    // Update the selectedRoleOTP state based on whether the role has an OTP value
    setSelectedRoleOTP(selectedRoleData ? selectedRoleData.OTP : null);
  };

  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const full_name = form.full_name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirm_password = form.confirm_password.value;
    const mobile = form.mobile.value;
    const role_name = form.role_name.value;
    // const otp = form.otp.value;

    // Check if passwords match
    if (password !== confirm_password) {
      setPasswordError('Password and Confirm Password do not match');
      return; // Don't proceed with the submission
    }

    // If passwords match, clear any previous error
    setPasswordError('');

    const users = {
      full_name, email, password, mobile, role_name,
      OTP: selectedRoleOTP
    };
    console.log(users)
    // ${process.env.NEXT_PUBLIC_API_URL}/create-users
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(users),
    })
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => console.error(error));
  };
  

  return (
    <div>
      <div className='p-3'>
        <div className=' mx-auto'>
          <section className=' border  rounded mx-auto'>
            <li className='list-group-item text-light  p-1 px-4' aria-current='true' style={{ background: '#4267b2' }}>
              <div className='d-flex justify-content-between'>
                <h5>Create Users </h5>
                <button style={{ background: '#17a2b8' }} className='border-0 text-white shadow-sm rounded-1'>
                  <Link href='/Admin/users/users_all'>Back To Users List</Link>
                </button>
              </div>
            </li>
            <form className='p-3' onSubmit={handleSubmit}>
              <div className='form-group row'>
                <label className='col-form-label col-md-3'>Full Name:</label>
                <div className='col-md-6'>
                  <input type='text' name='full_name' className='form-control mb-3' placeholder='Enter Full Name' />
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-form-label col-md-3'>Email:</label>
                <div className='col-md-6'>
                  <input type='text' name='email' className='form-control mb-3' placeholder='Enter Email' />
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-form-label col-md-3'>Password:</label>
                <div className='col-md-6'>
                  <input type='password' name='password' className='form-control mb-3' placeholder='Enter Password' />
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-form-label col-md-3'>Confirm Password:</label>
                <div className='col-md-6'>
                  <input type='password' name='confirm_password' className='form-control mb-3' placeholder='Enter Confirm Password' />
                  {passwordError && <div className='text-danger'>{passwordError}</div>}
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-form-label col-md-3'>Mobile:</label>
                <div className='col-md-6'>
                  <input type='text' name='mobile' className='form-control mb-3' placeholder='Enter Mobile' />
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-form-label col-md-3'>Role Name:</label>
                <div className='col-md-6'>
                  <select required=''
                   onChange={handleRoleChange}
                   value={selectedRole}
                  name='role_name' className='form-control form-control-sm  required integer_no_zero' id='role_name' placeholder='Enter Role Name'>
                    <option>Select users Role</option>
                    {
                      usersRole.map(roleName =>
                        <>

                          <option value={roleName.id}>{roleName.role_name}</option>
                        


                        </>

                      )
                    }

                  </select>
                  <p >Role OTP: {selectedRoleOTP !== null ? selectedRoleOTP : ''}</p>
                </div>
              </div>

              <div className='form-group row mt-2'>
                <div className='offset-md-3 col-sm-6'>
                  <input type='submit' className='btn btn-sm btn-success' value='Submit' />
                </div>
              </div>


            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UsersCreate;