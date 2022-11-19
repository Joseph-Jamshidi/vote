import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Arrow from "../images/Arrow - Left.png";
import Lock from "../images/Lock.png";
import Vector from "../images/Vector.png";
import Ellipse653 from "../images/Ellipse653.png";
import Ellipse652 from "../images/Ellipse652.png";
import Ellipse654 from "../images/Ellipse654.png";
import {UserInfo} from "../Services/info";
import UserService from "../Services/User";
import {clear} from "@testing-library/user-event/dist/clear";

const ResetPassword = () => {

    const [password, setPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        const changePassword = {
            password: password,
            id: UserInfo.userId
        };
        UserService.resetPassword(changePassword).then((r) => {
            if (r.isSuccess === true) {
                alert(r.message);
                localStorage.clear();
                window.location.href = "./login";
            }else {
                alert("رمز عبور باید حداقل 6 کارکتر باشد")
            }
        })
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    };

    return (
        <>
            <div>
                <div className="mx-auto login-page col-lg-4 col-md-6 col-11">
                    <div className="d-flex mt-4 ms-2">
                        <Link to="/">
                            <img src={Arrow} className="mt-2" alt=""/>
                        </Link>
                        <div id="enter">ورود</div>
                    </div>
                    <form className="login-form" onSubmit={submitHandler}>
                        <div className="form-floating">
                            <input className="form-control" type="password" id="pass" placeholder="username"
                                   onInput={passwordHandler}/>
                            <label className="form-label" htmlFor="pass">
                                <img src={Lock} alt="" className=""/>
                                رمز عبور
                            </label>
                        </div>
                        <div className="text-center mt-4 mb-3">
                            <button className="btn login-btn col-11 py-2 mb-0" type="submit">تغییر رمز عبور
                            </button>
                        </div>
                    </form>
                </div>
                <img src={Vector} alt="" className="b-left d-md-block d-none"/>
                <img src={Ellipse653} alt="" className="b-left d-md-block d-none"/>
                <img src={Ellipse652} alt="" className="b-left d-md-block d-none"/>
                <img src={Vector} alt="" className="b-right d-md-block d-none"/>
                <img src={Ellipse653} alt="" className="b-right d-md-block d-none"/>
                <img src={Ellipse654} alt="" className="b-right d-md-block d-none"/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        </>
    );
};

export default ResetPassword;