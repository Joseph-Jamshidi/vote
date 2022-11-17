import React from 'react';
import {UserInfo} from "../Services/info";
import Ellipse655 from "../images/Ellipse655.png";
import Profile from "../images/Profile.png";
import Document from "../images/Document.png";
import circle2 from "../images/circle2.png";
import {Link} from "react-router-dom";
import circle1 from "../images/circle1.png";
import TimeSquare from "../images/TimeSquare.png";
import EditSquare from "../images/EditSquare.png";
import Login from "../images/Login.png";
import "../styles/Dashboard.css";

const Dashboard = () => {
    const logOut = () => {
        localStorage.clear();
        window.location.href = "/"
    }
    return (
        <>
            <div className="panel col-md-3 col-xl-2 ms-md-3 mx-3 mt-3 py-3">
                <div className="text-center">
                    <img src={Ellipse655} alt=""/>
                    <div className="pt-4">
                        <h5>{UserInfo.firstName} {UserInfo.lastName}</h5>
                        <hr className="mx-5"/>
                    </div>
                </div>
                <ul className="navbar-nav pt-4">
                    <li className="nav-item nav-panel">
                        <Link className="nav-link text-start ps-xl-2" href="src/Pages/UserProfile#">
                            <img src={Profile} alt=""/>
                            پروفایل
                        </Link>
                    </li>
                    <li className="nav-item nav-panel">
                        <button className="btn dash-btn" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseExample">
                            <Link className="nav-link text-start ps-xl-2" href="src/Pages/UserProfile#">
                                <img src={Document} alt=""/>
                                انتخابات های من
                            </Link>
                        </button>
                        <div className="collapse" id="collapseExample">
                            <div className="link-panel p-2 ps-4">
                                <img className="img-fluid" src={circle1} alt="" id="img 11"/>
                                <Link className="zir-panel" to="../CreateVote">ایجاد انتخابات جدید</Link>
                            </div>
                            <div className="link-panel p-2 ps-4">
                                <img className="img-fluid" src={circle2} alt="" id="img 10"/>
                                <Link className="zir-panel" to="../Voting">انخابات های درحال اجرا</Link>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item nav-panel">
                        <Link className="nav-link text-start ps-xl-2" href="src/Pages/UserProfile#">
                            <img className="img-fluid" src={TimeSquare} alt=""/>
                            سابقه رأی دادن
                        </Link>
                    </li>
                    <li className="nav-item nav-panel">
                        <Link className="nav-link text-start ps-xl-2" to="../UserList">
                            <img className="img-fluid" src={EditSquare} alt=""/>
                            لیست کاربران وارد کرده
                        </Link>
                    </li>
                    <li className="nav-item nav-panel">
                        <Link className="nav-link text-start ps-xl-2" onClick={logOut}>
                            <img className="img-fluid" src={Login} alt=""/>
                            خروج از حساب کاربری
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Dashboard;