
'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState } from 'react';


const EmailVerifi = ({ id }) => {

    const [error, setError] = useState('');
    const router = useRouter()


    const { data: singleUsers = [], isLoading, refetch } = useQuery({
        queryKey: ['singleUsers'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/allUser/${id}`);
            const data = await res.json();

            return data;
        },
    });

    console.log(singleUsers[0]?.mobile)
    const verifyCode = singleUsers[0]?.email






    const [email, setEmail] = useState('');



    const sendOTP = async () => {
        try {
            // Generate a random OTP (assuming otp is defined somewhere in your code)
            const otp = generateRandomOTP();

            // Save the OTP in local storage
            // localStorage.setItem('OTP', otp);

            // Send the OTP via send-otp endpoint
            if (verifyCode === email) {
                // ${process.env.NEXT_PUBLIC_API_URL}/send-otp-email
                const responseSendOTP = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/send-otp/email`, {
                     email,
                    // msg: `Your OTP is ${otp}`,

                });
                console.log(responseSendOTP.data);
                console.log(`responseSendOTP.data`);
                // ${process.env.NEXT_PUBLIC_API_URL}/update/verification_code/${id}
                // const responseVerifyOTP = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/update/verification_code_email/${id}`, {
                //     email_verifiy_code: otp,
                //     OTP: '1',
                // });

                // console.log(responseVerifyOTP.status);
                // console.log(responseVerifyOTP.data);
                // console.log(responseVerifyOTP.OTP);
                // Verify the OTP by making a request to the verification endpoint
                // https://quicksmsapp.com/Api/sms/campaign_api?quick_api=622bfee8efc9aff53&mobile=01774412135&msg=Your+otp+is+123456
                // const URL = `https://quicksmsapp.com/Api/sms/campaign_api?quick_api=622bfee8efc9aff53&mobile=${InputValue}&msg=Your+otp+is+${otp}`;
                // const URL = `http://168.192.0.112:5002/send-otp/13696`;
                // const URL = "https://erp.urbanitsolution.com/Api/users/users_forget_password_otp/";
            }
            else {
                setError('Email Not Found')
            }



            // Redirect to the OTP verification page
            router.push(`/Admin/users/verification_otp/${id}`);


        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    // Function to generate a random 6-digit OTP
    const generateRandomOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };





    return (
        <div class="bg-light border-primary shadow-sm border-0">

            <div class="card-header py-1 custom-card-header clearfix bg-gradient-primary text-white bg-primary">
                <h5 class="card-title font-weight-bold mb-0 card-header-color float-left mt-1">Email Verify</h5>
                <div class="card-title font-weight-bold mb-0 card-header-color float-right">
                    <a href="https://atik.urbanitsolution.com/Admin/users/users_all?page_group=system_setup" class="btn btn-sm btn-info">Back to Users List</a>
                </div>
            </div>
            <div class="card-body">
                <form class="" method="post" autocomplete="off">
                    <div class="form-group row">
                        <label class="col-form-label col-md-3">Email </label>
                        <div class="col-md-6">
                            <input
                                type="text"
                                placeholder="Enter mobile number"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                class="form-control form-control-sm  required current_password" id="current_password" />
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </div>
                    </div>


                    <div class="offset-md-3 col-sm-6">
                        <Link href=''>
                            <input
                                onClick={sendOTP}
                                class="btn btn-sm btn-success" type="button" value="Submit" />
                        </Link>
                    </div>

                </form>
            </div>
        </div>

    );
};

export default EmailVerifi;
// import React, { useState, useRef } from 'react';
// import axios from 'axios';

