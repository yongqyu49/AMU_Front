import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "../../css/user/MyUpload.module.css";
import {Link} from "react-router-dom";

const MyUpload = ({setSelectedTrack}) => {
    const [myFavoriteList, setMyFavoriteList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8787/user/myFavorite", {
            withCredentials: true,
        })
            .then((response) => {
                setMyFavoriteList(response.data);
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
            {myFavoriteList.map((track) => (
                <div className={styles.slider_panel_slide} key={track.musicCode}>
                    <div className={styles.playable_tile}>
                        <div className={styles.playable_artwork}>
                            <div className={styles.playable_artwork_link}
                                 onClick={() => handleTrackClick(track)}>
                                <div className={styles.playable_artwork_image}>
                                    <div className={styles.image_outline}>
                                        <span className={styles.artwork}
                                              style={{
                                                  backgroundImage: `url(http://localhost:8787/${track.imgPath})`
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
                                <Link to="/music" className={styles.playable_audible_tile}>{track.title}</Link>
                            </div>
                            <div className={styles.playable_tile_username_container}>
                                <Link to="/music" className={styles.playable_tile_username}>{track.artist}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MyUpload;