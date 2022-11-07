import React, {useEffect, useState} from 'react';
import ElectionService from '../Services/Election'
import Ellipse656 from "../images/Ellipse656.png";
import Edit from "../images/Edit.png";
import "../styles/CreateVote.css"
import Dashboard from "../layout/Dashboard";
import {UserInfo} from "../Services/info";
import DatePicker, {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
import gregorian from "react-date-object/calendars/gregorian";
import {useParams} from "react-router-dom";
import InputIcon from "react-multi-date-picker/components/input_icon";

const CreateVote = () => {
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);
    const [isVoterHidden, setIsVoterHidden] = useState(false);
    const [candidateCount, setCandidateCount] = useState("");
    const [userVoteCount, setUserVoteCount] = useState("");
    const [selectedElection, setSelectedElection] = useState("");

    const params = useParams();

    useEffect(() => {
        if (params.id) {
            //Get Election From server and set it to state
            ElectionService.chosenElection(params.id).then((r) => {
                const selected = r.data;
                setSelectedElection(selected);
                setCandidateCount(selected.candidateCount);
                setUserVoteCount(selected.userVoteCount);
            })
        }
    }, []);

    const handleCreate = (e) => {
        e.preventDefault();
        const createElection = {
            name: name,
            startDate: startDate,
            endDate: endDate,
            isEnabled: isEnabled,
            isVoterHidden: isVoterHidden,
            candidateCount: candidateCount,
            userVoteCount: userVoteCount,
            id: params.id ? params.id : 0,
        };
        if (createElection.id) {
            //DO EDIT

            ElectionService.editElection(createElection.id, createElection).then(() => {
                alert("edited")
            });
        } else {
            //DO ADD

            ElectionService.addElection(createElection).then((data) => {
                alert(data.message)
                e.target.reset()
            });
        }
    };

    const handleIsEnabled = (e) => {
        // setIsEnabled(e.target.value)
        setIsEnabled(!isEnabled)
    };

    const handleIsVoterHidden = (e) => {
        setIsVoterHidden(e.target.value)
        setIsVoterHidden(!isVoterHidden)
    };

    const onStartDateHandler = (date) => {
        const object = {date, format: "YYYY-MM-DD"}
        const sDay = {gregorian: new DateObject(object).convert(gregorian, persian_en).format()}
        setStartDate(sDay.gregorian)
    };

    const onEndDateHandler = (date) => {
        const object = {date, format: "YYYY-MM-DD"};
        const eDay = {gregorian: new DateObject(object).convert(gregorian, persian_en).format()};
        setEndDate(eDay.gregorian);
    };

    console.log(candidateCount);

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
                                <div className="pe-4 ps-2">{UserInfo.firstName} {UserInfo.lastName}</div>
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
                                               defaultValue={selectedElection.name}
                                               placeholder="متن را وارد کنید"
                                               onChange={(e) => {
                                                   setName(e.target.value)
                                               }}/>
                                    </div>
                                    <div className="row col-md-5 d-flex mt-0 mb-2 me-3">
                                        <div className="text-start col-12 mt-0">
                                            <label className="form-label">2.تاریخ شروع انتخابات:</label>
                                        </div>
                                        <div className="text-start col-12">
                                            <DatePicker
                                                onChange={onStartDateHandler}
                                                value={selectedElection ? new Date(selectedElection.startDate) : ""}
                                                calendar={persian}
                                                locale={persian_fa}
                                                format={"YYYY-MM-DD"}
                                                render={<InputIcon/>}
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
                                                value={selectedElection ? new Date(selectedElection.endDate) : ""}
                                                calendar={persian}
                                                locale={persian_fa}
                                                format={"YYYY-MM-DD"}
                                                render={<InputIcon/>}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-start col-md-6 col-lg-4 my-2">
                                        <label className="form-label" htmlFor="e-nomines">4.تعداد کاندید های
                                            انتخابات:</label>
                                        <input className="form-control text-start" min="1" type="number" id="e-nomines"
                                               defaultValue={selectedElection.candidateCount}
                                               placeholder="تعداد کاندید ها را وارد کنید"
                                               onChange={(e) => {
                                                   setCandidateCount(e.target.value)
                                               }}/>
                                    </div>
                                    <div className="text-start col-md-6 col-lg-4 my-2">
                                        <label className="form-label" htmlFor="e-count">5.تعداد رأی برای هر
                                            کاربر:</label>
                                        <input className="form-control text-start" min="1" type="number" id="e-count"
                                               defaultValue={selectedElection.userVoteCount}
                                               placeholder="تعداد رأی را وارد کنید"
                                               onChange={(e) => {
                                                   setUserVoteCount(e.target.value)
                                               }}/>
                                    </div>
                                    <div className="text-start col-md-4 col-lg-4 my-2">
                                        <label className="form-label">6.رأی گیری مخفی:</label>
                                        <div className="col-md-12 pt-2">
                                            <div className="d-inline-flex col">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox"
                                                           role="switch" id="flexSwitchCheckDefault"
                                                           onChange={handleIsEnabled}
                                                           defaultValue={isEnabled}
                                                        // defaultChecked={isEnabled}
                                                    />
                                                    <label className="form-check-label"
                                                           htmlFor="flexSwitchCheckDefault">
                                                        {isEnabled === true ? "خیر" : "بله"}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 d-flex my-2">
                                        <div className="col-lg-3 col-xl-2 col-sm-3 col-4">
                                            <div className="form-check form-switch text-start">
                                                <input className="form-check-input" type="checkbox"
                                                       role="switch" id="flexSwitchCheckDefault"
                                                       onChange={handleIsVoterHidden}
                                                       defaultChecked={selectedElection.isVoterHidden}/>
                                                <label className="form-check-label"
                                                       htmlFor="flexSwitchCheckDefault">
                                                    {isVoterHidden === true ? "فعال" : "غیر فعال"}
                                                </label>
                                            </div>
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
        </div>
    );
};

export default CreateVote;