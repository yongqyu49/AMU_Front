import styles from "../../css/user/Profile.module.css";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";

const Profile = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    // 모달 열기
    const openModal = () => {
        setIsModalVisible(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalVisible(false);
    };

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
                                                        <span className={styles.user_sc_artwork}></span>
                                                    </div>
                                                    <button type={"button"} className={styles.edit_image_button}>
                                                        Upload image
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.profile_header_info_content}>
                                            <h2 className={styles.profile_header_info_username}>최용규</h2>
                                            <div style={{ display: "inline-block" }}></div>
                                            <br />
                                            <h3 style={{ marginTop: "4px" }}>Q</h3>
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
                                            <Link to={""} className={styles.g_tabs_link}>All</Link>
                                        </li>
                                        <li className={styles.g_tabs_item}>
                                            <Link to={""} className={styles.g_tabs_link}>Popular tracks</Link>
                                        </li>
                                        <li className={styles.g_tabs_item}>
                                            <Link to={""} className={styles.g_tabs_link}>Tracks</Link>
                                        </li>
                                        <li className={styles.g_tabs_item}>
                                            <Link to={""} className={styles.g_tabs_link}>Albums</Link>
                                        </li>
                                        <li className={styles.g_tabs_item}>
                                            <Link to={""} className={styles.g_tabs_link}>Playlist</Link>
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
                        {isModalVisible && <Modal closeModal={closeModal} />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
