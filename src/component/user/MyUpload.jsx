import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import styles from "../../css/user/MyUpload.module.css";
import {Link} from "react-router-dom";
import { usePlaylist } from '../PlaylistContext';

const MyUpload = ({id}) => {
    const [myUploadList, setMyUploadList] = useState([]);
    const { setSelectedTrack, addTrack, trackList } = usePlaylist();
    const myUploadSliderRef = useRef(null);
    const [myUploadShowNext, setMyUploadShowNext] = useState(true);
    const [myUploadShowPrev, setMyUploadShowPrev] = useState(false);

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

    const handleTrackClick = async (track) => {
        if (!id) {
            console.warn("사용자 ID가 설정되지 않았습니다. 로컬스토리지에 트랙을 저장할 수 없습니다.");
            return; // ID가 없는 경우 실행 중단
        }

        setSelectedTrack(track); // 선택된 트랙 설정
        addTrack(track); // 트랙 추가

        let responseView;
        try {
            console.log("트랙 클릭");
            responseView = await axios.post(
                `http://localhost:8787/music/view?musicCode=${track.musicCode}`,
                null,
                { headers: { "Content-Type": "application/json" } }
            );
            console.log("조회수 추가 성공", responseView?.data);
        } catch (error) {
            console.log("조회수 추가 실패", responseView?.data);
        }
    };

    const handleDelete = async (track) => {
        try {
            const response = await axios.post(
                `http://localhost:8787/music/delete?musicCode=${track.musicCode}`,
                null,
                { headers: { "Content-Type": "application/json" }}
            );

            setMyUploadList(myUploadList.filter(item => item.musicCode !== track.musicCode));

            // 현재 재생 중인 곡 처리
            if (track.musicCode === trackList.find((t) => t.musicCode === track.musicCode)?.musicCode) {
                const nextIndex = trackList.findIndex((t) => t.musicCode === track.musicCode) + 1;
                const nextTrack = trackList[nextIndex] || null;
                setSelectedTrack(nextTrack);
            }

            console.log("삭제 성공", response.data);
            alert("음악이 삭제되었습니다");
        } catch (error) {
            console.error("삭제 실패:", error);
            alert("삭제에 실패했습니다");
        }
    };


    const updateMyUploadButtonVisibility = () => {
        const slider = myUploadSliderRef.current;
        if (!slider) return;

        const { scrollLeft, scrollWidth, offsetWidth } = slider;

        setMyUploadShowPrev(scrollLeft > 0);
        setMyUploadShowNext(scrollLeft + offsetWidth < scrollWidth);
    };

    useEffect(() => {
        updateMyUploadButtonVisibility();
    }, [myUploadList]);

    const slide = (direction, sliderRef, updateVisibility) => {
        const slider = sliderRef.current;

        if (!slider) return;

        const slideAmount = slider.offsetWidth / 2;

        if (direction === "next") {
            slider.scrollBy({ left: slideAmount, behavior: "smooth" });
        } else if (direction === "prev") {
            slider.scrollBy({ left: -slideAmount, behavior: "smooth" });
        }
        setTimeout(updateVisibility, 300); // 애니메이션 완료 후 상태 업데이트
    };

    return (
        <div className={styles.container} style={{display: "flex", flexWrap: "wrap"}}>
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