import React, {useEffect, useState} from 'react';
import "../styles/style.css";
import Group from "../images/Group.png";
import Vector from "../images/Vector.png";
import Vector1 from "../images/Vector1.png";
import Polygon2 from "../images/Polygon 2.png";
import Polygon1 from "../images/Polygon 1.png";
import Polygon3 from "../images/Polygon 3.png";
import Polygon4 from "../images/Polygon 4.png";
import r3 from "../images/r3.png";
import r2 from "../images/r2.png";
import r1 from "../images/r1.png";
import Ellipse647 from "../images/Ellipse647.png";
import Ellipse648 from "../images/Ellipse648.png";
import {Link} from "react-router-dom";
import {setAuthToken} from "../Services/token";
import ElectionService from "../Services/Election"
import {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";

const HomePage = () => {
    const [votableElections, setVotableElections] = useState([])

    useEffect(() => {
        ElectionService.votableElection().then((r) => {
            setVotableElections(prepareData(r.data));
        })
    }, []);

    const token = localStorage.getItem("token");
    if (token) {
        setAuthToken(token);
    }

    const prepareData = (votableElections) => {
        return votableElections.map((v) => {
            v.persianStartDate = convertTime(v.startDate);
            v.persianEndDate = convertTime(v.endDate);
            return v;
        })
    }

    const convertTime = (date) => {
        let dateObj = new Date(date);
        let object = {dateObj, format: "YYYY-MM-DD"}
        let d22 = new Date(2000, 1, 1);
        let object2 = {dateObj, format: "YYYY-MM-DD"}
        let persianDate = new DateObject(object).convert(persian, persian_en).format();
        let p1 = new DateObject(object2).convert(persian, persian_en).format();
        return (persianDate)
    }

    console.log(votableElections)

    return (
        <div>
            <div className="position-relative section2">
                <div className="container">
                    <div className="row d-flex justify-content-md-around">
                        <div className="col-lg-6 text-lg-start text-center enableElections">
                            <div>
                                <h1 className="electionsHeader">انتخابات های در حال اجرا</h1>
                                {
                                    votableElections.map((ve, index) =>
                                        <div
                                            className={index % 2 === 0 ?
                                                "cardElectionEven d-flex justify-content-between mt-2" :
                                                "cardElectionOdd d-flex justify-content-between mt-2"}
                                            key={ve.id}>
                                            <span className="align-">{ve.name}</span>
                                            <span>از: {ve.persianStartDate}</span>
                                            <span>تا: {ve.persianEndDate}</span>
                                            <Link className="voteButton" id="">
                                                <span className="p-md-1">شرکت در انتخابات</span>
                                            </Link>
                                        </div>
                                    )
                                }
                            </div>
                            {token ? "" :
                                <div className="container px-0 mt-5 text-center">
                                    <div className="row gx-5 d-flex justify-content-center justify-content-lg-start">
                                        <div className="col-lg-3 col-md-6 col-sm-8">
                                            <div className="py-1 card">
                                                <Link to="./Register" id="signup2">ثبت نام</Link>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-sm-8">
                                            <div className="py-1 card" id="login2">
                                                <Link to="./Login">ورود</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="col-lg-6 d-flex justify-content-sm-center">
                            <img className="img-fluid" src={Group} alt=""/>
                        </div>
                    </div>
                    <img className="img-fluid d-lg-block d-none" id="img1" src={Vector} alt=""/>
                    <img className="img-fluid d-lg-block d-none" id="img2" src={Vector1} alt=""/>
                    <img className="img-fluid d-lg-block d-none" id="img3" src={Polygon2} alt=""/>
                    <img className="img-fluid d-lg-block d-none" id="img4" src={Polygon1} alt=""/>
                    <img className="img-fluid d-lg-block d-none" id="img5" src={Polygon3} alt=""/>
                    <img className="img-fluid d-lg-block d-none" id="img6" src={Polygon4} alt=""/>
                </div>
            </div>
            <div className="section3">
                <div className="in-sec3">
                    <div className="container px-5 text-center">
                        <div className="row gx-0 justify-content-around">
                            <div className="col-xl-3 col-lg-4 col-md-7 col-sm-8">
                                <div className="p-0">
                                    <div className="article">
                                        <img className="img-fluid bt-img" src={r3} alt=""/>
                                        <h5 className="txt">ایجاد انتخابات</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-7 col-sm-8">
                                <div className="p-0">
                                    <div className="article">
                                        <img className="img-fluid bt-img" src={r2} alt=""/>
                                        <h5 className="txt">ثبت رأی</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-7 col-sm-8">
                                <div className="p-0">
                                    <div className="article">
                                        <img className="img-fluid bt-img" src={r1} alt=""/>
                                        <h5 className="txt">راهنمای ایجاد انتخابات</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section4 position-relative">
                <div className="in-sec4">
                    <div className="container px-5">
                        <h3 className="header4">
                            مزایای انتخابات الکترونیک
                        </h3>
                        <div className="row gx-5 justify-content-center">
                            <div className="col-xl-3 col-lg-4 col-md-7 col-sm-8 dw-btn"></div>
                            <div className="col-xl-3 col-lg-4 col-md-7 col-sm-8 dw-btn"></div>
                            <div className="col-xl-3 col-lg-4 col-md-7 col-sm-8 dw-btn"></div>
                        </div>
                    </div>
                </div>
                <img className="img-fluid" id="img7" src={Ellipse647} alt=""/>
                <img className="img-fluid" id="img8" src={Ellipse648} alt=""/>
            </div>
        </div>
    );
};

export default HomePage;