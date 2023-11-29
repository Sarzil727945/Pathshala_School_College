
'use client'

import './login24.css'
import '../../../../globals.css'
import { Toaster } from 'react-hot-toast';
import handleLogin from '../auth';
import { Image } from 'react-bootstrap';
import React, { useEffect, useRef } from 'react';
import Stats from 'stats.js';

const generateRandomColor = () => Math.floor(Math.random() * 16777215).toString(16);

const Login24 = () => {
    // Use useRef to create a mutable object to store the count_particles element
    const countParticlesRef = useRef(null);

    useEffect(() => {
        const loadParticlesJS = async () => {
            // Load particles.js script dynamically
            const particlesScript = document.createElement('script');
            particlesScript.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
            particlesScript.async = true;
            document.body.appendChild(particlesScript);

            // Wait for the script to load before calling particlesJS
            await new Promise(resolve => particlesScript.onload = resolve);

            // particlesJS is now defined
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        },
                        "image": {
                            "src": "img/github.svg",
                            "width": 100,
                            "height": 100
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 5,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 6,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 400,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true,
                "config_demo": {
                    "hide_card": false,
                    "background_color": "#b61924",
                    "background_image": "",
                    "background_position": "50% 50%",
                    "background_repeat": "no-repeat",
                    "background_size": "cover"
                }
            });
        };

        loadParticlesJS();

        var stats, update;
        stats = new Stats();
        // stats.setMode(0);
        // stats.domElement.style.position = 'absolute';
        // stats.domElement.style.left = '0px';
        // stats.domElement.style.top = '0px';
        // document.body.appendChild(stats.domElement);

        update = function () {
            stats.begin();
            stats.end();

            // Check if countParticlesRef.current is defined before setting innerText
            const particlesArrayLength = (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS && window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) ? window.pJSDom[0].pJS.particles.array.length : 0;

            if (countParticlesRef.current) {
                countParticlesRef.current.innerText = particlesArrayLength;
            }

            requestAnimationFrame(update);
        };

        // Use querySelector to find the element and update the ref
        countParticlesRef.current = document.querySelector('.js-count-particles');

        requestAnimationFrame(update);

        return () => {
            // Cleanup function if needed
        };
    }, []);

    return (
        <div className=' position-relative'>
            <div id="particles-js" style={{
                 background: `linear-gradient(to left, #${generateRandomColor()}, #${generateRandomColor()})`,
            }}>

            </div>
            <div className=' position-absolute w-100 h-100' style={{
                bottom: '0px'
            }}>
                <section>
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
            {/* Ensure countParticlesRef.current is defined before attempting to access innerText */}
            {countParticlesRef.current && <div className="js-count-particles"></div>}
        </div>
    );
};

export default Login24;
