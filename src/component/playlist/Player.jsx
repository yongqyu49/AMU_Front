import React, { useState } from "react";
import styles from "../../css/playlist/Player.module.css";

const Player = ({ selectedTrack, trackList, reviews }) => {
    const [activeTab, setActiveTab] = useState("nextTracks"); // 초기 탭은 다음 트랙

    // 탭 내용 렌더링 함수
    const renderContent = () => {
        if (!selectedTrack) return <p>트랙 정보가 없습니다.</p>;

        switch (activeTab) {
            case "nextTracks":
                return (
                    <div>
                        <ul>
                            {trackList && trackList.length > 0 ? (
                                trackList.map((track, index) => (
                                    <li key={index}>
                                        {track.title} - {track.artist}
                                    </li>
                                ))
                            ) : (
                                <p>다음 트랙이 없습니다.</p>
                            )}
                        </ul>
                    </div>
                );
            case "lyrics":
                return (
                    <div>
                        <p className={styles.lyrics}>
                            {selectedTrack.lyrics || "가사가 없습니다."}
                        </p>
                    </div>
                );
            case "reviews":
                return (
                    <div>
                        <ul>
                            {reviews && reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <li key={index}>{review}</li>
                                ))
                            ) : (
                                <p>리뷰가 없습니다.</p>
                            )}
                        </ul>
                    </div>
                );
            default:
                return <p>알 수 없는 탭입니다.</p>;
        }
    };

    return (
        <div className={styles.player_container}>
            {/* 앨범 커버 */}
            <div className={styles.main_panel}>
                <img
                    src={selectedTrack ? selectedTrack.imgPath : ""}
                    alt="album cover"
                    className={styles.album_cover}
                />
            </div>

            {/* 탭과 내용 */}
            <div className={styles.side_panel}>
                <div className={styles.tabs_container}>
                    <div
                        className={`${styles.tab_header} ${
                            activeTab === "nextTracks" ? styles.active : ""
                        }`}
                        onClick={() => setActiveTab("nextTracks")}
                    >
                        <div className={styles.tab_content}>다음 트랙</div>
                    </div>
                    <div
                        className={`${styles.tab_header} ${
                            activeTab === "lyrics" ? styles.active : ""
                        }`}
                        onClick={() => setActiveTab("lyrics")}
                    >
                        <div className={styles.tab_content}>가사</div>
                    </div>
                    <div
                        className={`${styles.tab_header} ${
                            activeTab === "reviews" ? styles.active : ""
                        }`}
                        onClick={() => setActiveTab("reviews")}
                    >
                        <div className={styles.tab_content}>리뷰</div>
                    </div>
                </div>

                {/* 선택된 탭 내용 */}
                <div className={styles.tab_render}>
                    <div className={styles.contents}>{renderContent()}</div>
                </div>
            </div>
        </div>
    );
};

export default Player;
