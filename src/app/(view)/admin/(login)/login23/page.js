"use client"

import './login23.css'
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import handleLogin from '../auth';

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

const Login23 = () => {
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
            <CircleItem key={index}  style={{
              left: generateRandomPercentage(),
              background: `#${generateRandomColor()}`,
              animationDelay: generateRandomDelay(),
              animationDuration: generateRandomDuration(),
            }}></CircleItem>
          ))}
        </Circles>
      </div>
      <section className="fdb-block bg-transparent border-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7 col-xl-5 text-center">
              <form method="post" autoComplete="off" onSubmit={handleLogin}>
                <a href="https://atik.urbanitsolution.com/" className="text-center">
                  <img src="https://atik.urbanitsolution.com/files/logo/thumbnail/7632b474c6d5b78e3f6233a87461bf623f453c67.jpeg" alt="logo" />
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
      <Toaster/>
    </div>
  );
};

export default Login23;