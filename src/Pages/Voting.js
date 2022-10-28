import React, {useEffect, useState} from 'react';
import Dashboard from "../layout/Dashboard";
import {fName, lName} from "../Services/info";
import ElectionService from "../Services/Election";
import "../styles/Voting.css";
import Ellipse656 from "../images/Ellipse656.png";
import Edit from "../images/Edit.png";
import pen from "../images/pencil.png";
import trash from "../images/trash.png";

const Voting = () => {
    const [elections, setElections] = useState([]);
    useEffect(() => {
        ElectionService.takeElection().then((r) => {
            setElections(r.data)
        })
    }, [elections]);
   /* const handleDelete = (e, id) => {
        e.preventDefault();
        ElectionService.deleteElection(id).then(() => {
            window.location.href = "./Voting"
            alert("deleted")
        })
    }*/

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
                                هیچگونه انتخاباتی برای کاربر وجود ندارد
                            </div>
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
                                    elections.map((f) =>
                                        <tr key={f.id}>
                                            <td>{f.name}</td>
                                            <td>{f.startDate}</td>
                                            <td>{f.endDate}</td>
                                            <td>{f.candidateCount}</td>
                                            <td>{f.userVoteCount}</td>
                                            <td>
                                                <img src={pen} alt=""/>
                                            </td>
                                            <td>
                                                <button type="button" className="btn"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#staticBackdrop">
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
                                                                        aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                آیا از حذف انتخابات مطمئن اید؟
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-success"
                                                                        data-bs-dismiss="modal">خیر
                                                                </button>
                                                                <button type="button"
                                                                        className="btn btn-danger"
                                                                       /* onClick={(e) => handleDelete(e, f.id)}*/
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