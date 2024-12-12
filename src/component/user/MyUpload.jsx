import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "../../css/user/MyUpload.module.css";
import {Link} from "react-router-dom";
import { usePlaylist } from '../PlaylistContext';

const MyUpload = ({setSelectedTrack, id}) => {
    const [myUploadList, setMyUploadList] = useState([]);
    const { selectedTrack } = usePlaylist();

    useEffect(() => {
        axios.get(`http://localhost:8787/user/myUpload/${id}`, {
            withCredentials: true,
        })
            .then((response) => {
                setMyUploadList(response.data);
            })
            .catch((error) => {
                console.error("Failed to fetch my upload list:", error);
            });
    }, [id]);

    const handleTrackClick = (track) => {
        setSelectedTrack(track); // 선택된 노래 설정
    };

    const handleDelete = async (track) => {
        try {
            const response = await axios.post(
                `http://localhost:8787/music/delete?musicCode=${track.musicCode}`,
                null,
                { headers: { "Content-Type": "application/json" }}
            );
            
            if (selectedTrack?.musicCode === track.musicCode) {
                setSelectedTrack(null);
            }
            
            setMyUploadList(myUploadList.filter(item => item.musicCode !== track.musicCode));
            
            console.log("삭제 성공", response.data);
            alert("음악이 삭제되었습니다");
        } catch (error) {
            console.error("삭제 실패:", error);
            alert("삭제에 실패했습니다");
        }
    }

    return (
        <div style={{display: "flex"}}>
            {myUploadList.map((track) => (
                <div className={styles.slider_panel_slide} key={track.musicCode}>
                    <div className={styles.playable_tile}>
                        <div className={styles.playable_artwork}>
                            <div className={styles.playable_artwork_link}
                                 onClick={() => handleTrackClick(track)}>
                                <div className={styles.playable_artwork_image}>
                                    <div className={styles.image_outline}>
                                        <div
                                            className={styles.artwork}
                                            style={{
                                                backgroundImage: `url(http://localhost:8787/${track.imgPath})`
                                            }}
                                        >
                                            <button className={styles.overlay_button} onClick={() => handleDelete(track)}></button>
                                        </div>
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
                                <Link to={`/music/${track.musicCode}`} className={styles.playable_audible_tile}>{track.title}</Link>
                            </div>
                            <div className={styles.playable_tile_username_container}>
                                <Link to={`/profile/${String(track.id)}`} className={styles.playable_tile_username}>{track.artist}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MyUpload;