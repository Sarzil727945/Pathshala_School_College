'use client'
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

const PasswordChange = ({ id }) => {


    const { data: changePassword = [], isLoading, refetch
    } = useQuery({
        queryKey: ['changePassword'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/allUser/${id}`)
            const data = await res.json()
            return data
        }
    })

    console.log(changePassword)
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Function to handle password reset
    const handleResetPassword = async () => {
        // Check if the new password and confirm password match
        if (newPassword !== confirmPassword) {
            console.error('New password and confirm password do not match');
            return;
        }

        try {
            // Send a POST request to the server endpoint
            const response = await fetch(`http://localhost:5002/reset-password/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            // Check if the request was successful
            if (response.ok) {
                console.log('Password reset successfully');
            } else {
                console.error('Failed to reset password');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (

        <div class="bg-light border-primary shadow-sm border-0">
            <div class="card-header py-1 custom-card-header clearfix bg-gradient-primary text-white bg-primary">
                <h5 class="card-title font-weight-bold mb-0 card-header-color float-left mt-1">Change Password</h5>
                <div class="card-title font-weight-bold mb-0 card-header-color float-right"> <a href="https://atik.urbanitsolution.com/Admin/users/users_all?page_group=system_setup" class="btn btn-sm btn-info">Back to Users List</a></div>
            </div>

            <div class="card-body">
                <form class="" method="post" autocomplete="off">
                    <div class="form-group row">
                        <label class="col-form-label col-md-3">Current Password:</label>
                        <div class="col-md-6">
                            <input required="" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} class="form-control form-control-sm  required current_password" id="current_password" placeholder="Enter Current Password" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-form-label col-md-3">New Password:</label>
                        <div class="col-md-6">
                            <input type="password" required="" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} class="form-control form-control-sm  required  password" placeholder="Enter New Password" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-form-label col-md-3">Confirm New Password:</label>
                        <div class="col-md-6">
                            <input type="password" required="" class="form-control form-control-sm  required  matches_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Enter Confirm Password" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="offset-md-3 col-sm-6">
                            <input type="button" onClick={handleResetPassword} class="btn btn-sm btn-success" value="Submit" />
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default PasswordChange;
// 'use client'
// import React, { useState } from 'react';

// // PasswordChange component
// const PasswordChange = ({ id }) => {
//   // State variables for current password, new password, and confirm password
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   // Function to handle password reset
//   const handleResetPassword = async () => {
//     // Check if the new password and confirm password match
//     if (newPassword !== confirmPassword) {
//       console.error('New password and confirm password do not match');
//       return;
//     }

//     try {
//       // Send a POST request to the server endpoint
//       const response = await fetch(`http://localhost:5002/reset-password/${id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ currentPassword, newPassword }),
//       });

//       // Check if the request was successful
//       if (response.ok) {
//         console.log('Password reset successfully');
//       } else {
//         console.error('Failed to reset password');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   // Render the component
//   return (
//     <div>
//       <label>Current Password:</label>
//       <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />

//       <label>New Password:</label>
//       <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

//       <label>Confirm Password:</label>
//       <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

//       <button onClick={handleResetPassword}>Reset Password</button>
//     </div>
//   );
// };

// // Export the component
// export default PasswordChange;