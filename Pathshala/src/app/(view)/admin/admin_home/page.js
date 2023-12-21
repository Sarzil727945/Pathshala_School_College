'use client'

import { faChalkboardTeacher, faSms, faUserGraduate, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
  from 'recharts';

function AdminHome() {

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];


  return (
    <main className='main-container'>
      
      <div className='main-cards'>

        <div className="card h-100 mb-4 shadow-sm bg-gradient-success">
          <div className="card-body p-2 d-flex justify-content-between align-items-center">
            <div className="col-4 align-self-center rounded-circle float-left">
              <div className="card card-block border-0 bg-transparent d-flex align-items-center justify-content-center">
                <h5 className="card-title text-center align-middle m-0 text-success m-0 bg-light rounded-circle p-1">
                <FontAwesomeIcon icon={faSms} className="zt-2 p-2 fs-2" />
                </h5>
              </div>
            </div>
            <div className="col-8 float-right p-0 text-end">
              <h2 className="card-title text-white mb-0 text-right ">0</h2>
              <h6 className="card-title text-white m-0 text-right">Total Available SMS</h6>
            </div>
          </div>
        </div>

        <div className="card h-100 mb-4 shadow-sm bg-gradient-info">
          <div className="card-body p-2 d-flex justify-content-between align-items-center">
            <div className="col-4 align-self-center rounded-circle float-left">
              <div className="card card-block border-0 bg-transparent d-flex align-items-center justify-content-center">
                <h5 className="card-title text-center align-middle text-info m-0 bg-light rounded-circle p-1">
                <FontAwesomeIcon icon={faUserGraduate} className="zt-2 p-2 fs-2" />
                </h5>
              </div>
            </div>
            <div className="col-8 float-right p-0 text-end">
              <h2 className="card-title text-white mb-0 text-right">182</h2>
              <h6 className="card-title text-white m-0 text-right">Total Student</h6>
            </div>
          </div>
        </div>

        <div className="card h-100 mb-4 shadow-sm bg-gradient-warning">
          <div className="card-body p-2 d-flex justify-content-between align-items-center">
            <div className="col-4 align-self-center rounded-circle float-left">
              <div className="card card-block border-0 bg-transparent d-flex align-items-center justify-content-center">
                <h5 className="card-title text-center align-middle text-warning m-0 bg-light rounded-circle py-1">
                <FontAwesomeIcon icon={faChalkboardTeacher} className="zt-2 p-2 fs-2" />
                </h5>
              </div>
            </div>
            <div className="col-8 float-right p-0 text-end">
              <h2 className="card-title text-white mb-0 text-right">9</h2>
              <h6 className="card-title text-white m-0 text-right">Total Teacher</h6>
            </div>
          </div>
        </div>

        <div className="card h-100 mb-4 shadow-sm bg-gradient-danger">
          <div className="card-body p-2 d-flex justify-content-between align-items-center">
            <div className="col-4 align-self-center rounded-circle float-left">
              <div className="card card-block border-0 bg-transparent d-flex align-items-center justify-content-center">
                <h5 className="card-title text-center align-middle text-danger m-0 bg-light rounded-circle p-1">
                <FontAwesomeIcon icon={faUserTie} className="zt-2 p-2" />
                </h5>
              </div>
            </div>
            <div className="col-8 float-right p-0 text-end">
              <h2 className="card-title text-white mb-0 text-right">3</h2>
              <h6 className="card-title text-white m-0 text-right">Total Staff</h6>
            </div>
          </div>
        </div>
      </div>

      <div className='charts'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>

      </div>
    </main>
  )
}
export default AdminHome