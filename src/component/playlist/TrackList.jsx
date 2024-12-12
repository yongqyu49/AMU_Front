import React, { useMemo, useState } from "react";
import styles from "../../css/playlist/TrackList.module.css";
import { usePlaylist } from "../PlaylistContext";
import { Link } from "react-router-dom";
import axios from "axios";

const TrackList = () => {
    const { trackList, setTrackList, setSelectedTrack, addTrack, removeTrack, selectedTrack } = usePlaylist();
    const id = localStorage.getItem("id");
    const [hoveredTrack, setHoveredTrack] = useState(null); // Hover 상태 관리
    const [draggingIndex, setDraggingIndex] = useState(null); // 드래그 중인 요소의 인덱스

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

    const handleDelete = (track) => {
        removeTrack(track);
    };

    const handleLike = (track) => {
        console.log("좋아요 클릭:", track);
        // 좋아요 로직 추가
    };

    const handleAdd = (track) => {
        console.log("추가 클릭:", track);
        // 추가 로직 추가
    };

    const handleDragStart = (index, event) => {
        event.dataTransfer.setData("text/plain", index); // 드래그 데이터 설정
        event.dataTransfer.effectAllowed = "move"; // 드래그 효과 설정
        setDraggingIndex(index);
    };

    const handleDragOver = (index, event) => {
        event.preventDefault(); // 드래그 중 기본 동작 방지
    };

    const handleDrop = (index, event) => {
        event.preventDefault(); // 기본 동작 방지

        const draggedIndex = parseInt(event.dataTransfer.getData("text/plain"), 10);

        if (draggedIndex === index || draggedIndex === null) return;

        const updatedTrackList = [...trackList];
        const [draggedItem] = updatedTrackList.splice(draggedIndex, 1); // 드래그한 아이템 제거
        updatedTrackList.splice(index, 0, draggedItem); // 드롭 위치에 삽입

        setTrackList(updatedTrackList); // 상태 업데이트
        setDraggingIndex(null); // 드래그 상태 초기화
    };

    const renderedTrackList = useMemo(() => {
        return trackList.map((track, index) => (
            <div
                key={track.musicCode}
                className={`${styles.track_item} ${draggingIndex === index ? styles.dragging : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(index, e)}
                onDragOver={(e) => handleDragOver(index, e)}
                onDrop={(e) => handleDrop(index, e)}
            >
                <div
                    className={styles.playlist_panel_render_wrapper}
                    onClick={() => handleTrackClick(track)}
                >
                    <div className={styles.player_queue_item}>
                        <div>
                            <img
                                src={track ? `http://localhost:8787/${track.imgPath}` : ""}
                                alt="album cover"
                                className={styles.album_cover}
                            />
                        </div>
                        <div className={styles.item_overlay}></div>
                    </div>
                    <div className={styles.song_info}>
                        <Link to={`/music/${track.musicCode}`} className={styles.song_title}>
                            {track.title}
                        </Link>
                        <div className={styles.byline_wrapper}>
                            <Link to={`/profile/${String(track.id)}`} className={styles.artist_wrapper}>
                                {track.artist}
                            </Link>
                        </div>
                    </div>
                    <div className={styles.style_scope}></div>
                    <div
                        className={styles.duration_wrapper}
                        onMouseEnter={() => setHoveredTrack(track)}
                        onMouseLeave={() => setHoveredTrack(null)}
                    >
                        {hoveredTrack === track ? (
                            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                                <button onClick={() => handleDelete(track)}>삭제</button>
                                {/*<button onClick={() => handleLike(track)}>좋아요</button>*/}
                                <button onClick={() => handleAdd(track)}>추가</button>
                            </div>
                        ) : (
                            <span className={styles.runtime}>
                                {track.runtime > 60
                                    ? (track.runtime / 60).toFixed(0).padStart(2, '0') + ':' +
                                    (track.runtime % 60).toFixed(0).padStart(2, '0')
                                    : '00:' + track.runtime.toFixed(0).padStart(2, '0')}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        ));
    }, [trackList, hoveredTrack, draggingIndex]);

    return <div>{renderedTrackList.length > 0 ? renderedTrackList : <p>다음 트랙이 없습니다.</p>}</div>;
};

export default TrackList;
