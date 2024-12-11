import styles from "../../css/music/MyDetail.module.css";
import {Link, useParams} from "react-router-dom";
import SideBar from "../SideBar";
import {useEffect, useState} from "react";
import axios from "axios";

const MusicDetail = () => {
    const { musicCode } = useParams(); // URL에서 musicCode 가져오기
    const [musicDetail, setMusicDetail] = useState(null); // 음악 정보를 저장할 상태
    const [comments, setComments] = useState([]); // 댓글 데이터를 저장할 상태
    console.log(musicCode)

    // 데이터 가져오기
    useEffect(() => {
        const fetchMusicDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8787/music/${musicCode}`, {
                    withCredentials: true, // 인증이 필요한 경우
                });
                setMusicDetail(response.data);
                console.log("musicDetail: " + musicDetail)
            } catch (error) {
                console.error("음악 정보를 가져오는 중 오류 발생:", error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:8787/music/${musicCode}/comments`, {
                    withCredentials: true, // 인증이 필요한 경우
                });
                setComments(response.data);
            } catch (error) {
                console.error("댓글 정보를 가져오는 중 오류 발생:", error);
            }
        };

        fetchMusicDetail();
        fetchComments();
    }, [musicCode]); // musicCode가 변경될 때마다 호출

    if (!musicDetail) {
        return <div>Loading...</div>; // 데이터가 로드되기 전 로딩 표시
    }

    if (!comments) {
        return <div>Loading...</div>; // 데이터가 로드되기 전 로딩 표시
    }

    return (
        <div className={styles.content}>
            <div>
                <div className={styles.listen_hero}>
                    <div className={styles.full_listen_hero}>
                        <div style={{height: "100%"}}>
                            <div className={styles.background_gradient}>
                                <div className={styles.background_gradient_hidden}></div>
                                <div className={styles.background_gradient_buffer}></div>
                                <div style={{display: "none"}}></div>
                            </div>
                        </div>
                        <div className={styles.full_hero_foreground}>
                            <div className={styles.full_hero_artwork}>
                                <span className={styles.full_hero_tierIndicator}></span>
                                <div className={styles.listen_artwork_wrapper}>
                                    <div className={styles.listen_artwork_wrapper_artwork}>
                                        <div className={styles.image_light_outline}>
                                            <span className={styles.sc_artwork}></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.full_hero_title}>
                                <div className={styles.soundTitle_sc_clearfix}>
                                    <div className={styles.soundTitle_titleContainer}>
                                        <div className={styles.soundTitle_playButton}>
                                            <button type={"button"} className={styles.sc_button_play}>Play</button>
                                        </div>
                                        <div className={styles.soundTitle_usernameTitleContainer}>
                                            <div className={styles.soundTitle_titleHeroContainer}>
                                                <h1 className={styles.soundTitle_title}>Too Sweet - 셔누 Shownu</h1>
                                            </div>
                                            <div className={styles.soundTitle_usernameHeroContainer}>
                                                <h2 className={styles.soundTitle_username}>셔누</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.full_hero_info}></div>
                            {/*<div className={styles.full_playerArea}></div>*/}
                        </div>
                    </div>
                </div>
                <div className={styles.listen_wrapper}>
                    <div className={styles.about_main}>
                        <div className={styles.about_rows}>
                            <div className={styles.about_row}>
                                <div className={styles.about_top}>
                                    <div className={styles.listenEngagement}>
                                        <div className={styles.listenEngagement_commentForm}>
                                            <div className={styles.commentForm}>
                                                <div className={styles.commentForm_wrapper}>
                                                    <div className={styles.commentForm_avatar}>
                                                        <span className={styles.sc_artwork_placeholder}></span>
                                                    </div>
                                                    <div className={styles.commentForm_inputWrapper}>
                                                        <input type={"text"} name={"comment"} className={styles.commentForm_input} />
                                                        <button type={"submit"} className={styles.commentForm_submit_button}/>
                                                    </div>
                                                </div>
                                                <div className={styles.commentForm_inputMessage}>
                                                    Comment must not exceed 1000 characters
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.listen_mainContent}>
                                <div className={styles.about_left}>
                                    <div>
                                        <div className={styles.userBadge}>
                                            <div className={styles.userBadge_avatar}>
                                                <div className={styles.g_avatar_badge}>
                                                    <div className={styles.g_avatar_badge_body}>
                                                        <Link to={""} className={styles.g_avatar_link}>
                                                            <div className={styles.g_avatar_badge_avatar}>
                                                                <div className={styles.sc_avatar_outline}>
                                                                    <span className={styles.sc_avatar_artists}></span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className={styles.userBadge_content}>
                                                    <div className={styles.userBadge_title}>
                                                        <h3 className={styles.userBadge_username}>
                                                            <Link to={""} className={styles.userBadge_username_username_link}>
                                                                셔누
                                                            </Link>
                                                        </h3>
                                                    </div>
                                                    <div className={styles.userBadge_meta}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.about_right}>
                                    <div className={styles.listenDetails}>
                                        <div></div>
                                        <div className={styles.commentsList}>
                                            <div className={styles.sc_clearfix}>
                                                <div className={styles.commentsList_header}>
                                                    <h3 className={styles.commentsList_title}>
                                                        <span className={styles.sc_classic}></span>
                                                        <span>4 comments</span>
                                                    </h3>
                                                    <div className={styles.commentsList_sortSelect}>
                                                        <div>
                                                            <div className={styles.select_wrapper}>
                                                                <button type={"button"} className={styles.sc_button_secondary}></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className={styles.lazyLoading_list}>
                                                <li className={styles.commentsList_item}>
                                                    <div className={styles.commentItem}>
                                                        <div className={styles.commentItem_read}>
                                                            <div className={styles.commentItem_avatarWrapper}>
                                                                <Link to={""} className={styles.commentItem_avatar}>
                                                                    <div
                                                                        className={styles.sc_artwork_placeholder}></div>
                                                                </Link>
                                                            </div>
                                                            <div className={styles.commentItem_content}>
                                                                <div className={styles.commentItem_commentInfo}>
                                                                    <span>
                                                                        <span>
                                                                            <Link to={"/profile"}
                                                                                  className={styles.commentItem_username}>QQ</Link>
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                                <div className={styles.commentItem_commentWrapper}>
                                                                    <div className={styles.commentItem_bodyContainer}>
                                                                        <div className={styles.commentItem_body}>
                                                                            <span>
                                                                                <p>ㄴ어리ㅏㅓㄴ리ㅏㅓ니ㅏ런이러ㅣㅓㅣ</p>
                                                                            </span>
                                                                        </div>
                                                                        {/*<div className={styles.commentItem_controls}>*/}
                                                                        {/*    <Link to={""} className={styles.commentItem_replyButton}>Reply</Link>*/}
                                                                        {/*</div>*/}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className={styles.commentsList_item}>
                                                    <div className={styles.commentItem}>
                                                        <div className={styles.commentItem_read}>
                                                            <div className={styles.commentItem_avatarWrapper}>
                                                                <Link to={""} className={styles.commentItem_avatar}>
                                                                    <div
                                                                        className={styles.sc_artwork_placeholder}></div>
                                                                </Link>
                                                            </div>
                                                            <div className={styles.commentItem_content}>
                                                                <div className={styles.commentItem_commentInfo}>
                                                                    <span>
                                                                        <span>
                                                                            <Link to={"/profile"}
                                                                                  className={styles.commentItem_username}>QQ</Link>
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                                <div className={styles.commentItem_commentWrapper}>
                                                                    <div className={styles.commentItem_bodyContainer}>
                                                                        <div className={styles.commentItem_body}>
                                                                            <span>
                                                                                <p>ㄴ어리ㅏㅓㄴ리ㅏㅓ니ㅏ런이러ㅣㅓㅣ</p>
                                                                            </span>
                                                                        </div>
                                                                        {/*<div className={styles.commentItem_controls}>*/}
                                                                        {/*    <Link to={""} className={styles.commentItem_replyButton}>Reply</Link>*/}
                                                                        {/*</div>*/}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className={styles.commentsList_item}>
                                                    <div className={styles.commentItem}>
                                                        <div className={styles.commentItem_read}>
                                                            <div className={styles.commentItem_avatarWrapper}>
                                                                <Link to={""} className={styles.commentItem_avatar}>
                                                                    <div
                                                                        className={styles.sc_artwork_placeholder}></div>
                                                                </Link>
                                                            </div>
                                                            <div className={styles.commentItem_content}>
                                                                <div className={styles.commentItem_commentInfo}>
                                                                    <span>
                                                                        <span>
                                                                            <Link to={"/profile"}
                                                                                  className={styles.commentItem_username}>QQ</Link>
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                                <div className={styles.commentItem_commentWrapper}>
                                                                    <div className={styles.commentItem_bodyContainer}>
                                                                        <div className={styles.commentItem_body}>
                                                                            <span>
                                                                                <p>ㄴ어리ㅏㅓㄴ리ㅏㅓ니ㅏ런이러ㅣㅓㅣ</p>
                                                                            </span>
                                                                        </div>
                                                                        {/*<div className={styles.commentItem_controls}>*/}
                                                                        {/*    <Link to={""} className={styles.commentItem_replyButton}>Reply</Link>*/}
                                                                        {/*</div>*/}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className={styles.paging}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SideBar/>
                </div>
            </div>
        </div>
    );
};

export default MusicDetail;