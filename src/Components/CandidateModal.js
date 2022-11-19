import React, {useRef, useState} from 'react';
import CandidateService from "../Services/Candidate";
import {useParams} from "react-router-dom";

const CandidateModal = (props) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);
    const itemRef = useRef(null);
    const params = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        const addCandidate = {
            name: name,
            description:
            description,
            isEnabled: isEnabled,
            electionId: params.id,
            id: props.selectedCandidate ? props.selectedCandidate.id : 0
        };

        if (props.selectedCandidate) {
            CandidateService.editCandidate(props.selectedCandidate.id, addCandidate).then((res) => {
                alert(res.message)
                if (res.statusCode === 'Success') {
                    itemRef.current.click();
                    props.setIsUpdating(!props.isUpdating);
                }
            })
        } else {
            CandidateService.addCandidate(addCandidate).then((data) => {
                alert(data.message);
                setName("");
                setDescription("");
                setIsEnabled("");
                if (data.statusCode === 'Success') {
                    itemRef.current.click();
                    props.setIsUpdating(!props.isUpdating);
                }
            })
        }
    };

    const isEnabledChanger = () => {
        setIsEnabled(!isEnabled);
    };

    const cancelAdding = (e) => {
        e.preventDefault();
        props.setSelectedCandidate("")
        setName("");
        setDescription("");
        setIsEnabled("");
    };

    return (
        <>
            <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">اضافه کردن کاندید</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name"
                                           className="col-form-label">نام و نام خانوادگی:</label>
                                    <input type="text" className="form-control" id="recipient-name"
                                           onChange={(e) => setName(e.target.value)}
                                           defaultValue={props.selectedCandidate.name}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">توضیحات:</label>
                                    <textarea className="form-control" id="message-text" value={description}
                                              onChange={(e) => {
                                                  setDescription(e.target.value)
                                              }}>
                                        </textarea>
                                </div>
                                <div>
                                    <input className="form-check-input" type="checkbox"
                                           role="switch" id="flexSwitchCheckDefault"
                                           onChange={isEnabledChanger}
                                           checked={isEnabled}
                                    />
                                    <label className="form-check-label"
                                           htmlFor="flexSwitchCheckDefault">
                                        {isEnabled === true ? "فعال" : "غیرفعال"}
                                    </label>
                                </div>
                                <div className="modal-footer">
                                    <button ref={itemRef} type="button" className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                            onClick={(e) => cancelAdding(e)}>
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

export default CandidateModal;