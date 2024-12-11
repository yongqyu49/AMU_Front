import styles from '../css/Header.module.css';
import { Link } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import axios from "axios";
import useGetUserInfo from "../hooks/useGetUserInfo";
import SignIn from "./user/SignIn.jsx";
import { useState } from "react";
import SignUp from "./user/SignUp.jsx";

const Header = () => {
    const isLoggedIn = useAuth();
    const userInfo = useGetUserInfo();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);

    const signOut = () => {
        console.log("로그아웃 시도");
        axios.post("http://localhost:8787/user/signOut", {}, {
            withCredentials: true
        })
            .then(response => {
                console.log("로그아웃 성공:", response);
                alert("로그아웃 되었습니다.");
                window.location.href = "/";
            })
            .catch(error => {
                console.error("로그아웃 중 오류 발생:", error);
                alert("로그아웃 중 오류가 발생했습니다.");
            });
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openModal1 = () => setIsModalOpen1(true);
    const closeModal1 = () => setIsModalOpen1(false);

    return (
        <>
            <div className={styles.header}>
                <div className={styles.header_inner}>
                    <div className={styles.header_left}>
                        <div className={styles.header_logo}>
                            <Link to="/" className={styles.header_logo_link} />
                        </div>
                        <nav className={styles.header_nav}>
                            <ul className={styles.header_nav_ul}>
                                <li className={styles.header_nav_li}>
                                    <Link to="/mainPage" className={styles.header_nav_link}>Home</Link>
                                </li>
                                <li className={styles.header_nav_li}>
                                    <Link to="/music" className={styles.header_nav_link}>Feed</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className={styles.header_middle}>
                        <div className={styles.header_search} role="search">
                            <form className={styles.header_search_form}>
                                <input type="search" className={styles.header_search_input} placeholder="Search" />
                                <button type="button" className={styles.search_button}>Search</button>
                            </form>
                        </div>
                    </div>
                    <div className={styles.header_right}>
                        <div className={styles.header_upsell}>
                            <Link to="/upload" className={styles.upload_link}>Upload</Link>
                        </div>
                        <div className={styles.header_user_nav}>
                            {isLoggedIn ? (
                                <>
                                    <Link to={`/profile/${userInfo.id}`} className={styles.header_user_nav_button}>
                                        <div className={styles.header_user_nav_item}>
                                            <span
                                                className={styles.header_user_nav_avatar}
                                                style={{
                                                    backgroundImage: `url(http://localhost:8787/${userInfo?.profileImg || 'default-profile.png'})`
                                                }}
                                            ></span>
                                        </div>
                                    </Link>
                                    <span className={styles.logout_link} onClick={signOut}>Sign out</span>
                                </>
                            ) : (
                                <>
                                    <span onClick={openModal} className={styles.signin_link}>SignIn</span>
                                    <span onClick={openModal1} className={styles.signup_link}>SignUp</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <SignIn isOpen={isModalOpen} onClose={closeModal} />
            <SignUp isOpen1={isModalOpen1} onClose1={closeModal1} />
        </>
    );
};

export default Header;
