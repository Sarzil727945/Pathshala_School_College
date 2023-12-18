'use client'

import styles from './login4.css';
import { Toaster } from 'react-hot-toast';
import handleLogin from '../auth';
import Image from 'next/image';

const Login4 = () => {

  return (
    <div>
      <div className="container px-2">
        <div className="profile profile--open animate__animated animate__bounce">
          <button className="profile__avatar" id="">
            <Image
              src="https://atik.urbanitsolution.com/files/logo/thumbnail/7632b474c6d5b78e3f6233a87461bf623f453c67.jpeg"
              alt="Avatar"
            />
          </button>
          <div className="profile__form">
            <h3 className="text-dark font-weight-bold pt-5" style={{ textAlign: 'center', marginBottom: '15px' }}>
              Pathshala School &amp; College
            </h3>
            <h6 className="text-dark font-weight-bold" style={{ textAlign: 'center', margin: '0px' }}>
              <span>School Management System</span>
            </h6>
            <p className="description text-dark pt-1" style={{ textAlign: 'center', margin: '0px' }}>
              Dear user, log in to access the admin area!
            </p>
            <div className="profile__fields" style={{ marginTop: '20px' }}>
              <form method="post" autoComplete="off" onSubmit={handleLogin} >
                <div className="field">
                  <label htmlFor="fieldUser" className="label">
                    Email
                  </label>
                  <input type="email" id="fieldUser" name="email" className="input" required="" />
                </div>
                <div className="field">
                  <label htmlFor="fieldPassword" className="label">
                    Password
                  </label>
                  <input type="password" id="fieldPassword" name="password" className="input" required="" />
                </div>
                <div className="profile__footer">
                  <input type="submit" name="login" className="btn" value="Log In" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login4;




