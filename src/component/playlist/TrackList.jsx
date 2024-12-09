import React from "react";
import styles from "../../css/playlist/TrackList.module.css";

const TrackList = ({ trackList }) => {
    return (
        <div>
            {trackList.length > 0 ? (
                trackList.map((track, index) => (
                    <div key={index}>
                        <div className={styles.playlist_panel_render_wrapper}>
                            <div className={styles.player_queue_item}>
                                <div>
                                    <img
                                        src={track ? `http://localhost:8787/${track.imgPath}` : ""}
                                        alt="album cover"
                                        className={styles.album_cover}
                                    />
                                </div>
                                <div className={styles.item_overlay}>

                                </div>

                            </div>
                            <div className={styles.song_info}>
                                <div className={styles.song_title}>{track.title}</div>
                                <div className={styles.byline_wrapper}>
                                    <div className={styles.artist_wrapper}>{track.artist}</div>
                                </div>
                            </div>
                            <div className={styles.style_scope}>

                            </div>
                            <div className={styles.duration_wrapper}>
                                <span className={styles.runtime}>{track.runtime}</span>
                            </div>

                        </div>

                    </div>
                ))
            ) : (
                <p>다음 트랙이 없습니다.</p>
            )}
        </div>
    );
};

export default TrackList;
