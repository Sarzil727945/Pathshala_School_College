'use client'

import '../../../../globals.css'
import { Image } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';
import handleLogin from '../auth';
import { useState } from 'react';

const Login4 = () => {
    const [isEmailFocused, setEmailFocused] = useState(false);
    const [isPasswordFocused, setPasswordFocused] = useState(false);

    const handleEmailFocus = () => {
        setEmailFocused(true);
    };

    const handleEmailBlur = () => {
        setEmailFocused(false);
    };

    const handlePasswordFocus = () => {
        setPasswordFocused(true);
    };

    const handlePasswordBlur = () => {
        setPasswordFocused(false);
    };

    return (
        <div className=' login4' style={
            { height: '100vh !important', }}>
            <section className=" gradient-form bg-bubbles" >
                <div className="container py-4 h-100" >
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-6">
                            <div className="text-center text-white font-weight-bold pt-5">
                                <Image src="https://atik.urbanitsolution.com/files/logo/thumbnail/7632b474c6d5b78e3f6233a87461bf623f453c67.jpeg"
                                    style={{ width: "100px" }} alt="logo" className=' py-2' />
                                <h1 className="text-white font-weight-bold mb-0">Pathshala School &amp; College</h1>
                                <h6 className=" text-white mb-0"><span>School Management System</span></h6>
                                <p>
                                    <small className="description text-white">Dear user, log in to access the admin area!</small>
                                </p>
                            </div>

                            <form method="post" autoComplete="off" className="form pt-4" onSubmit={handleLogin}>
                                <input type="text" name="email" id="email" placeholder="Enter Email Address" required onFocus={handleEmailFocus}
                                    onBlur={handleEmailBlur}
                                    style={{ width: isEmailFocused ? '333px' : 'auto' }}
                                />
                                <br />
                                <input type="password" name="password" id="password" placeholder="Enter Password" required onFocus={handlePasswordFocus}
                                    onBlur={handlePasswordBlur}
                                    style={{ width: isPasswordFocused ? '333px' : 'auto' }}
                                />
                                <br />
                                <input type="submit" name="login" className="btn4" id="login-button" value="Log In" />
                            </form>
                        </div>
                    </div>
                </div>
                <Toaster />
            </section>
        </div>
    );
};

export default Login4;