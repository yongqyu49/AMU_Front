import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "../../css/user/MyReview.module.css";
import {Link} from "react-router-dom";

const MyReview = ({id}) => {
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

    return (
        <ul className={styles.lazyLoading_list}>
            {myReviewList.map((comment) => (
                <li className={styles.commentsList_item} key={comment.reviewId}>
                    <div className={styles.commentItem}>
                        <div className={styles.commentItem_read}>
                            <div className={styles.commentItem_avatarWrapper}>
                                <Link to={""} className={styles.commentItem_avatar}>
                                    <div className={styles.sc_artwork_placeholder}
                                         style={{
                                             backgroundImage: `url(http://localhost:8787/${comment?.imgPath})`
                                         }}
                                    ></div>
                                </Link>

                            </div>
                            <div className={styles.commentItem_content}>
                                <div className={styles.commentItem_commentInfo}>
                                    <span>
                                        <span>
                                              <Link to={`/music/${(comment.musicCode)}`}
                                                    className={styles.commentItem_username}>{comment.title}</Link>
                                        </span>
                                    </span>
                                </div>
                                <div className={styles.commentItem_commentWrapper}>
                                    <div className={styles.commentItem_bodyContainer}>
                                        <div className={styles.commentItem_body}>
                                            <Link to={`/profile/${String(comment.id)}`}
                                                style={{
                                                    color: "#333",
                                                    fontSize: "13px",
                                                    marginRight: "5px"
                                                }}
                                            >
                                                {comment.artist}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span style={{
                                    color: "black",
                                    fontSize: "13px",
                                    fontWeight: "bold",
                                    marginRight: "5px"
                                }}>
                                    {/*{comment.id}*/}
                                </span>
                            </div>
                            <div>
                                <span>{comment.reviewContents}</span>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default MyReview;