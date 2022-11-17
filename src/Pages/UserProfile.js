import React, {useEffect, useState} from 'react';
import Ellipse656 from "../images/Ellipse656.png";
import Edit from "../images/Edit.png";
import "../styles/UserProfile.css";
import Dashboard from "../layout/Dashboard";
import UserService from "../Services/User";
import {UserInfo} from "../Services/info";

const UserProfile = () => {
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        UserService.Profile(UserInfo.userId).then((i) => {
            setUserInfo(i.data)
        })
    },[]);
    console.log(UserInfo.userId)
    return (
        <div>
            <section className="d-md-flex gx-4 position-relative">
                <Dashboard/>
                <div className="col card mt-3 mx-3 px-3 mb-0">
                    <div className="container text-center">
                        <div className="row my-2 panel-text">
                            <div className="col text-start">
                                <div>تاریخ عضویت</div>
                                <div className="pe-2">00/00/00</div>
                            </div>
                            <div className="col text-center">
                                <div>تاریخ امروز</div>
                                <div className="pe-1">00/00/00</div>
                            </div>
                            <div className="col text-end">
                                <div>آخرین بازدید</div>
                                <div className="ps-2">00/00/00</div>
                            </div>
                        </div>
                        <div className="row my-2 panel-text">
                            <div className="col text-start d-flex align-items-center">
                                <img src={Ellipse656} alt=""/>
                                <div className="pe-4 ps-2">نام و نام خانوادگی</div>
                                <div className="pe-4">شماره تلفن : 09190000000</div>
                            </div>
                            <div className="col text-start me-auto">
                                <div className="nav-item my-0 ms-auto" id="edit">
                                    <a className="nav-link" href="src/Pages/UserProfile#">
                                        <img src={Edit} alt=""/>
                                        ویرایش پروفایل
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>hi</div>
                </div>
            </section>
        </div>
    );
};

export default UserProfile;