import styles from "../../css/user/Profile.module.css";
import Modal from "./Modal";
import React, {useState} from "react";
import MyUpload from "./MyUpload";
import MyPlaylist from "./MyPlaylist";
import MyReview from "./MyReview";
import MyFavorite from "./MyFavorite";
import {useParams} from "react-router-dom";
import useGetUserGetParam from "../../hooks/useUserGetParam";
import userImg from "../../img/user.png";
import SideBar from "../SideBar";
// import axios from "axios";

const Profile = ({setSelectedTrack}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState("upload");
    const {id} = useParams();
    const userInfo = useGetUserGetParam({id: id});

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

    const renderContent = () => {
        switch (activeTab) {
            case "upload":
                return <MyUpload setSelectedTrack={setSelectedTrack} id={id} />;
            case "playlist":
                return <MyPlaylist id={id} />;
            case "favorite":
                return <MyFavorite setSelectedTrack={setSelectedTrack} id={id} />;
            case "review":
                return <MyReview id={id} />;
            default:
                return <p>알 수 없는 탭입니다.</p>;
        }
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
                                            {localStorage.getItem("id") === id && (
                                                <button
                                                    type={"button"}
                                                    className={styles.sc_button_edit}
                                                    onClick={openModal}
                                                    style={{
                                                        marginRight: "350px",
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            )}
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
                                                                    backgroundImage: `url(${userInfo.profileImg ? `http://localhost:8787/${userInfo.profileImg}` : userImg})`,
                                                                    ...(userInfo.profileImg
                                                                        ? {
                                                                            backgroundSize: "cover",
                                                                            backgroundPosition: "center"
                                                                          }
                                                                        : {
                                                                            backgroundSize: "80%",
                                                                            backgroundPosition: "center",
                                                                            backgroundRepeat: "no-repeat"
                                                                          }
                                                                    )
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
                                        <li className={`${styles.g_tabs_item} ${
                                            activeTab === "upload" ? styles.active : ""
                                        }`}>
                                            <div onClick={() => setActiveTab("upload")} className={styles.tab_header} style={{cursor: "pointer"}}>
                                                Upload
                                            </div>
                                        </li>
                                        {/*<li className={styles.g_tabs_item}>*/}
                                        {/*    <div onClick={() => setActiveTab("playlist")} className={styles.tab_header} style={{cursor: "pointer"}}>*/}
                                        {/*        Playlist*/}
                                        {/*    </div>*/}
                                        {/*</li>*/}
                                        <li className={`${styles.g_tabs_item} ${
                                            activeTab === "favorite" ? styles.active : ""
                                        }`}>
                                            <div onClick={() => setActiveTab("favorite")} className={styles.tab_header} style={{cursor: "pointer"}}>
                                                Favorite
                                            </div>
                                        </li>
                                        <li className={`${styles.g_tabs_item} ${
                                            activeTab === "review" ? styles.active : ""
                                        }`}>
                                            <div onClick={() => setActiveTab("review")} className={styles.tab_header} style={{cursor: "pointer"}}>
                                                Review
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className={styles.user_info_bar_buttons}>
                                    <div className={styles.sc_button_group}>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.fluid_fixed}>
                            <div className={styles.main}>
                                <div className={styles.heading}>
                                    <div>
                                        <div></div>
                                    </div>
                                </div>
                                <div className={styles.tab}></div>
                                <div className={styles.content}>
                                    <div>
                                        <div></div>
                                        <div></div>
                                        <div>
                                            <ul className={styles.loading_list}>
                                                <li className={styles.mix_item}>
                                                    <div>
                                                        <div className={styles.mixed_module}>
                                                            <div className={styles.mixed_module_title}>
                                                            </div>
                                                            <div className={styles.mixed_music_container}>
                                                                {/*{playlistShowPrev && (*/}
                                                                {/*    <button*/}
                                                                {/*        className={styles.prev_button}*/}
                                                                {/*        onClick={() => slide("prev", playlistSliderRef, updatePlaylistButtonVisibility)}*/}
                                                                {/*    >*/}
                                                                {/*        &#9664;*/}
                                                                {/*    </button>*/}
                                                                {/*)}*/}
                                                                <div className={styles.slider}>
                                                                    <div className={styles.slider_peek_container}>
                                                                        <div className={styles.slider_panel}>
                                                                            {/*요소*/}
                                                                            <div className={styles.tab_render}>{renderContent()}</div>
                                                                            {/*요소*/}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/*{playlistShowNext && (*/}
                                                                {/*    <button*/}
                                                                {/*        className={styles.next_button}*/}
                                                                {/*        onClick={() => slide("next", playlistSliderRef, updatePlaylistButtonVisibility)}*/}
                                                                {/*    >*/}
                                                                {/*        &#9654;*/}
                                                                {/*    </button>*/}
                                                                {/*)}*/}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <SideBar/>
                            </div>
                        </div>
                        {/* 모달 컴포넌트 */}
                        {isModalVisible && <Modal closeModal={closeModal} userInfo={userInfo}/>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;