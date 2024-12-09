import React, { useState, useEffect } from "react";
import styles from "../../css/playlist/Player.module.css";
import TrackList from "./TrackList";
import Lyrics from "./Lyrics";
import Reviews from "./Reviews";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const Player = ({ selectedTrack }) => {
    const [activeTab, setActiveTab] = useState("nextTracks");
    const [trackList, setTrackList] = useState([]);
    const isLoggedIn = useAuth();

    // Fetch playlist on login
    useEffect(() => {
        if (isLoggedIn) {
            axios.get("http://localhost:8787/music/getPlaylist", { withCredentials: true })
                .then(response => {
                    setTrackList(response.data)
                    console.log("Playlist fetched successfully:", response.data);
                })
                .catch(error => console.error("Failed to fetch playlist:", error));
        }
    }, [isLoggedIn]);

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
