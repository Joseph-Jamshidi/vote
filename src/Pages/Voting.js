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

    const [size, setSize] = useState(10);
    const [elections, setElections] = useState([]);
    const [delId, setDelId] = useState("");
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        ElectionService.takeElection(page, size).then((r) => {
            setElections(prepareData(r.data));
            setPageNumber(r.total);
        })
    }, [page, size]);

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
        navigate(`../CreateVote/${id}`);
    }

    const convertTime = (date) => {
        const dateObj = new Date(date);
        const object = {dateObj, format: "YYYY-MM-DD"}
        const persianDate = new DateObject(object).convert(persian, persian_en).format();
        return (persianDate)
    }

    let items = [];
    for (let number = 1; number <= (Math.ceil(pageNumber / size)); number++) {
        items.push(
            <li className="page-item px-1" key={number}>
                <button className={`page-link ${page === number ? "active" : ""}`}
                        onClick={() => setPage(number)}>
                    {number}
                </button>
            </li>
        );
    }

    const handleCandidateManagement = (e, id) => {
        e.preventDefault();
        navigate(`../CandidateManagement/${id}`);
    }

    const handleVoterManagement = (e, id) => {
        e.preventDefault();
        navigate(`../VoterManagement/${id}`);
    };

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
                            <div className="for-table">
                                <table className="table table-striped mb-0">
                                    <thead>
                                    <tr>
                                        <th className="th-border">ردیف</th>
                                        <th className="th-border">عنوان انتخابات</th>
                                        <th className="th-border">تاریخ شروع انتخابات</th>
                                        <th className="th-border">تاریخ اتمام انتخابات</th>
                                        <th className="th-border">تعداد کاندید های انتخابات</th>
                                        <th className="th-border">تعداد رأی برای هر کاربر</th>
                                        <th className="th-border">مدیریت کا</th>
                                        <th className="th-border">مدیریت رأی</th>
                                        <th className="th-border">ویرایش</th>
                                        <th className="th-border">حذف</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        elections.map((el, i) =>
                                            <tr key={el.id}>
                                                <td className="align-middle">{(page - 1) * 10 + (i + 1)}</td>
                                                <td className="align-middle">{el.name}</td>
                                                <td className="align-middle">{el.persianStartDate}</td>
                                                <td className="align-middle">{el.persianEndDate}</td>
                                                <td className="align-middle">{el.candidateCount}</td>
                                                <td className="align-middle">{el.userVoteCount}</td>
                                                <td className="align-middle p-0 px-1">
                                                    <button className="btn manage-btn p-2" type="button"
                                                            onClick={(e) => handleCandidateManagement(e, el.id)}>
                                                        مدیریت کاندیدا
                                                    </button>
                                                </td>
                                                <td className="align-middle p-0">
                                                    <button className="btn manage-btn p-2" type="button"
                                                            onClick={(e) => handleVoterManagement(e, el.id)}>
                                                        مدیریت رأی دهنده
                                                    </button>
                                                </td>
                                                <td className="align-middle">
                                                    <button className="btn" type="button"
                                                            onClick={(e) => handleEdit(e, el.id)}>
                                                        <img src={pen} alt=""/>
                                                    </button>
                                                </td>
                                                <td className="align-middle">
                                                    <button type="button" className="btn"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#staticBackdrop"
                                                            onClick={(e) => handleChange(e, el.id)}>
                                                        <img src={trash} alt=""/>
                                                    </button>
                                                    <div className="modal fade" id="staticBackdrop"
                                                         data-bs-backdrop="static" data-bs-keyboard="false"
                                                         tabIndex="-1"
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
                            </div>
                            <div className="d-flex justify-content-evenly mt-3" dir="ltr">
                                <div className="col-2">
                                    <select className="form-select" aria-label="Default select example"
                                            onChange={(e) => setSize(e.target.value)}>
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>
                                <div className="">
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            {page !== 1 ?
                                                <li className="page-item">
                                                    <button className="page-link" aria-label="Previous"
                                                            onClick={() => setPage(page - 1)}>
                                                        <span aria-hidden="true">&laquo;</span>
                                                    </button>
                                                </li> : ""
                                            }
                                            {items}
                                            {page === Math.ceil(pageNumber / size) ? "" :
                                                <li className="page-item">
                                                    <button className="page-link" aria-label="Previous"
                                                            onClick={() => setPage(page + 1)}>
                                                        <span aria-hidden="true">&raquo;</span>
                                                    </button>
                                                </li>
                                            }
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Voting;