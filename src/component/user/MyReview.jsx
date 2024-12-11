import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "../../css/user/MyUpload.module.css";
import {Link} from "react-router-dom";

const MyReview = ({setSelectedTrack, id}) => {
    const [myReviewList, setMyReviewList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8787/user/myReview/${id}`, {
            withCredentials: true,
        })
            .then((response) => {
                setMyReviewList(response.data);
            })
            .catch((error) => {
                console.error("Failed to fetch my upload list:", error);
            });
    }, [id]);

    const handleTrackClick = (track) => {
        setSelectedTrack(track); // 선택된 노래 설정
    };

    return (
        <div style={{display: "flex"}}>
            {myReviewList.map((review) => (
                <div className={styles.slider_panel_slide} key={review.reviewId}>
                    <div className={styles.playable_tile}>
                        <div className={styles.playable_artwork}>
                            <div className={styles.playable_artwork_link}
                                 onClick={() => handleTrackClick(review)}>
                                <div className={styles.playable_artwork_image}>
                                    <div className={styles.image_outline}>
                                        <span className={styles.artwork}
                                              style={{
                                                  backgroundImage: `url(http://localhost:8787/${review.imgPath})`
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
                                <Link to="/music" className={styles.playable_audible_tile}>{review.reviewContents}</Link>
                            </div>
                            <div className={styles.playable_tile_username_container}>
                                <Link to="/music" className={styles.playable_tile_username}>{review.reviewContents}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MyReview;