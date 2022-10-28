import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Arrow from '../images/Arrow - Left.png';
import Stroke from '../images/Stroke.png';
import Lock from '../images/Lock.png';
import Vector from '../images/Vector.png';
import Ellipse653 from '../images/Ellipse653.png';
import Ellipse652 from '../images/Ellipse652.png';
import Ellipse654 from '../images/Ellipse654.png';
import "../styles/Login.css";
import UserService from '../Services/User';
import {setAuthToken} from "../Services/token";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const token = localStorage.getItem("token");
    if (token) {
        setAuthToken(token);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const loginInfo = {
            grant_type: "password",
            userName: username,
            password: password
        };
        UserService.Login(loginInfo).then(() => {
            if (!token) {
                setMessage("نام کاربری یا رمز عبور اشتباه است");
            }
        })
    };
    const usernameInput = (e) => {
        setUsername(e.target.value);
    }
    const passwordInput = (e) => {
        setPassword(e.target.value);
    }
    return (
        <div>
            <div className="mx-auto login-page col-lg-4 col-md-6 col-11">
                <div className="text-center pt-2 link-danger">
                    {message}
                </div>
                <div className="d-flex mt-4 ms-2">
                    <Link to="/">
                        <img src={Arrow} className="mt-2" alt=""/>
                    </Link>
                    <div id="enter">ورود</div>
                </div>
                <form className="login-form">
                    <div className="form-floating mb-4">
                        <input className="form-control" type="number" id="username" placeholder="username"
                               onInput={usernameInput}/>
                        <label className="form-label" htmlFor="username">
                            <img src={Stroke} alt="" className=""/>
                            شماره تلفن
                        </label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" type="password" id="pass" placeholder="username"
                               onInput={passwordInput}/>
                        <label className="form-label" htmlFor="pass">
                            <img src={Lock} alt="" className=""/>
                            رمز عبور
                        </label>
                    </div>
                    <div className="text-center mt-5 mb-3">
                        <button className="btn login-btn col-11 py-2 mb-0" type="submit" onClick={onSubmit}>ورود</button>
                    </div>
                </form>
            </div>
            <img src={Vector} alt="" className="b-left d-md-block d-none"/>
            <img src={Ellipse653} alt="" className="b-left d-md-block d-none"/>
            <img src={Ellipse652} alt="" className="b-left d-md-block d-none"/>
            <img src={Vector} alt="" className="b-right d-md-block d-none"/>
            <img src={Ellipse653} alt="" className="b-right d-md-block d-none"/>
            <img src={Ellipse654} alt="" className="b-right d-md-block d-none"/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    );
};

export default Login;