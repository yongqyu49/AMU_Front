import { useEffect, useRef, useState } from "react";
import styles from '../css/Header.module.css';
import { Link } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import axios from "axios";
import useGetUserInfo from "../hooks/useGetUserInfo";
import SignIn from "./user/SignIn.jsx";
import SignUp from "./user/SignUp.jsx";
import {usePlaylist} from "./PlaylistContext";

const Header = () => {
    const isLoggedIn = useAuth();
    const { userInfo, isLoading } = useGetUserInfo();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const { setTrackList, setSelectedTrack } = usePlaylist();

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null); // 드롭다운 감지용 ref

    const signOut = () => {
        axios.post("http://localhost:8787/user/signOut", {}, {
            withCredentials: true
        })
            .then(() => {
                alert("로그아웃 되었습니다.");

                // PlaylistProvider 상태 초기화
                setTrackList([]); // 재생목록 초기화
                setSelectedTrack(null); // 선택된 노래 초기화

                // 로컬스토리지에서 재생목록 삭제
                localStorage.removeItem(`playlist_${userInfo.id}`);
                localStorage.removeItem("id");
                window.location.href = "/";
            })
            .catch(() => {
                alert("로그아웃 중 오류가 발생했습니다.");
            });
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openModal1 = () => setIsModalOpen1(true);
    const closeModal1 = () => setIsModalOpen1(false);

    // 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false); // 드롭다운 닫기
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchResults = async () => {
            if (query.length > 0) {
                try {
                    const response = await axios.get(`http://localhost:8787/music/search?query=${query}`);
                    setResults(response.data);
                    setShowDropdown(true);
                } catch (error) {
                    console.error("Search error:", error);
                }
            } else {
                setShowDropdown(false);
            }
        };

        fetchResults();
    }, [query]); // `query`가 변경될 때 실행

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleResultClick = () => {
        setShowDropdown(false);
    };

    if (isLoading) {
        return (
            <div className={styles.header}>
                <p>Loading...</p>
            </div>
        );
    }

    return (
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
                        <form className={styles.header_search_form} ref={dropdownRef}>
                            <input
                                type="text"
                                className={styles.header_search_input}
                                placeholder="Search by title or artist"
                                value={query}
                                onChange={handleInputChange}
                                onClick={() => setShowDropdown(true)}
                            />
                            {showDropdown && results.length > 0 && (
                                <ul className={styles.searchDropdown}>
                                    {results.map((result, index) => (
                                        <Link to={`/music/${String(result.musicCode)}`}
                                              style={{color: "#333", textDecoration: "none"}}
                                              key={index}
                                        >
                                            <li
                                                className={`${styles.searchResult}`}
                                                onClick={handleResultClick}
                                            >
                                                <span>{result.title} - {result.artist}</span>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            )}
                            <button type="button" className={styles.search_button}>Search</button>
                        </form>
                    </div>
                </div>
                <div className={styles.header_right}>
                    {isLoggedIn && (
                            <div className={styles.header_upsell}>
                                <Link to="/upload" className={styles.upload_link}>Upload</Link>
                            </div>
                        )}
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
            <SignIn isOpen={isModalOpen} onClose={closeModal} />
            <SignUp isOpen1={isModalOpen1} onClose1={closeModal1} openSignIn={openModal} />
        </div>
    );
};

export default Header;
