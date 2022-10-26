import React from 'react';
import Ellipse656 from "../images/Ellipse656.png";
import Edit from "../images/Edit.png";
import "../styles/Voting.css"
import Dashboard from "../layout/Dashboard";

const Voting = () => {
    return (
        <div>
            <section className="d-md-flex gx-4">
                <Dashboard/>
                <div className="col mt-3 mx-3 px-3 sec">
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
                            <div className="col text-start ms-auto">
                                <div className="nav-item my-0 ms-auto" id="edit">
                                    <a className="nav-link" href="src/Pages/CreateVote#">
                                        <img src={Edit} alt=""/>
                                        ویرایش پروفایل
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="create-part">
                            <div className="text-start p-2" id="cp-1">
                                هیچگونه انتخاباتی برای کاربر وجود ندارد
                            </div>
                            <form className="container row">
                                <div className="text-start col-md-6 my-2 mb-4">
                                    <label className="form-label" htmlFor="e-list">6.لیست کاندید ها:</label>
                                    <input className="form-control" id="e-list" type="text" placeholder="وارد کنید"/>
                                </div>
                                <div className="text-start col-md-6 mt-2 mb-4">
                                    <label className="form-label" htmlFor="e-people">7.وارد کردن کاربران دارای
                                        رأی:</label>
                                    <input className="form-control" id="e-people" type="text" placeholder="وارد کنید"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Voting;