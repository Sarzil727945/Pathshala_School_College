"use client"

import '../../../../globals.css'
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import handleLogin from '../auth';
import { Image } from 'react-bootstrap';

const generateRandomColor = () => Math.floor(Math.random() * 16777215).toString(16);

const animate = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.6;
    border-radius: 0;
  }
  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 100%;
  }
`;

const Circles = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const CircleItem = styled.li`         
  position: absolute;
  display: block;
  list-style: none;
  width: ${(props) => props.size || '66px'};
  height: ${(props) => props.size || '66px'};
  animation: ${animate} 25s linear infinite;
  bottom: -150px;
  opacity: 0.3;
`;

const generateRandomPercentage = () => `${Math.random() * 100}%`;

const generateRandomDelay = () => `${Math.random() * 40}s`;

const generateRandomDuration = () => `${Math.random() * 50}s`;

const Login22 = () => {
  const [circleStyles, setCircleStyles] = useState([]);

  useEffect(() => {
    const dynamicCircles = [];

    for (let i = 1; i <= 22; i++) {
      const size = i === 1 ? '150px' : '88px';
      dynamicCircles.push({
        size,
        left: generateRandomPercentage(),
        background: `#${generateRandomColor()}`,
        animationDelay: generateRandomDelay(),
        animationDuration: generateRandomDuration(),
      });
    }


    dynamicCircles.sort((a, b) => parseFloat(b.size) - parseFloat(a.size));

    setCircleStyles(dynamicCircles);
  }, []);

  return (
    <div style={{
      background: `linear-gradient(to left, #${generateRandomColor()}, #${generateRandomColor()})`,
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: '-1',
      overflow: 'hidden',
    }}>
      <div>
        <Circles>
          {circleStyles.map((style, index) => (
            <CircleItem key={index} style={{
              left: generateRandomPercentage(),
              background: `#${generateRandomColor()}`,
              animationDelay: generateRandomDelay(),
              animationDuration: generateRandomDuration(),
            }}></CircleItem>
          ))}
        </Circles>
      </div>
      <section className="fdb-block bg-transparent border-0">
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
      <Toaster />
    </div>
  );
};

export default Login22;