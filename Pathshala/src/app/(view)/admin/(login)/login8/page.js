'use client'
import './login8.css'
import { Toaster } from 'react-hot-toast';
import handleLogin from '../auth';
import Image from 'next/image';

const Login8 = () => {
    return (
        <div>
            <div className="container">
                <div className="info">
                    <h1 className="font-weight-bold">Pathshala School &amp; College</h1>
                    <h5 className="description">School Management System</h5>
                    <p style={{ letterSpacing: '1px' }}>
                        <span> Dear user, log in to access the admin area!</span>
                    </p>
                </div>
            </div>

            <div className="form">
                <div className="thumbnail">
                    <Image src="https://atik.urbanitsolution.com/files/logo/thumbnail/7632b474c6d5b78e3f6233a87461bf623f453c67.jpeg" alt="Description of the image"/>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-12 ">
                        <div></div>
                    </div>
                </div>
                <br />

                <form method="post" autoComplete="off" className="register-form" onSubmit={handleLogin}>
                    <input type="email" name="email" placeholder=" Enter Email Address" required="" />
                    <br />
                    <input type="password" name="password" placeholder=" Enter Password" required="" />
                    <br />
                    <input type="submit" className="btn" name="login" value="Login" />
                </form>
            </div>

            <Toaster />
        </div>
    );
};

export default Login8;
