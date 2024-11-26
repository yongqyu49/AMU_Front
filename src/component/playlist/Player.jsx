import React, { useEffect, useState } from "react";
import styles from "../../css/playlist/Player.module.css";
import axios from "axios";

const Player = ({ selectedTrack, trackList }) => {
    const [activeTab, setActiveTab] = useState("nextTracks"); // 초기 탭은 다음 트랙
    const [reviews, setReviews] = useState([]);

    const writeReview = (event) => {
        event.preventDefault();
        const reviewContents = event.target.querySelector("textarea").value;

        if (!reviewContents.trim()) {
            alert("리뷰 내용을 입력해주세요.");
            return;
        }

        // 서버에 맞는 데이터 구조로 설정
        const reviewDTO = {
            reviewContents: reviewContents, // 리뷰 내용
            musicCode: selectedTrack.musicCode, // 음악 코드
        };

        axios
            .post(`http://localhost:8787/music/review/upload`, reviewDTO, {
                withCredentials: true, // 세션 유지
            })
            .then((response) => {
                event.target.querySelector("textarea").value = ""; // 입력 창 초기화
                alert(response.data); // 서버에서 전달된 성공 메시지 표시
                fetchReviews(); // 리뷰 새로고침
            })
            .catch((error) => {
                // 서버의 에러 메시지를 alert로 표시
                if (error.response && error.response.data) {
                    alert(error.response.data);
                } else {
                    alert("리뷰 작성 중 오류가 발생했습니다.");
                }
            });
    };

    // 리뷰 데이터 가져오기
    const fetchReviews = () => {
        if (selectedTrack) {
            axios
                .get(`http://localhost:8787/music/review/${selectedTrack.musicCode}`, {
                    withCredentials: true,
                })
                .then((response) => {
                    console.log("review: ", response.data);
                    setReviews(response.data);
                })
                .catch((error) => {
                    console.error("Failed to fetch reviews:", error);
                });
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [selectedTrack]);

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
                        <ul className={styles.review_list}>
                            {reviews && reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <li key={review.reviewId} className={styles.review_item}>
                                        <div className={styles.review_header}>
                                            <span className={styles.review_author}>{review.id}</span>
                                            <span className={styles.review_date}>
                                                {new Date(review.reviewRegDate).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className={styles.review_content}>
                                            {review.reviewContents}
                                        </div>
                                        <div className={styles.review_footer}>
                                            <span>좋아요: {review.reviewLike}</span>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p>리뷰가 없습니다.</p>
                            )}
                        </ul>
                        <form onSubmit={writeReview} className={styles.review_form}>
                            <textarea
                                className={styles.review_textarea}
                                placeholder="리뷰를 작성하세요..."
                            />
                            <button type="submit">작성</button>
                        </form>
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
                    src={selectedTrack ? `http://localhost:8787/${selectedTrack.imgPath}` : ""}
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
