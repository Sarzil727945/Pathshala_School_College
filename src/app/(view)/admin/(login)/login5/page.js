'use client'

import '../../../../globals.css'
import { Image } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';
import handleLogin from '../auth';

const Login5 = () => {

    return (
        <div style={{
            backgroundColor: "#ff9d00",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%23ff9d00' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23fb8d17' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23f47d24' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23ed6e2d' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23e35f34' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23d85239' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23cc453e' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23be3941' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23b02f43' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23a02644' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23901e44' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23801843' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%236f1341' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%235e0f3d' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%234e0c38' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%233e0933' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%232e062c' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%23210024' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundAttachment: "fixed",
            backgroundSize: 'cover',
            // height: '100vh !important',

        }}
        >

            <section className=" gradient-form " >
                <div className="container pt-5" >
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-xl-5">
                            <div className="text-center text-white font-weight-bold mb-5 mt-4">
                                <Image src="https://atik.urbanitsolution.com/files/logo/thumbnail/7632b474c6d5b78e3f6233a87461bf623f453c67.jpeg"
                                    style={{ width: "100px" }} alt="logo" />
                                <h2 className="text-white font-weight-bold pt-3 pb-1">Pathshala School &amp; College</h2>
                                <h4 className=" text-white mb-0 py-1"><span>School Management System</span></h4>
                                <p>
                                    <small className="description text-white">Dear user, log in to access the admin area!</small>
                                </p>
                            </div>
                        
                            <div className=' pb-5 pt-1'>
                            <div className="login-block">
                                <form method="post" autoComplete="off" onSubmit={handleLogin}>
                                    <h1>Login</h1>
                                    <div style={{ marginBottom: '13px' }}>
                                        <input type="email" name="email" placeholder="Enter Email Address" required />
                                    </div>
                                    <div style={{ marginBottom: '13px' }}>
                                        <input   type="password" name="password" placeholder="Enter Password" required />
                                    </div>
                                    <input type="submit" name="login" className="btn2" id="login-button" value="Login" />
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