// const EmailVerifi = () => {
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [message, setMessage] = useState('');
//   const inputRefs = useRef([]);

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handleOtpChange = (index, value) => {
//     const updatedOtp = [...otp];
//     updatedOtp[index] = value;

//     // Move to the next input field if a digit is entered
//     if (value !== '' && index < 5) {
//       inputRefs.current[index + 1].focus();
//     }

//     setOtp(updatedOtp);
//   };

//   const handleSendOTP = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/send-otp', {
//         email,
//       });

//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage('Error sending OTP. Please try again.');
//     }
//   };

//   const handleVerifyOTP = async () => {
//     const enteredOtp = otp.join('');

//     try {
//       const response = await axios.post('http://localhost:3000/verify-otp', {
//         email,
//         otp: enteredOtp,
//       });

//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage('Error verifying OTP. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h1>Email OTP Sender</h1>
//       <label>
//         Email:
//         <input type="email" value={email} onChange={handleEmailChange} />
//       </label>
//       <button onClick={handleSendOTP}>Send OTP</button>
//       <p>{message}</p>

//       <div>
//         <h2>Verify OTP</h2>
//         {[0, 1, 2, 3, 4, 5].map((index) => (
//           <input
//             key={index}
//             type="number"
//             min="0"
//             max="9"
//             value={otp[index]}
//             onChange={(e) => handleOtpChange(index, e.target.value)}
//             onKeyDown={(e) => {
//               // Move to the previous input field if the Backspace key is pressed
//               if (e.key === 'Backspace' && index > 0) {
//                 inputRefs.current[index - 1].focus();
//               }
//             }}
//             ref={(inputRef) => (inputRefs.current[index] = inputRef)}
//             style={{ width: '2em', marginRight: '5px' }}
//           />
//         ))}
//         <button onClick={handleVerifyOTP}>Verify OTP</button>
//       </div>
//     </div>
//   );
// };

// export default EmailVerifi;

// import React, { useState, useRef } from 'react';
// import axios from 'axios';

// const EmailVerifi = () => {
//     const [email, setEmail] = useState('');
//     const [otp, setOtp] = useState(['', '', '', '', '', '']);
//     const [message, setMessage] = useState('');
//     const inputRefs = useRef([null, null, null, null, null, null]);


//     const handleOtpChange = (index, value) => {
//         const updatedOtp = [...otp];
//         updatedOtp[index] = value;

//         // Move to the next input field if a digit is entered
//         if (value !== '' && index < 5 && inputRefs.current[index + 1]) {
//             inputRefs.current[index + 1].focus();
//         }

//         setOtp(updatedOtp);
//     };



//     const handleVerifyOTP = async () => {
//         const enteredOtp = otp.join('');

//         try {
//             const response = await axios.post('', {
//                 email,
//                 otp: enteredOtp,
//             });

//             setMessage(response.data.message);
//             console.log(enteredOtp, 'inputRefs')
//         } catch (error) {
//             setMessage('Error verifying OTP. Please try again.');
//         }
//     };

//     return (
//         <div>
//             <h2>Verify OTP</h2>
//             <input
//                 type="number"
//                 min="0"
//                 max="9"
//                 value={otp[0]}
//                 onChange={(e) => handleOtpChange(0, e.target.value)}
//                 ref={(inputRef) => (inputRefs.current[0] = inputRef)}
//                 style={{ width: '2em', marginRight: '5px' }}
//             />
//             <input
//                 type="number"
//                 min="0"
//                 max="9"
//                 value={otp[1]}
//                 onChange={(e) => handleOtpChange(1, e.target.value)}
//                 ref={(inputRef) => (inputRefs.current[1] = inputRef)}
//                 style={{ width: '2em', marginRight: '5px' }}
//             />
//             <input
//                 type="number"
//                 min="0"
//                 max="9"
//                 value={otp[2]}
//                 onChange={(e) => handleOtpChange(2, e.target.value)}
//                 ref={(inputRef) => (inputRefs.current[2] = inputRef)}
//                 style={{ width: '2em', marginRight: '5px' }}
//             />
//             <input
//                 type="number"
//                 min="0"
//                 max="9"
//                 value={otp[3]}
//                 onChange={(e) => handleOtpChange(3, e.target.value)}
//                 ref={(inputRef) => (inputRefs.current[3] = inputRef)}
//                 style={{ width: '2em', marginRight: '5px' }}
//             />
//             <input
//                 type="number"
//                 min="0"
//                 max="9"
//                 value={otp[4]}
//                 onChange={(e) => handleOtpChange(4, e.target.value)}
//                 ref={(inputRef) => (inputRefs.current[4] = inputRef)}
//                 style={{ width: '2em', marginRight: '5px' }}
//             />
//             <input
//                 type="number"
//                 min="0"
//                 max="9"
//                 value={otp[5]}
//                 onChange={(e) => handleOtpChange(5, e.target.value)}
//                 ref={(inputRef) => (inputRefs.current[5] = inputRef)}
//                 style={{ width: '2em', marginRight: '5px' }}
//             />
//             <button onClick={handleVerifyOTP}>Verify OTP</button>
//         </div>

//     );
// };

// export default EmailVerifi;






