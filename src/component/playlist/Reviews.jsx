import React, { useState, useEffect } from "react";
import styles from "../../css/playlist/Player.module.css";
import axios from "axios";

const Reviews = ({ selectedTrack }) => {
    const [reviews, setReviews] = useState([]);

    // Fetch reviews 함수 정의
    function fetchReviews() {
        if (selectedTrack) {
            axios.get(`http://localhost:8787/music/review/${selectedTrack.musicCode}`, {
                withCredentials: true,
            })
                .then(response => setReviews(response.data))
                .catch(error => console.error("Failed to fetch reviews:", error));
        }
    }

    // 리뷰 작성
    const writeReview = (event) => {
        event.preventDefault();
        const reviewContents = event.target.querySelector("input").value;

        if (!reviewContents.trim()) {
            alert("리뷰 내용을 입력해주세요.");
            return;
        }

        axios.post(`http://localhost:8787/music/review/upload`, {
            reviewContents,
            musicCode: selectedTrack.musicCode,
        }, { withCredentials: true })
            .then(() => {
                event.target.querySelector("input").value = ""; // 입력 창 초기화
                fetchReviews(); // 리뷰 새로고침
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    alert(error.response.data); // 서버에서 반환한 에러 메시지 표시
                }
            });
    };

    // 초기 리뷰 데이터 가져오기
    useEffect(() => {
        fetchReviews();
    }, [selectedTrack]);

    return (
        <div>
            <ul className={styles.review_list}>
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <li key={review.reviewId} className={styles.review_item}>
                            <div className={styles.review_header}>
                                <span className={styles.review_author}>{review.id}</span>
                                <span className={styles.review_date}>
                                    {new Date(review.reviewRegDate).toLocaleString()}
                                </span>
                            </div>
                            <div className={styles.review_content}>{review.reviewContents}</div>
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
                <input type="text" placeholder="리뷰를 작성하세요..." />
                <button type="submit">작성</button>
            </form>
        </div>
    );
};

export default Reviews;
