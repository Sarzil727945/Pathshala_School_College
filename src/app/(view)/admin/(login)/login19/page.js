'use client'

import '../../../../globals.css'
import { Image } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';
import handleLogin from '../auth';

const Login19 = () => {

    return (
        <section style={{
            backgroundColor: "#ffff00",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='0' cy='800' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ff8000'/%3E%3Cstop offset='1' stop-color='%23ff8000' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='1200' cy='800' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%2300ff19'/%3E%3Cstop offset='1' stop-color='%2300ff19' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='c' cx='600' cy='0' r='600' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%239900ff'/%3E%3Cstop offset='1' stop-color='%239900ff' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='d' cx='600' cy='800' r='600' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffff00'/%3E%3Cstop offset='1' stop-color='%23ffff00' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='e' cx='0' cy='0' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23FF0000'/%3E%3Cstop offset='1' stop-color='%23FF0000' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='f' cx='1200' cy='0' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%230CF'/%3E%3Cstop offset='1' stop-color='%230CF' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='1200' height='800'/%3E%3Crect fill='url(%23b)' width='1200' height='800'/%3E%3Crect fill='url(%23c)' width='1200' height='800'/%3E%3Crect fill='url(%23d)' width='1200' height='800'/%3E%3Crect fill='url(%23e)' width='1200' height='800'/%3E%3Crect fill='url(%23f)' width='1200' height='800'/%3E%3C/svg%3E")`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
             // height: '100vh !important',

        }} >
            <div className="container py-4" >
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-xl-5">
                        <div className="text-center text-white font-weight-bold">
                            <Image src="https://atik.urbanitsolution.com/files/logo/thumbnail/7632b474c6d5b78e3f6233a87461bf623f453c67.jpeg"
                                style={{ width: "100px" }} alt="logo" />
                            <h2 className="text-white font-weight-bold pt-3 pb-1">Pathshala School &amp; College</h2>
                            <h6 className="text-white mb-0 py-1"><span>School Management System</span></h6>
                            <p>
                                <small className="text-white">Dear user, log in to access the admin area!</small>
                            </p>
                        </div>
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-12">
                                    <div className="card-body mx-md-4 p-lg-10  mx-lg-4">
                                        <form onSubmit={handleLogin}>
                                            <h2 className='text-center mb-5 pt-3'>Log In</h2>

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
                                            <div className="text-center pt-1 mb-5 mt-2">
                                                <input
                                                    className="btn 25 px-4 btn btn-outline-success mt-2" type="submit" value="Login In" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </section>
    );
};

export default Login19;