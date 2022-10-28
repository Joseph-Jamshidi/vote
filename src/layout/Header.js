import React from 'react';
import {Link} from "react-router-dom";
import {token} from "../Services/info";
import {fName} from "../Services/info";
import {lName} from "../Services/info";

const Header = () => {
    const logOut = () => {
        localStorage.clear();
        window.location.href = "/"
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar"
                         aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">منوی اصلی</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                                    aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav d-flex justify-content-sm-start">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">صفحه اصلی</Link>
                                </li>
                                {
                                    token ?
                                        <li className="nav-item">
                                            <Link className="nav-link" to="./UserProfile">خدمات</Link>
                                        </li>
                                        :
                                        <li className="nav-item">
                                            <Link className="nav-link" to="./Login">خدمات</Link>
                                        </li>
                                }
                                <li className="nav-item">
                                    <a className="nav-link" href="#">تعرفه ها</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">درباره ما</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">تماس با ما</a>
                                </li>
                                {
                                    token ?
                                        <li className="nav-item ms-lg-auto" id="sign up">
                                            <Link className="nav-link" to=''>{fName} {lName}</Link>
                                        </li>
                                        :
                                        <li className="nav-item ms-lg-auto" id="sign up">
                                            <Link className="nav-link" to='./Register'>ثبت نام</Link>
                                        </li>
                                }
                                {
                                    token ?
                                        <li className="nav-item" id="login">
                                            <Link className="nav-link" to={""} onClick={logOut}>خروج</Link>
                                        </li>
                                        :
                                        <li className="nav-item" id="login">
                                            <Link className="nav-link" to="./Login">ورود</Link>
                                        </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;