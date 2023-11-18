'use client'

import '../../../globals.css'
import handleLogin from './auth';

import { Image } from 'react-bootstrap';
// import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/navigation';

const Login1 = () => {
    // const router = useRouter();

    // const handleSubmit = async (event) => {
    //     event?.preventDefault();
    //     const form = event?.target;
    //     const email = form?.email?.value;
    //     const password = form?.password?.value;

    //     const loginSuccessful = await handleLogin(email, password);

    //     if (loginSuccessful) {
    //         console.log('Login was successful');
    //         // Use router to navigate to another page (e.g., '/')
    //         router.push('/'); // Replace '/' with the path to the page you want to navigate to
    //     } else {
    //         console.log('Login failed');
    //     }
    // };



    return (
        <section className=" gradient-form gradient-custom-2" >
            <div className="text-center">
                <Image src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style={{ width: "185px" }}
                    alt="logo" />
                <h4 className="">We are The Lotus Team</h4>
            </div>
            <div className="container  h-100">
                <div className="row d-flex justify-content-center align-items-center ">
                    <div className="col-lg-5 pb-5">
                        <div className="card text-black">
                            <div className="row g-0">
                                <div className="">
                                    <div className="card-body p-md-5 mx-md-4 p-lg-5 mx-lg-4 p-4">

                                        <form onSubmit={handleLogin}>
                                            <h2 className='text-center mb-5'>LogIn</h2>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" >Email</label>
                                                <input
                                                    type="email"
                                                    name="email"

                                                    id="form2Example11" className="form-control"
                                                    placeholder="Phone number or email address" />

                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" >Password</label>
                                                <input
                                                    placeholder='Password'
                                                    type="password"
                                                    name="password"
                                                    id="form2Example22" className="form-control" />
                                            </div>
                                            <a className="text-muted" href="#!">Forgot password?</a>

                                            <div className="text-center pt-1 mb-5 pb-1 mt-2">

                                                <input
                                                    className="btn w-75 btn-outline-success px-5 py-2 mt-2" type="submit" value="Login" />

                                            </div>



                                        </form>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login1;
