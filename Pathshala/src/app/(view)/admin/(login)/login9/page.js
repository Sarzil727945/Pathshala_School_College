'use client'

import '../../../../globals.css'
import { Image } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';
import handleLogin from '../auth';

const Login9 = () => {

    return (
        <div style={{
            backgroundColor: "#e9e9e9",
            color: "#666666",
            height: '100vh !important',

        }}
        >

            <section className=" gradient-form " >
                <div className="container py-4 h-100" >
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-6">
                            <div className="text-center text-white font-weight-bold mb-5 pt-4">
                                <h1 className=" text-muted font-weight-bold pt-3 pb-1">Pathshala School &amp; College</h1>
                                <h4 className=" text-white mb-0 py-1"><span>School Management System</span></h4>
                                <p>
                                    <small className="description text-white">Dear user, log in to access the admin area!</small>
                                </p>
                            </div>

                        <div className=' pb-5 '>
                        <div className="form-module py-5 px-4">
                                <form method="post" autoComplete="off" onSubmit={handleLogin}>
                                    <h2>Login</h2>
                                    <div className=' pt-2' style={{ marginBottom: '13px' }}>
                                        <input type="email" name="email" placeholder="Enter Email Address" required />
                                    </div>
                                    <div style={{ marginBottom: '13px' }} className=' py-2'>
                                        <input type="password" name="password" placeholder="Enter Password" required />
                                    </div>
                                    <input type="submit" name="login" className="btn3" id="login-button" value="Login" />
                                </form>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <Toaster />
            </section>
        </div>
    );
};

export default Login9;