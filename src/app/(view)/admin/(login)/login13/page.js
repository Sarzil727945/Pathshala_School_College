// Login13.js
'use client'
import './login13.css'
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import handleLogin from '../auth';

const Login13 = () => {
    useEffect(() => {
        const c = document.getElementById('c');
        let w = (c.width = window.innerWidth);
        let h = (c.height = window.innerHeight);
        const ctx = c.getContext('2d');

        const minDist = 10;
        const maxDist = 30;
        const initialWidth = 10;
        const maxLines = 100;
        const initialLines = 4;
        const speed = 5;

        let lines = [];
        let frame = 0;
        let timeSinceLast = 0;

        const dirs = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
            [0.7, 0.7],
            [0.7, -0.7],
            [-0.7, 0.7],
            [-0.7, -0.7],
        ];

        const starter = {
            x: w / 2,
            y: h / 2,
            vx: 0,
            vy: 0,
            width: initialWidth,
        };

        function init() {
            lines = [];
            for (let i = 0; i < initialLines; ++i) lines.push(new Line(starter));
            ctx.fillStyle = '#222';
            ctx.fillRect(0, 0, w, h);
        }

        function getColor(x) {
            return `hsl( ${x / w * 360 + frame}, 80%, 50% )`;
        }

        function anim() {
            window.requestAnimationFrame(anim);
            ++frame;
            ctx.shadowBlur = 0;
            ctx.fillStyle = 'rgba(0,0,0,.02)';
            ctx.fillRect(0, 0, w, h);
            ctx.shadowBlur = 0.5;

            for (let i = 0; i < lines.length; ++i)
                if (lines[i].step()) {
                    lines.splice(i, 1);
                    --i;
                }

            ++timeSinceLast;

            if (lines.length < maxLines && timeSinceLast > 10 && Math.random() < 0.5) {
                timeSinceLast = 0;
                lines.push(new Line(starter));
                ctx.fillStyle = ctx.shadowColor = getColor(starter.x);
                ctx.beginPath();
                ctx.arc(starter.x, starter.y, initialWidth, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function Line(parent) {
            this.x = parent.x | 0;
            this.y = parent.y | 0;
            this.width = parent.width / 1.25;

            do {
                const dir = dirs[(Math.random() * dirs.length) | 0];
                this.vx = dir[0];
                this.vy = dir[1];
            } while (
                (this.vx === -parent.vx && this.vy === -parent.vy) ||
                (this.vx === parent.vx && this.vy === parent.vy)
            );

            this.vx *= speed;
            this.vy *= speed;

            this.dist = Math.random() * (maxDist - minDist) + minDist;
        }

        Line.prototype.step = function () {
            let dead = false;

            const prevX = this.x;
            const prevY = this.y;

            this.x += this.vx;
            this.y += this.vy;

            --this.dist;

            if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) dead = true;

            if (this.dist <= 0 && this.width > 1) {
                this.dist = Math.random() * (maxDist - minDist) + minDist;

                if (lines.length < maxLines) lines.push(new Line(this));
                if (lines.length < maxLines && Math.random() < 0.5) lines.push(new Line(this));

                if (Math.random() < 0.2) dead = true;
            }

            ctx.strokeStyle = ctx.shadowColor = getColor(this.x);
            ctx.beginPath();
            ctx.lineWidth = this.width;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(prevX, prevY);
            ctx.stroke();

            if (dead) return true;
        };

        init();
        anim();

        window.addEventListener('resize', function () {
            w = c.width = window.innerWidth;
            h = c.height = window.innerHeight;
            starter.x = w / 2;
            starter.y = h / 2;

            init();
        });
    }, []);

    return (
        <div>
            <div style={{ margin: '0px' }}>
                <canvas id='c' width="1366" height="641"></canvas>
                <div className="login-form">
                    <form method="post" autoComplete="off" onSubmit={handleLogin}>
                        <p style={{ textAlign: 'center' }}>
                            <a href="https://atik.urbanitsolution.com/" className="text-center">
                                <img
                                    src="https://atik.urbanitsolution.com/files/logo/thumbnail/7632b474c6d5b78e3f6233a87461bf623f453c67.jpeg"
                                    alt="logo"
                                    style={{ width: '80px' }}
                                />
                            </a>
                        </p>

                        <h2 className="font-weight-bold" style={{ textAlign: 'center' }}>
                            Pathshala School &amp; College
                        </h2>
                        <h5 className="text-dark" style={{ textAlign: 'center', margin: '0px' }}>
                            <span>School Management System</span>
                        </h5>
                        <p className="text-center text-dark"><small>
                            Dear user, log in to access the admin area!</small></p>
                        <div className="form-group log-status">
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Enter Email Address"
                                required
                            />
                            <i className="fa fa-user"></i>
                        </div>
                        <div className="form-group log-status">
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Enter Password"
                                required
                            />
                            <i className="fa fa-lock"></i>
                        </div>
                        <input type="submit" name="login" className="log-btn" value="Log In" />
                    </form>
                </div>

              
            </div>
            <Toaster />
        </div>
    );
};

export default Login13;
