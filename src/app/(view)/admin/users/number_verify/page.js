
'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState } from 'react';


const NumberVerifi = ({ id }) => {

    const [error, setError] = useState('');
    const router = useRouter()


    const { data: singleUser = [], isLoading, refetch } = useQuery({
        queryKey: ['singleUser'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/allUser/${id}`);
            const data = await res.json();

            return data;
        },
    });

    console.log(singleUser[0]?.mobile)
    const verifyCode = singleUser[0]?.mobile




    function generateOTP() {

        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp.toString();
    }

    const [mobile, setMobile] = useState('');
    const quickApi = '622bfee8efc9aff53';
    const otp = generateOTP();


    const sendOTP = async () => {
        try {
            // Generate a random OTP (assuming otp is defined somewhere in your code)
            const otp = generateRandomOTP();

            // Save the OTP in local storage
            // localStorage.setItem('OTP', otp);

            // Send the OTP via send-otp endpoint
            if (verifyCode === mobile) {
                const responseSendOTP = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/send-otp`, {
                    quick_api: quickApi,
                    mobile: mobile,
                    msg: `Your OTP is ${otp}`,
                });
                console.log(responseSendOTP.data);
                const responseVerifyOTP = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/update/verification_code/${id}`, {
                    verifiy_codes: otp,
                    OTP: '1',
                });

                console.log(responseVerifyOTP.status);
                console.log(responseVerifyOTP.data);
                console.log(responseVerifyOTP.OTP);
                // Verify the OTP by making a request to the verification endpoint
                // https://quicksmsapp.com/Api/sms/campaign_api?quick_api=622bfee8efc9aff53&mobile=01774412135&msg=Your+otp+is+123456
                // const URL = `https://quicksmsapp.com/Api/sms/campaign_api?quick_api=622bfee8efc9aff53&mobile=${InputValue}&msg=Your+otp+is+${otp}`;
                // const URL = `http://168.192.0.112:5002/send-otp/13696`;
                // const URL = "https://erp.urbanitsolution.com/Api/users/users_forget_password_otp/";
            }
            else {
                setError('Number Not Found')
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
                <h5 class="card-title font-weight-bold mb-0 card-header-color float-left mt-1">Number Verify</h5>
                <div class="card-title font-weight-bold mb-0 card-header-color float-right">
                    <a href="https://atik.urbanitsolution.com/Admin/users/users_all?page_group=system_setup" class="btn btn-sm btn-info">Back to Users List</a>
                </div>
            </div>
            <div class="card-body">
                <form class="" method="post" autocomplete="off">
                    <div class="form-group row">
                        <label class="col-form-label col-md-3"> Number</label>
                        <div class="col-md-6">
                            <input
                                type="text"
                                placeholder="Enter mobile number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
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

export default NumberVerifi;

