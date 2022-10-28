import React, {useState} from 'react';
import "../styles/Register.css";
import UserService from '../Services/User';
import {Link, useNavigate} from "react-router-dom";
import Arrow from '../images/Arrow - Left.png';
import Profile1 from '../images/Profile1.png';
import Stroke from '../images/Stroke.png';
import Lock from '../images/Lock.png';
import Vector from '../images/Vector.png';
import Ellipse653 from '../images/Ellipse653.png';
import Ellipse652 from '../images/Ellipse652.png';
import Ellipse654 from '../images/Ellipse654.png';

const Register = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nationalCode, setNationalCode] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    let navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            firstName: firstName,
            lastName: lastName,
            nationalCode: nationalCode,
            phoneNumber: phoneNumber,
            password: password
        };
        UserService.Register(userData).then(() => {
            setMessage('ثبت نام با موفقیت انجام شد');
            navigate("./login")
        }, err => {
            setMessage('خطایی رخ داده است');
        })
    };

    const firstNameInput = (e) => {
        setFirstName(e.target.value);
    }
    const lastNameInput = (e) => {
        setLastName(e.target.value)
    }
    const nationalCodeInput = (e) => {
        setNationalCode(e.target.value)
    }
    const phoneNumberInput = (e) => {
        setPhoneNumber(e.target.value);
    }
    const passwordInput = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div>
            <div className="mx-auto login-page col-lg-4 col-md-6 col-11">
                <div className="d-flex mt-4 ms-2">
                    <Link to='/'>
                        <img src={Arrow} className="mt-2" alt=""/>
                    </Link>
                    <div id="enter">ثبت نام</div>
                </div>
                <form className="login-form">
                    <div className="form-floating mb-4">
                        <input className="form-control" type="text" id="firstName" placeholder="firstName"
                               onInput={firstNameInput}/>
                        <label className="form-label" htmlFor="firstName">
                            <img src={Profile1} alt=""/>
                            نام
                        </label>
                    </div>
                    <div className="form-floating mb-4">
                        <input className="form-control" type="text" id="lastName" placeholder="lastName"
                               onInput={lastNameInput}/>
                        <label className="form-label" htmlFor="lastName">
                            <img src={Profile1} alt=""/>
                            نام خانوادگی
                        </label>
                    </div>
                    <div className="form-floating mb-4">
                        <input className="form-control" type="number" id="nationalCode" placeholder="nationalCode"
                               onInput={nationalCodeInput}/>
                        <label className="form-label" htmlFor="nationalCode">
                            <img src={Stroke} alt=""/>
                            کدملی
                        </label>
                    </div>
                    <div className="form-floating mb-4">
                        <input className="form-control" type="number" id="phoneNumber" placeholder="phoneNumber"
                               onInput={phoneNumberInput}/>
                        <label className="form-label" htmlFor="phoneNumber">
                            <img src={Stroke} alt="" className=""/>
                            شماره تلفن
                        </label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" type="password" id="pass" placeholder="password"
                               onInput={passwordInput}/>
                        <label className="form-label" htmlFor="pass">
                            <img src={Lock} alt=""/>
                            رمز عبور
                        </label>
                    </div>
                    <div className="text-center mt-5">
                        <button className="btn reg-btn col-11 py-2 mb-0" type="submit" onClick={onSubmit}>
                            ثبت نام
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    {message}
                </div>
            </div>
            <img src={Vector} alt="" className="b-left d-md-block d-none"/>
            <img src={Ellipse653} alt="" className="b-left d-md-block d-none"/>
            <img src={Ellipse652} alt="" className="b-left d-md-block d-none"/>
            <img src={Vector} alt="" className="b-right d-md-block d-none"/>
            <img src={Ellipse653} alt="" className="b-right d-md-block d-none"/>
            <img src={Ellipse654} alt="" className="b-right d-md-block d-none"/>
            <br/>
        </div>
    );
};

export default Register;