import React, {useState} from 'react';
import UserService from '../Services/User';
import Ellipse656 from "../images/Ellipse656.png";
import Edit from "../images/Edit.png";
import "../styles/CreateVote.css"
import Dashboard from "../layout/Dashboard";
import {fName, lName} from "../Services/info";
import DatePicker, {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const CreateVote = () => {
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isEnable, setIsEnable] = useState(true);
    const [isVoterHidden, setIsVoterHidden] = useState(true);
    const [candidateCount, setCandidateCount] = useState("");
    const [userVoteCount, setUserVoteCount] = useState("");

    const handleCreate = (e) => {
        e.preventDefault();
        const createElection = {
            name: name,
            startDate: startDate,
            endDate: endDate,
            isEnable: isEnable,
            isVoterHidden: isVoterHidden,
            candidateCount: candidateCount,
            userVoteCount: userVoteCount
        };
        UserService.Election(createElection).then()
    }
    const onStartDateHandler = (value) => {
        const starting = {value, format: "DD/MM/YYYY"};
        const startingDate = new DateObject(starting).format();
        setStartDate(startingDate)
    };
    const onEndDateHandler = (value) => {
        const ending = {value, format: "YYYY-MM-DD"};
        const endingDate = new DateObject(ending).format();
        setEndDate(endingDate);
    };

    return (<div>
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
                            <div className="pe-4 ps-2">{fName} {lName}</div>
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
                            برای رأی دادن فرم زیر را کامل کنید
                        </div>
                        <form className="container" onSubmit={handleCreate}>
                            <div className="row mt-3">
                                <div className="text-start col-md-8 mb-2">
                                    <label className="form-label" htmlFor="e-title">1.عنوان انتخابات:</label>
                                    <input type="text" className="form-control" id="e-title"
                                           placeholder="متن را وارد کنید"
                                           onChange={(e) => {
                                               setName(e.target.value)
                                           }}
                                    />
                                </div>
                                <div className="row col-md-5 d-flex mt-0 mb-2 me-3">
                                    <div className="text-start col-12 mt-0">
                                        <label className="form-label">2.تاریخ شروع انتخابات:</label>
                                    </div>
                                    <div className="text-start col-12">
                                        <DatePicker
                                            onChange={onStartDateHandler}
                                            calendar={persian}
                                            locale={persian_fa}
                                            format={"YYYY-MM-DD"}
                                        />
                                    </div>
                                </div>
                                <div className="row col-md-5 d-flex mt-0 mb-2 ms-md-2">
                                    <div className="text-start col-12 mt-0">
                                        <label className="form-label">3.تاریخ اتمام انتخابات:</label>
                                    </div>
                                    <div className="text-start col-12">
                                        <DatePicker
                                            onChange={onEndDateHandler}
                                            calendar={persian}
                                            locale={persian_fa}
                                            format={"YYYY-MM-DD"}
                                        />
                                    </div>
                                </div>
                                <div className="text-start col-md-6 col-lg-4 my-2">
                                    <label className="form-label" htmlFor="e-nomines">4.تعداد کاندید های
                                        انتخابات:</label>
                                    <select className="form-select" id="e-nomines"
                                            onChange={(e) => {
                                                setCandidateCount(e.target.value)
                                            }}>
                                        <option defaultValue={"1"}>انتخاب کنید</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <div className="text-start col-md-6 col-lg-4 my-2">
                                    <label className="form-label" htmlFor="e-count">5.تعداد رأی برای هر
                                        کاربر:</label>
                                    <select className="form-select" id="e-count"
                                            onChange={(e) => {
                                                setUserVoteCount(e.target.value)
                                            }}>
                                        <option defaultValue={"1"}>انتخاب کنید</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <div className="text-start col-md-4 col-lg-4 my-2">
                                    <label className="form-label">6.رأی گیری مخفی:</label>
                                    <div className="col-md-12">
                                        <div className="d-inline-flex col">
                                            <div className="e-hide px-2 mx-2">
                                                <div className="form-check ms-3 mb-0 p-1">
                                                    <input className="form-check-input" type="radio"
                                                           name="flexRadioDefault" id="yes"
                                                           onChange={() => {
                                                               setIsEnable(true)
                                                           }}/>
                                                    <label className="form-check-label" htmlFor="yes">
                                                        بله
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="e-hide px-2 mx-2">
                                                <div className="form-check ms-3 mb-0 p-1">
                                                    <input className="form-check-input" type="radio"
                                                           name="flexRadioDefault" id="nope"
                                                           onChange={() => {
                                                               setIsEnable(false)
                                                           }}/>
                                                    <label className="form-check-label" htmlFor="nope">
                                                        خیر
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 d-flex my-2">
                                    <div className="col-lg-1 col-sm-2 col-3">
                                        {isVoterHidden === true ?
                                            <button className="btn py-1 me-3 bg-primary" id="dw-btn1" type="button"
                                                    onClick={() => {
                                                        setIsVoterHidden(true)
                                                    }}
                                                    disabled>فعال</button> :
                                            <button className="btn py-1 me-3" id="dw-btn1" type="button"
                                                    onClick={() => {
                                                        setIsVoterHidden(true)
                                                    }}>فعال
                                            </button>}
                                    </div>
                                    <div className="col-lg-1 col-sm-2 col-3">
                                        {isVoterHidden === false ?
                                            <button className="btn py-1 ms-3 bg-primary" id="dw-btn2" type="button"
                                                    onClick={() => {
                                                        setIsVoterHidden(false)
                                                    }}
                                                    disabled>غیرفعال</button> :
                                            <button className="btn py-1 ms-3" id="dw-btn2" type="button"
                                                    onClick={() => {
                                                        setIsVoterHidden(false)
                                                    }}>
                                                غیرفعال
                                            </button>}
                                    </div>
                                </div>
                                <div className="col-md-12 d-flex my-2 justify-content-center">
                                    <div className="col-lg-1 col-sm-2 col-3">
                                        <button className="btn py-1 ms-3" id="dw-btn2" type="submit">ثبت</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>);
};

export default CreateVote;