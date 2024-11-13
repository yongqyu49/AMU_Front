import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./component/Layout";
import NotFound from "./component/NotFound";
import SignIn from "./component/user/SignIn";
import SignUp from "./component/user/SignUp";
import MainPage from "./component/music/MainPage";
import Contents from "./component/music/Contents";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout><Contents /></Layout>} />
                <Route path="/signIn" element={<Layout><SignIn /></Layout>} />
                <Route path="/signUp" element={<Layout><SignUp /></Layout>} />
                <Route path="/mainPage" element={<Layout><MainPage /></Layout>}/>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
