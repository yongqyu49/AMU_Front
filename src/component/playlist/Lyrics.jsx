import React from "react";
import styles from "../../css/playlist/Player.module.css";

const Lyrics = ({ selectedTrack }) => {
    if (!selectedTrack) return <p>트랙 정보가 없습니다.</p>;

    return (
        <p className={styles.lyrics}>
            {selectedTrack.lyrics || "가사가 없습니다."}
        </p>
    );
};

export default Lyrics;
