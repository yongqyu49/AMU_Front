import React, {useEffect, useState} from "react";
import styles from "../../css/playlist/Player.module.css";
import TrackList from "./TrackList";
import Lyrics from "./Lyrics";
import Reviews from "./Reviews";
import {usePlaylist} from "../PlaylistContext";

const Player = ({ selectedTrack }) => {
    const [activeTab, setActiveTab] = useState("nextTracks");
    const { trackList } = usePlaylist();

    useEffect(() => {
        console.log("Current trackList in Player:", trackList);
    }, [trackList]);

    // Tab rendering function
    const renderContent = () => {
        switch (activeTab) {
            case "nextTracks":
                return <TrackList trackList={trackList} />;
            case "lyrics":
                return <Lyrics selectedTrack={selectedTrack} />;
            case "reviews":
                return <Reviews selectedTrack={selectedTrack} />;
            default:
                return <p>알 수 없는 탭입니다.</p>;
        }
    };

    return (
        <div className={styles.player_container}>
            <div className={styles.main_panel}>
                <img
                    src={selectedTrack ? `http://localhost:8787/${selectedTrack.imgPath}` : ""}
                    alt="album cover"
                    className={styles.album_cover}
                />
            </div>
            <div className={styles.side_panel}>
                <div className={styles.tabs_container}>
                    <div onClick={() => setActiveTab("nextTracks")} className={styles.tab_header}>
                        다음 트랙
                    </div>
                    <div onClick={() => setActiveTab("lyrics")} className={styles.tab_header}>
                        가사
                    </div>
                    <div onClick={() => setActiveTab("reviews")} className={styles.tab_header}>
                        리뷰
                    </div>
                </div>
                <div className={styles.tab_render}>{renderContent()}</div>
            </div>
        </div>
    );
};

export default Player;
