
"use client"

import './login2.css'
import '../../../../globals.css'
import { Toaster } from 'react-hot-toast';
import handleLogin from '../auth';
import { Image } from 'react-bootstrap';

const generateRandomColor = () => Math.floor(Math.random() * 16777215).toString(16);


const Home = () => {
    return (
        <div>
         
            <div className="bg" style={{background:`linear-gradient(45deg,  #${generateRandomColor()} 50%,  #${generateRandomColor()} 50%)`}}></div>
            <div className={`bg bg2`} style={{background:`linear-gradient(45deg, #${generateRandomColor()} 50%, #${generateRandomColor()} 50%)`}}></div>
            <div className={`bg bg3`} style={{background:`linear-gradient(45deg,  #${generateRandomColor()} 50%,  #${generateRandomColor()} 50%)`}}></div>

            <section  >
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

         
        </div>
    );
};

export default Home;
