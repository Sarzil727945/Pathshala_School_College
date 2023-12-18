'use client'

import React from 'react';
import './login26.css'
import handleLogin from '../auth';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import Image from 'next/image';


const Login26 = () => {
    const randStr = `${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}`;
    const rgba = `rgba(${randStr},.8)`;
    const rgbaOrg = `rgba(${randStr},1)`;

    return (
        <div>

            <Head>
                <style>
                    {`.btn26-hover:hover {
      background: ${rgbaOrg} !important;
      color: #fff !important;}`}
                </style>
            </Head>

            <section className="fdb-block bg-transparent border-0 m-3 p-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 justify-content-center align-items-center">
                            <div className="row no-gutters shadow justify-content-center align-items-center bg-white m-3 rounded h-100">
                                <div className="col-12 col-md-6 text-center align-self-center h-100" style={{ background: rgba }}>
                                    <form  >
                                        <div className="fdb-box">
                                            <div className="row">
                                                <div className="col">
                                                    <a href="/" className="text-center">
                                                        <Image src="https://atik.urbanitsolution.com/files/logo/thumbnail/7632b474c6d5b78e3f6233a87461bf623f453c67.jpeg" alt="logo" />
                                                    </a>
                                                    <h2 className="text-white font-weight-bold">Pathshala School & College</h2>
                                                    <h3 className="text-white mb-0"><span>School Management System</span></h3>
                                                    <p className="description text-white">Dear user, log in to access the admin area!</p>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-12 col-md-6 text-center bg-white">
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
                                                </div>
                                            </div>
                                            <div className="row mt-4">
                                                <div className="col">
                                                    <input type="password" name="password" className="form-control mb-1" placeholder="Password" />
                                                </div>
                                            </div>
                                            <div className="row mt-4">
                                                <div className="col" >
                                                    <input type="submit" name="login" className="btn btn26-hover" value="Login In" style={{ borderColor: rgba, color: rgba }} />
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

export default Login26;

