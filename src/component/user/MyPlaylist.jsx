import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "../../css/user/MyUpload.module.css";
import {Link} from "react-router-dom";

const MyPlaylist = ({setSelectedTrack}) => {
    const [myPlaylistList, setMyPlaylistList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8787/user/myPlaylist", {
            withCredentials: true,
        })
            .then((response) => {
                setMyPlaylistList(response.data);
            })
            .catch((error) => {
                console.error("Failed to fetch my upload list:", error);
            });
    }, []);

    const handleTrackClick = (track) => {
        setSelectedTrack(track); // 선택된 노래 설정
    };

    return (
        <div style={{display: "flex"}}>
            {myPlaylistList.map((playlist) => (
                <div className={styles.slider_panel_slide} key={playlist.musicCode}>
                    <div className={styles.playable_tile}>
                        <div className={styles.playable_artwork}>
                            <div className={styles.playable_artwork_link}
                                 onClick={() => handleTrackClick(playlist)}>
                                <div className={styles.playable_artwork_image}>
                                    <div className={styles.image_outline}>
                                        <span className={styles.artwork}
                                              style={{
                                                  backgroundImage: `url(http://localhost:8787/${playlist.imgPath})`
                                              }}>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.playable_tile_overlay}></div>
                            <div className={styles.playable_tile_play_button}>
                                <Link to="/music" className={styles.play_button}>Play</Link>
                            </div>
                            <div className={styles.playable_tile_action}>

                            </div>
                        </div>
                        <div className={styles.playable_tile_description}>
                            <div className={styles.playable_tile_description_container}>
                                <Link to="/music" className={styles.playable_audible_tile}>{playlist.title}</Link>
                            </div>
                            <div className={styles.playable_tile_username_container}>
                                <Link to="/music" className={styles.playable_tile_username}>{playlist.artist}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MyPlaylist;