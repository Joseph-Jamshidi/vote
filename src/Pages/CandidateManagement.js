import React, {useEffect, useRef, useState} from 'react';
import Dashboard from "../layout/Dashboard";
import AddUser from "../images/AddUser.png";
import CandidateService from "../Services/Candidate"
import pen from "../images/pencil.png";
import trash from "../images/trash.png";
import CandidateModal from "../Components/CandidateModal";

const CandidateManagement = () => {

    const [candidate, setCandidate] = useState([]);
    const [delId, setDelId] = useState("");
    const [selected, setSelected] = useState("");
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [pageNumber, setPageNumber] = useState("");
    const editRef = useRef(null);

    useEffect(() => {
        CandidateService.getCandidate(page, size).then((r) => {
            setCandidate(r.data);
            setPageNumber(r.total);
        })
    }, [size, page]);

    const editCandidate = (e, id) => {
        e.preventDefault();
        editRef.current.click();
        CandidateService.chosenCandidate(id).then((res) => {
            setSelected(res.data)
        })
    };

    const selectCandidate = (e, id) => {
        e.preventDefault();
        setDelId(id);
    }

    const cancelSelectedCandidate = (e) => {
        e.preventDefault();
        setDelId("");
    };

    const deleteCandidate = (e) => {
        e.preventDefault();
        CandidateService.deleteCandidate(delId).then((r) => {
            const del = candidate.filter((d) => delId !== d.id);
            setCandidate(del);
            setDelId("");
            alert(r.message);
        })
    };

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

    const saveHandler = (candidate) => {
        setCandidate([...candidate])
    };

    return (
        <>
            <section className="d-md-flex gx-4">
                <Dashboard/>
                <CandidateModal onSave={saveHandler} selected={selected} setSelected={setSelected}/>
                <div className="col mt-3 mx-3 px-3 sec">
                    <div className="text-start p-2 my-2" id="cp-1">
                        لیست کاندیدها
                    </div>
                    <button type="button" className="btn add-btn" data-bs-toggle="modal" ref={editRef}
                            data-bs-target="#staticBackdrop1">
                        <img src={AddUser} className="pe-1" alt=""/>
                        اضافه کردن
                    </button>
                    <div className="for-table mt-2">
                        <table className="table table-striped mb-0">
                            <thead>
                            <tr>
                                <th className="th-border">ردیف</th>
                                <th className="th-border">عکس</th>
                                <th className="th-border">نام و نام خانوادگی</th>
                                <th className="th-border">توضیحات</th>
                                <th className="th-border">وضعیت</th>
                                <th className="th-border">ویرایش</th>
                                <th className="th-border">حذف</th>
                            </tr>
                            </thead>
                            <tbody>
                            {candidate.map((c, i) => <tr key={c.id}>
                                <td>{(page - 1) * 10 + (i + 1)}</td>
                                <td>-</td>
                                <td>{c.name}</td>
                                <td>{c.description}</td>
                                <td>{c.isEnabled === true ? "فعال" : "غیرفعال"}</td>
                                <td className="align-middle">
                                    <button className="btn" type="button"
                                            onClick={(e) => editCandidate(e, c.id)}>
                                        <img src={pen} alt=""/>
                                    </button>
                                </td>
                                <td className="align-middle">
                                    <button type="button" className="btn"
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                            onClick={(e) => selectCandidate(e, c.id)}>
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
                                                            aria-label="Close" onClick={cancelSelectedCandidate}>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    آیا از حذف انتخابات مطمئن اید؟
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-success"
                                                            data-bs-dismiss="modal"
                                                            onClick={cancelSelectedCandidate}>خیر
                                                    </button>
                                                    <button type="button"
                                                            className="btn btn-danger"
                                                            onClick={deleteCandidate}
                                                            data-bs-dismiss="modal">بله
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>)}
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
                                                    onClick={() => setPage(prevState => {
                                                        return prevState - 1
                                                    })}>
                                                <span aria-hidden="true">&laquo;</span>
                                            </button>
                                        </li> : ""
                                    }
                                    {items}
                                    {page === Math.ceil(pageNumber / size) ? "" :
                                        <li className="page-item">
                                            <button className="page-link" aria-label="Previous"
                                                    onClick={() => setPage(prevState => {
                                                        return prevState + 1
                                                    })}>
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
        </>);
};

export default CandidateManagement;