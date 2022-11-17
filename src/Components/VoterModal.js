import React, {useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import Vote from "../Services/Candidate";

const VoterModal = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nationalCode, setNationalCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const itemRef = useRef(null);
    const params = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        const addVoter = {
            userVoters: [
                {
                    firstName: firstName,
                    lastName: lastName,
                    nationalCode: nationalCode,
                    phoneNumber: phoneNumber
                }
            ],
            electionId: params.id
        };

        Vote.addVoter(addVoter).then((data) => {
            alert(data.message);
            itemRef.current.click();
        })
    };


    const cancelAdding = (e) => {
        e.preventDefault();
        setFirstName("");
        setLastName("");
        setNationalCode("");
        setPhoneNumber("");
    };

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">اضافه کردن کاندید</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={(e) => cancelAdding(e)}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name"
                                           className="col-form-label">نام و نام خانوادگی:</label>
                                    <input type="text" className="form-control" id="recipient-name"
                                           value={firstName}
                                           onChange={(e) => setFirstName(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name"
                                           className="col-form-label">نام خانوادگی:</label>
                                    <input type="text" className="form-control" id="recipient-name"
                                           onChange={(e) => setLastName(e.target.value)} value={lastName}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name"
                                           className="col-form-label">کد ملی:</label>
                                    <input type="number" className="form-control" id="recipient-name"
                                           onChange={(e) => setNationalCode(e.target.value)}
                                           value={nationalCode}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name"
                                           className="col-form-label">شماره تلفن:</label>
                                    <input type="number" className="form-control" id="recipient-name"
                                           onChange={(e) => setPhoneNumber(e.target.value)}
                                           value={phoneNumber}/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                            ref={itemRef} onClick={(e) => cancelAdding(e)}>
                                        بستن
                                    </button>
                                    <button type="submit" className="btn btn-primary">افزودن</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default VoterModal;