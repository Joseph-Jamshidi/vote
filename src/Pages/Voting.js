import React, {useEffect, useState} from 'react';
import Dashboard from "../layout/Dashboard";
import {UserInfo} from "../Services/info";
import ElectionService from "../Services/Election";
import "../styles/Voting.css";
import Ellipse656 from "../images/Ellipse656.png";
import Edit from "../images/Edit.png";
import pen from "../images/pencil.png";
import trash from "../images/trash.png";
import {useNavigate} from "react-router-dom";
import {DateObject} from "react-multi-date-picker";
import persian_en from "react-date-object/locales/persian_en";
import persian from "react-date-object/calendars/persian";

const Voting = () => {
    const [elections, setElections] = useState([]);
    const [delId, setDelId] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        ElectionService.takeElection().then((r) => {
            setElections(prepareData(r.data))
        })
    }, []);

    const prepareData = (elections) => {
        return elections.map(m => {
            m.persianStartDate = convertTime(m.startDate);
            m.persianEndDate = convertTime(m.endDate);
            return m;
        });
    }

    const handleChange = (e, id) => {
        e.preventDefault();
        setDelId(id);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setDelId("")
    }

    const handleDelete = (e) => {
        e.preventDefault();
        ElectionService.deleteElection(delId).then((r) => {
            const del = elections.filter(elc => delId !== elc.id);
            setElections(del);
            setDelId("");
            alert(r.message);
        })
    }

    const handleEdit = (e, id) => {
        e.preventDefault();
        navigate(`/CreateVote/${id}`);
    }

    const convertTime = (date) => {
        const dateObj = new Date(date);
        const object = {dateObj, format: "YYYY-MM-DD"}
        const persianDate = new DateObject(object).convert(persian, persian_en).format();
        return (persianDate)
    }

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
                            {
                                elections.length !== 0 ? null :
                                    <div className="text-start p-2" id="cp-1">
                                        هیچگونه انتخاباتی برای کاربر وجود ندارد
                                    </div>
                            }
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <td>عنوان انتخابات</td>
                                    <td>تاریخ شروع انتخابات</td>
                                    <td>تاریخ اتمام انتخابات</td>
                                    <td>تعداد کاندید های انتخابات</td>
                                    <td>تعداد رأی برای هر کاربر</td>
                                    <td>ویرایش</td>
                                    <td>حذف</td>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    elections.map((el) =>
                                        <tr key={el.id}>
                                            <td>{el.name}</td>
                                            {/*<td>{() => {
                                                convertTime(el.startDate)
                                            }}</td>*/}

                                            <td>{el.persianStartDate}</td>
                                            <td>{el.persianEndDate}</td>
                                            {/*<td>{el.endDate}</td>*/}
                                            <td>{el.candidateCount}</td>
                                            <td>{el.userVoteCount}</td>
                                            <td>
                                                <button className="btn" type="button"
                                                        onClick={(e) => handleEdit(e, el.id)}>
                                                    <img src={pen} alt=""/>
                                                </button>
                                            </td>
                                            <td>
                                                <button type="button" className="btn"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#staticBackdrop"
                                                        onClick={(e) => handleChange(e, el.id)}>
                                                    <img src={trash} alt=""/>
                                                </button>
                                                <div className="modal fade" id="staticBackdrop"
                                                     data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                                                     aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h1 className="modal-title fs-5">اخطار!</h1>
                                                                <button type="button" className="btn-close"
                                                                        data-bs-dismiss="modal"
                                                                        aria-label="Close" onClick={handleCancel}>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                آیا از حذف انتخابات مطمئن اید؟
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-success"
                                                                        data-bs-dismiss="modal"
                                                                        onClick={handleCancel}>خیر
                                                                </button>
                                                                <button type="button"
                                                                        className="btn btn-danger"
                                                                        onClick={handleDelete}
                                                                        data-bs-dismiss="modal">بله
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
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