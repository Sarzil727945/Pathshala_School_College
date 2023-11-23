'use client'

import './login12.css'
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import handleLogin from '../auth';


const Login12 = () => {


    return (
        <div>
            <div  style={{
                background: '#00ba8b !important',
                padding: '15px 0px'
            }}>
                <div className=' container'>
                    <div className=' d-flex justify-content-between align-items-center'>
                        <div className=' '>
                            <Link href="https://atik.urbanitsolution.com/admin/login" className=' text-decoration-none'>
                                <h5 className="text-white">Pathshala School &amp; College</h5>
                            </Link>
                        </div>

                        <div>
                            <Link href="https://atik.urbanitsolution.com/" target="_blank" className=' text-decoration-none'>
                                <h6 className=' text-white'>Back to Homepage</h6>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

            <div className="account-container">
                <div className="content clearfix">
                    <form method="post" autoComplete="off" onSubmit={handleLogin}>
                        <p style={{ textAlign: 'center' }}>
                            <a href="https://atik.urbanitsolution.com/">
                                <img
                                    src="https://atik.urbanitsolution.com/files/logo/thumbnail/7632b474c6d5b78e3f6233a87461bf623f453c67.jpeg"
                                    alt="logo"
                                />
                            </a>
                        </p>
                        <h1>Login</h1>
                        <div className="login-fields pt-2">
                            <div className="form-outline mb-4">
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    id="form2Example11" className="form-control"
                                    placeholder="Enter Email or Mobile" />
                            </div>

                            <div className="form-outline mb-4">
                                <input
                                    required
                                    placeholder='Password'
                                    type="password"
                                    name="password"
                                    id="form2Example22" className="form-control" />
                            </div>
                        </div>
                        <div className="login-actions">
                            <input
                                type="submit"
                                name="login"
                                className="button12 btn btn-large text-white"
                                id="btnLogin"
                                value="Sign In"
                            />
                        </div>
                    </form>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Login12;
