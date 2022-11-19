import React, {useEffect, useState} from 'react';
import Dashboard from "../layout/Dashboard";
import AddUser from "../images/AddUser.png";
import "../styles/VoterManagement.css";
import pen from "../images/pencil.png";
import trash from "../images/trash.png";
import VoterModal from "../Components/VoterModal";
import VoterService from "../Services/Vote";
import {useParams} from "react-router-dom";

const VoterManagement = () => {

    const [delId, setDelId] = useState("");
    const [voter, setVoter] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pageCount, setPageCount] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const params = useParams();

    useEffect(() => {
        VoterService.getVoterList(params.id, pageNumber, pageSize).then((r) => {
            setVoter(r.data);
            setPageCount(r.total);
        })
    }, [pageNumber, pageSize, isUpdating]);

    const editVoter = (e) => {
        e.preventDefault();
        alert("این سرویس هنوز راه اندازی نشده است")
    };

    const selectVoter = (e, id) => {
        e.preventDefault();
        setDelId(id);
    };

    const cancelSelectedVoter = (e) => {
        e.preventDefault();
        setDelId("");
    };

    const deleteVoter = (e) => {
        e.preventDefault();
        VoterService.deleteVoter(delId, params.id).then((res) => {
            const del = voter.filter((d) => delId !== d.id);
            setVoter(del);
            setDelId("");
            alert(res.message);
            setIsUpdating(!isUpdating);
        })
    };

    let items = [];
    for (let number = 1; number <= (Math.ceil(pageCount / pageSize)); number++) {
        items.push(
            <li className="page-item px-1" key={number}>
                <button className={`page-link ${pageNumber === number ? "active" : ""}`}
                        onClick={() => setPageNumber(number)}>
                    {number}
                </button>
            </li>
        );
    }

    return (
        <div>
            <section className="d-md-flex gx-4">
                <Dashboard/>
                <div className="col mt-3 mx-3 px-3 sec">
                    <div className="text-start p-2 my-2" id="cp-1">
                        لیست کاربران دارای رأی
                    </div>
                    <button type="button" className="btn add-btn" data-bs-toggle="modal"
                            data-bs-target="#exampleModal">
                        <img src={AddUser} className="pe-1" alt=""/>
                        اضافه کردن
                    </button>
                    <VoterModal isUpdating={isUpdating} setIsUpdating={setIsUpdating}/>
                    <div className="for-table mt-2">
                        <table className="table table-striped mb-0">
                            <thead>
                            <tr>
                                <th className="th-border">ردیف</th>
                                <th className="th-border">عکس</th>
                                <th className="th-border">نام</th>
                                <th className="th-border">نام خانوادگی</th>
                                <th className="th-border">کد ملی</th>
                                <th className="th-border">شماره تلفن</th>
                                <th className="th-border">وضعیت</th>
                                <th className="th-border">ویرایش</th>
                                <th className="th-border">حذف</th>
                            </tr>
                            </thead>
                            <tbody>
                            {voter.map((v, i) =>
                                <tr key={v.id}>
                                    <td>{(pageNumber - 1) * 10 + (i + 1)}</td>
                                    <td>-</td>
                                    <td>{v.firstName}</td>
                                    <td>{v.lastName}</td>
                                    <td>{v.nationalCode}</td>
                                    <td>{v.phoneNumber}</td>
                                    <td>{v.isEnabled === true ? "فعال" : "غیرفعال"}</td>
                                    <td className="align-middle">
                                        <button className="btn" type="button"
                                                onClick={(e) => editVoter(e, v.id)}>
                                            <img src={pen} alt=""/>
                                        </button>
                                    </td>
                                    <td className="align-middle">
                                        <button type="button" className="btn"
                                                data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop"
                                                onClick={(e) => selectVoter(e, v.id)}>
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
                                                                aria-label="Close" onClick={cancelSelectedVoter}>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        آیا از حذف انتخابات مطمئن اید؟
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-success"
                                                                data-bs-dismiss="modal"
                                                                onClick={cancelSelectedVoter}>خیر
                                                        </button>
                                                        <button type="button"
                                                                className="btn btn-danger"
                                                                onClick={deleteVoter}
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
                                    onChange={(e) => setPageSize(e.target.value)}>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                        <div className="">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    {pageNumber !== 1 ?
                                        <li className="page-item">
                                            <button className="page-link" aria-label="Previous"
                                                    onClick={() => setPageNumber(pageNumber - 1)}>
                                                <span aria-hidden="true">&laquo;</span>
                                            </button>
                                        </li> : ""
                                    }
                                    {items}
                                    {pageNumber === Math.ceil(pageCount / pageSize) ? "" :
                                        <li className="page-item">
                                            <button className="page-link" aria-label="Previous"
                                                    onClick={() => setPageNumber(pageNumber + 1)}>
                                                <span aria-hidden="true">&raquo;</span>
                                            </button>
                                        </li>
                                    }
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VoterManagement;