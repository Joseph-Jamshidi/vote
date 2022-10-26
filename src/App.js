import React from 'react';
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./Pages/Main";
import {setAuthToken} from "./Services/token";
import UserProfile from "./Pages/UserProfile";
import Voting from "./Pages/Voting";
import CreateVote from "./Pages/CreateVote";
import UserList from "./Pages/UserList";
import Header from "./layout/Header";

const App = () => {
    const token = localStorage.getItem("token");
    if (token) {
        setAuthToken(token);
    }
    return (<div>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Main/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/UserProfile" element={<UserProfile/>}></Route>
                <Route path="/Voting" element={<Voting/>}></Route>
                <Route path="/CreateVote" element={<CreateVote/>}></Route>
                <Route path="/UserList" element={<UserList/>}></Route>
            </Routes>
        </BrowserRouter>
    </div>);
};

export default App;