import styles from "../css/SideBar.module.css";
import {Link} from "react-router-dom";

const SideBar = () => {
    return (
        <div className={styles.sidebar_right}>
            <div className={styles.listenNetworkSidebar}>
                <article className={styles.sidebarModule}>
                    <Link to={""} className={styles.sidebarHeader}>
                        <h4 className={styles.sidebarHeader_title}>
                            Related tracks
                        </h4>
                    </Link>
                    <div className={styles.sidebarContent}>
                        <div className={styles.soundBadgeList}>
                            <ul className={styles.sc_list_nostyle}>
                                <li className={styles.soundBadgeList_item}>
                                    <div className={styles.soundBadge}>
                                        <span className={styles.soundBadge_artwork}>
                                            <div className={styles.image_light_outline}>
                                                <span className={styles.sc_artwork5}></span>
                                            </div>
                                        </span>
                                        <div className={styles.sc_media_content}>
                                            <div className={styles.soundTitle}>
                                                <div className={styles.soundTitle_titleContainer}>
                                                    <div
                                                        className={styles.soundTitle_usernameTitleContainer}>
                                                        <div className={styles.sc_type_light}>
                                                            <span>TATTOO</span>
                                                        </div>
                                                        <Link to={""} className={styles.sc_link_primary}>OFFICIAL HIGE DANDISM</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className={styles.soundBadgeList_item}>
                                    <div className={styles.soundBadge}>
                                        <span className={styles.soundBadge_artwork}>
                                            <div className={styles.image_light_outline}>
                                                <span className={styles.sc_artwork4}></span>
                                            </div>
                                        </span>
                                        <div className={styles.sc_media_content}>
                                            <div className={styles.soundTitle}>
                                                <div className={styles.soundTitle_titleContainer}>
                                                    <div className={styles.soundTitle_usernameTitleContainer}>
                                                        <div className={styles.sc_type_light}>
                                                            <span>Sugar</span>
                                                        </div>
                                                        <Link to={""} className={styles.sc_link_primary}>Maroon 5 • V (Aisa Tour Edition)</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className={styles.soundBadgeList_item}>
                                    <div className={styles.soundBadge}>
                                        <span className={styles.soundBadge_artwork}>
                                            <div className={styles.image_light_outline}>
                                                <span className={styles.sc_artwork3}></span>
                                            </div>
                                        </span>
                                        <div className={styles.sc_media_content}>
                                            <div className={styles.soundTitle}>
                                                <div className={styles.soundTitle_titleContainer}>
                                                    <div
                                                        className={styles.soundTitle_usernameTitleContainer}>
                                                        <div className={styles.sc_type_light}>
                                                            <span>Too Sweet</span>
                                                        </div>
                                                        <Link to={""}
                                                              className={styles.sc_link_primary}>Hozier</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>
                <article className={styles.sidebarModule}>
                    <Link to={""} className={styles.sidebarHeader}>
                        <h4 className={styles.sidebarHeader_title}>
                            Related tracks
                        </h4>
                    </Link>
                    <div className={styles.sidebarContent}>
                        <div className={styles.soundBadgeList}>
                            <ul className={styles.sc_list_nostyle}>
                                <li className={styles.soundBadgeList_item}>
                                    <div className={styles.soundBadge}>
                                        <span className={styles.soundBadge_artwork}>
                                            <div className={styles.image_light_outline}>
                                                <span className={styles.sc_artwork2}></span>
                                            </div>
                                        </span>
                                        <div className={styles.sc_media_content}>
                                            <div className={styles.soundTitle}>
                                                <div className={styles.soundTitle_titleContainer}>
                                                    <div className={styles.soundTitle_usernameTitleContainer}>
                                                        <div className={styles.sc_type_light}>
                                                            <span>2002</span>
                                                        </div>
                                                        <Link to={""} className={styles.sc_link_primary}>Anne-Marie • 2002</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className={styles.soundBadgeList_item}>
                                    <div className={styles.soundBadge}>
                                        <span className={styles.soundBadge_artwork}>
                                            <div className={styles.image_light_outline}>
                                                <span className={styles.sc_artwork1}></span>
                                            </div>
                                        </span>
                                        <div className={styles.sc_media_content}>
                                            <div className={styles.soundTitle}>
                                                <div className={styles.soundTitle_titleContainer}>
                                                    <div className={styles.soundTitle_usernameTitleContainer}>
                                                        <div className={styles.sc_type_light}>
                                                            <span>Circles</span>
                                                        </div>
                                                        <Link to={""} className={styles.sc_link_primary}>Post Malone • Hollywood's Bleeding</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className={styles.soundBadgeList_item}>
                                    <div className={styles.soundBadge}>
                                        <span className={styles.soundBadge_artwork}>
                                            <div className={styles.image_light_outline}>
                                                <span className={styles.sc_artwork}></span>
                                            </div>
                                        </span>
                                        <div className={styles.sc_media_content}>
                                            <div className={styles.soundTitle}>
                                                <div className={styles.soundTitle_titleContainer}>
                                                    <div className={styles.soundTitle_usernameTitleContainer}>
                                                        <div className={styles.sc_type_light}>
                                                        <span>アイデア</span>
                                                        </div>
                                                        <Link to={""} className={styles.sc_link_primary}>Gen Hoshino</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    )
}

export default SideBar