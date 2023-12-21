'use client'
import anime from 'animejs';
import React, { useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';
import handleLogin from '../auth';

const Login6 = () => {
    useEffect(() => {
        const c = document.getElementById('c');
        const ctx = c.getContext('2d');
        let cH;
        let cW;
        let bgColor = '#0c675a';
        const animations = [];
        const colorPicker = {
            colors: ['#eda2b6', '#6b9812', '#7b3fc8', '#02dbc6', '#a86019', '#860fe9', '#d6c59b', '#31086e'],
            index: 0,
            next: function () {
                this.index = this.index++ < this.colors.length - 1 ? this.index : 0;
                return this.colors[this.index];
            },
            current: function () {
                return this.colors[this.index];
            },
        };

        function removeAnimation(animation) {
            const index = animations.indexOf(animation);
            if (index > -1) animations.splice(index, 1);
        }

        function calcPageFillRadius(x, y) {
            const l = Math.max(x - 0, cW - x);
            const h = Math.max(y - 0, cH - y);
            return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
        }

        function addClickListeners() {
            document.addEventListener('touchstart', handleEvent);
            document.addEventListener('mousedown', handleEvent);
        }

        function handleEvent(e) {
            if (e.touches) {
                e.preventDefault();
                e = e.touches[0];
            }
            const currentColor = colorPicker.current();
            const nextColor = colorPicker.next();
            const targetR = calcPageFillRadius(e.pageX, e.pageY);
            const rippleSize = Math.min(200, cW * 0.4);
            const minCoverDuration = 750;

            const pageFill = new Circle({
                x: e.pageX,
                y: e.pageY,
                r: 0,
                fill: nextColor,
            });
            const fillAnimation = anime({
                targets: pageFill,
                r: targetR,
                duration: Math.max(targetR / 2, minCoverDuration),
                easing: 'easeOutQuart',
                complete: function () {
                    bgColor = pageFill.fill;
                    removeAnimation(fillAnimation);
                },
            });

            const ripple = new Circle({
                x: e.pageX,
                y: e.pageY,
                r: 0,
                fill: currentColor,
                stroke: {
                    width: 3,
                    color: currentColor,
                },
                opacity: 1,
            });
            const rippleAnimation = anime({
                targets: ripple,
                r: rippleSize,
                opacity: 0,
                easing: 'easeOutExpo',
                duration: 900,
                complete: removeAnimation,
            });

            const particles = [];
            for (let i = 0; i < 32; i++) {
                const particle = new Circle({
                    x: e.pageX,
                    y: e.pageY,
                    fill: currentColor,
                    r: anime.random(24, 48),
                });
                particles.push(particle);
            }
            const particlesAnimation = anime({
                targets: particles,
                x: function (particle) {
                    return particle.x + anime.random(rippleSize, -rippleSize);
                },
                y: function (particle) {
                    return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
                },
                r: 0,
                easing: 'easeOutExpo',
                duration: anime.random(1000, 1300),
                complete: removeAnimation,
            });
            animations.push(fillAnimation, rippleAnimation, particlesAnimation);
        }

        function extend(a, b) {
            for (let key in b) {
                if (b.hasOwnProperty(key)) {
                    a[key] = b[key];
                }
            }
            return a;
        }

        class Circle {
            constructor(opts) {
                extend(this, opts);
            }

            draw() {
                ctx.globalAlpha = this.opacity || 1;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                if (this.stroke) {
                    ctx.strokeStyle = this.stroke.color;
                    ctx.lineWidth = this.stroke.width;
                    ctx.stroke();
                }
                if (this.fill) {
                    ctx.fillStyle = this.fill;
                    ctx.fill();
                }
                ctx.closePath();
                ctx.globalAlpha = 1;
            }
        }

        const animate = anime({
            duration: Infinity,
            update: function () {
                ctx.fillStyle = bgColor;
                ctx.fillRect(0, 0, cW, cH);
                animations.forEach(function (anim) {
                    anim.animatables.forEach(function (animatable) {
                        animatable.target.draw();
                    });
                });
            },
        });

        const resizeCanvas = function () {
            cW = window.innerWidth;
            cH = window.innerHeight;
            c.width = cW * devicePixelRatio;
            c.height = cH * devicePixelRatio;
            ctx.scale(devicePixelRatio, devicePixelRatio);
        };

        const init = function () {
            resizeCanvas();
            if (window.CP) {
                window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000;
            }
            window.addEventListener('resize', resizeCanvas);
            addClickListeners();
            if (!!window.location.pathname.match(/fullcpgrid/)) {
                startFauxClicking();
            }
            handleInactiveUser();
        };

        function handleInactiveUser() {
            const inactive = setTimeout(function () {
                fauxClick(cW / 2, cH / 2);
            }, 2000);

            function clearInactiveTimeout() {
                clearTimeout(inactive);
                document.removeEventListener('mousedown', clearInactiveTimeout);
                document.removeEventListener('touchstart', clearInactiveTimeout);
            }

            document.addEventListener('mousedown', clearInactiveTimeout);
            document.addEventListener('touchstart', clearInactiveTimeout);
        }

        function startFauxClicking() {
            setTimeout(function () {
                fauxClick(anime.random(cW * 0.2, cW * 0.8), anime.random(cH * 0.2, cH * 0.8));
                startFauxClicking();
            }, anime.random(200, 900));
        }

        function fauxClick(x, y) {
            const fauxClick = new Event('mousedown');
            fauxClick.pageX = x;
            fauxClick.pageY = y;
            document.dispatchEvent(fauxClick);
        }

        init();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <div>
            <canvas id="c" width="1366" height="378"></canvas>
            <section className="fdb-block bg-transparent border-0" style={{marginTop:'-650px'}}>
                <div className="container py-4 h-100" >
                    <div className="row d-flex justify-content-center align-items-center h-100">
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
                                                        className="25 px-4 btn btn-info mt-2" type="submit" value="Login In" />
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

export default Login6;
