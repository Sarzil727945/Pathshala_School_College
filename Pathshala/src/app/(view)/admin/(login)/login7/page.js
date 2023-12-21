// LoginForm7.js
'use client'
import './login7.css'
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import handleLogin from '../auth';
import Image from 'next/image';

const Login7 = () => {
    const [bubbles, setBubbles] = useState([]);

    useEffect(() => {
        const initializr = () => {
            const bubblesArray = [];
            const bubbles_number = 30;
            for (let i = 0; i < bubbles_number; i++) {
                bubblesArray.push(generateBubble());
            }
            setBubbles(bubblesArray);
        };

        const generateBubble = () => {
            const shape_type = Math.floor(Math.random() * 3) + 1;
            const rn_size = Math.random() * (1.2 - 0.8) + 0.8;
            const top = window.innerHeight + 100;
            const left = Math.random() * (window.innerWidth + 120) - 60;

            return {
                shape_type,
                rn_size,
                top,
                left,
                transitionDuration: Math.random() * (8000 - 1500) + 1500,
            };
        };

        initializr();
    }, []);

    return (
        <div>
            <div style={{ margin: '0px', background: '#2891ad' }}>
                <div
                    id="background_css3"
                    style={{
                        zIndex: '-1',
                        margin: '0px',
                        padding: '0px',
                        overflow: 'hidden',
                        position: 'absolute',
                        bottom: '0px',
                        width: '100%',
                        height: '100vh',
                    }}
                >
                    {bubbles.map((bubble, index) => (
                        <div
                            key={index}
                            className="shape_background"
                            style={{
                                width: bubble.shape_type === 2 ? '0px' : '80px',
                                height: bubble.shape_type === 2 ? '0px' : '80px',
                                borderRadius: bubble.shape_type === 1 ? '50%' : '0',
                                borderStyle: bubble.shape_type === 2 ? 'solid' : 'none',
                                borderWidth: bubble.shape_type === 2 ? '0 40px 69.3px 40px' : '0',
                                borderColor: bubble.shape_type === 2 ? `transparent transparent ${'#fff'} transparent` : 'transparent',
                                background: 'transparent',
                                transform: `scale(${bubble.rn_size}) rotate(${Math.random() * (360 - (-360)) + (-360)}deg)`,
                                top: bubble.top,
                                left: bubble.left,
                                transition: `top ${bubble.transitionDuration}ms ease 0s, transform ${bubble.transitionDuration}ms ease 0s, opacity ${bubble.transitionDuration}ms ease 0s`,
                                opacity: 0,
                            }}
                        ></div>
                    ))}
                </div>
                <section className="fdb-block bg-transparent border-0">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8 col-lg-7 col-xl-5 text-center">
                                <form method="post" autoComplete="off" onSubmit={handleLogin}>
                                    <a href="https://atik.urbanitsolution.com/" className="text-center">
                                        <Image src="https://atik.urbanitsolution.com/files/logo/thumbnail/7632b474c6d5b78e3f6233a87461bf623f453c67.jpeg" alt="logo" />
                                    </a>

                                    <h2 className="text-white font-weight-bold">Pathshala School &amp; College</h2>
                                    <h3 className="text-white mb-0">
                                        <span>School Management System</span>
                                    </h3>
                                    <p className="description text-white">Dear user, log in to access the admin area!</p>

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
                                            <div className="col">
                                                <input type="submit" name="login" className="btn btn-outline-success" value="Login In" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Toaster/>
        </div>
    );
};

export default Login7;
