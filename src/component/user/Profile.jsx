import styles from "../../css/user/Profile.module.css";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import {useState} from "react";
import useGetUserInfo from "../../hooks/useGetUserInfo";
// import axios from "axios";

const Profile = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const userInfo = useGetUserInfo();

    // 모달 열기
    const openModal = () => {
        setIsModalVisible(true);
    };

    // 모달 닫기
    const closeModal = (refresh = false) => {
        setIsModalVisible(false);
        if (refresh) {
            window.location.reload();

            // axios
            //     .get("http://localhost:8787/user/current", { withCredentials: true })
            //     .then((response) => {
            //         setUserInfo(response.data); // 최신 데이터로 갱신
            //     })
            //     .catch((error) => {
            //         console.error("Failed to refresh user info:", error);
            //     });
        }
    };

    // `userInfo`가 아직 로드되지 않은 경우 로딩 표시
    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.product_banners}></div>
                <div className={styles.content}>
                    <div>
                        <div className={styles.user_hero}>
                            <div className={styles.profile_header}>
                                <div className={styles.profile_header_edit}>
                                    <div className={styles.profile_header_chooser}>
                                        <div>
                                            <button type={"button"} className={styles.profile_header_button}>
                                                Upload header image
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.profile_header_info}>
                                    <div className={styles.sc_media}>
                                        <div className={styles.profile_header_avatar}>
                                            <div className={styles.edit_image}>
                                                <div className={styles.edit_image_select}>
                                                    <div className={styles.image_outline}>
                                                        <span className={styles.user_sc_artwork}
                                                              style={{
                                                                  backgroundImage: `url(http://localhost:8787/${userInfo.profileImg})`,
                                                                  backgroundSize: "cover",
                                                                  backgroundPosition: "center"
                                                              }}
                                                        ></span>
                                                    </div>
                                                    <button type={"button"} className={styles.edit_image_button}>
                                                        Upload image
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.profile_header_info_content}>
                                            <h2 className={styles.profile_header_info_username}>{userInfo.id}</h2>
                                            <div style={{ display: "inline-block" }}></div>
                                            <br />
                                            <h3 style={{ marginTop: "4px" }}>{userInfo.artist}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.profile_header_background}></div>
                            </div>
                        </div>
                        <div className={styles.vertical_bar}>
                            <div className={styles.user_info_bar}>
                                <div className={styles.user_info_bar_tabs}>
                                    <ul className={styles.profile_tabs}>
                                        <li className={styles.g_tabs_item}>
                                            <Link to={""} className={styles.g_tabs_link}>Upload</Link>
                                        </li>
                                        <li className={styles.g_tabs_item}>
                                            <Link to={""} className={styles.g_tabs_link}>Playlist</Link>
                                        </li>
                                        <li className={styles.g_tabs_item}>
                                            <Link to={""} className={styles.g_tabs_link}>Favorite</Link>
                                        </li>
                                        <li className={styles.g_tabs_item}>
                                            <Link to={""} className={styles.g_tabs_link}>Review</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className={styles.user_info_bar_buttons}>
                                    <div className={styles.sc_button_group}>
                                        <button
                                            type={"button"}
                                            className={styles.sc_button_edit}
                                            onClick={openModal}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 모달 컴포넌트 */}
                        {isModalVisible && <Modal closeModal={closeModal} userInfo={userInfo} />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;