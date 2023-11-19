'use client'

import '../../../../globals.css'
import { Toaster } from 'react-hot-toast';
import handleLogin from '../auth';

const Login5 = () => {

    return (
        <div
            style={{
                backgroundColor: "#e9e9e9",
                color: "#666666",
                height: '100vh !important',
            }}
        >

            <section className=" gradient-form " >
                <div className="container py-5 h-100" >
                    <div className="row pb-5">
                        <div className="col-md-8 offset-md-2 justify-content-center align-items-center" style={{ padding: '46px 0px' }}>
                            <div className="row no-gutters shadow justify-content-center align-items-center bg-white m-3 rounded h-100">

                                {/* Left Side */}
                                <div className="col-12 col-md-6 text-center align-self-center h-100" style={{ background: 'rgba(185,101,86,.8)' }}>
                                    <form method="post" autoComplete="off" >
                                        <div className="fdb-box">
                                            <div className="row">
                                                <div className="col px-5 py-5">
                                                    <a href="https://atik.urbanitsolution.com/" className="text-center">
                                                        <img src="https://atik.urbanitsolution.com/files/logo/thumbnail/7632b474c6d5b78e3f6233a87461bf623f453c67.jpeg" alt="logo" />
                                                    </a>
                                                    <h2 className="text-white font-weight-bold pt-2">Pathshala School & College</h2>
                                                    <h6 className="text-white mb-0"><span>School Management System</span></h6>
                                                    <p className="description text-white">Dear user, log in to access the admin area!</p>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                {/* Right Side */}
                                <div className="col-12 col-md-6 text-center bg-white px-5 py-3">
                                    <form method="post" autoComplete="off" onSubmit={handleLogin}>
                                        <div className="fdb-box">
                                            <div className="row">
                                                <div className="col">
                                                    <h2 className="text-dark">Log In</h2>
                                                </div>
                                            </div>
                                            <div className="row mt-4">
                                                <div className="col">
                                                    <input type="text" className="form-control" name="email" id="email" placeholder="Enter Email or Mobile" />
                                                    <div className="col-md-offset-2"></div>
                                                </div>
                                            </div>
                                            <div className="row mt-4">
                                                <div className="col">
                                                    <input type="password" name="password" className="form-control mb-1" placeholder="Password" />
                                                    <div className="col-md-offset-2"></div>
                                                </div>
                                            </div>
                                            <div className="row mt-4">
                                                <div className="col ">
                                                    <input type="submit" name="login" className="btn5 px-4 py-2 rounded" value="Login In"
                                                    />
                                                </div>
                                            </div>
                                        </div>
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

export default Login5;