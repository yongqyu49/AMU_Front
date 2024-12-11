import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import NotFound from "./component/NotFound";
import SignIn from "./component/user/SignIn";
import SignUp from "./component/user/SignUp";
import MainPage from "./component/music/MainPage";
import Contents from "./component/music/Contents";
import Upload from "./component/Upload";
import Player from "./component/playlist/Player";
import Profile from "./component/user/Profile";
import MusicDetail from "./component/music/MusicDetail";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout><Contents /></Layout>} />
                <Route path="/signIn" element={<Layout><SignIn /></Layout>} />
                <Route path="/signUp" element={<Layout><SignUp /></Layout>} />
                <Route path="/mainPage" element={<Layout><MainPage /></Layout>}/>
                <Route path="/upload" element={<Layout><Upload /></Layout>} />
                <Route path="/feed" element={<Layout><Player /></Layout>} />
                <Route path="/profile" element={<Layout><Profile /></Layout>} />
                <Route path="/music/:musicCode" element={<Layout><MusicDetail /></Layout>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
