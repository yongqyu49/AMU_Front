import styles from "../../css/playlist/Player.module.css";

const Player = () => {
    return (
        <div className={styles.player_container}>
            <div className={styles.main_panel}>
                <img
                    src="/img/hanni.jpeg"
                    alt="album cover"
                    className={styles.album_cover}
                />
            </div>
            <div className={styles.side_panel}>
                <div className={styles.tabs_container}>
                    <div className={styles.tab_header}>
                        <div className={styles.tab_content}>다음 트랙</div>
                    </div>
                    <div className={styles.tab_header}>
                        <div className={styles.tab_content}>가사</div>
                    </div>
                    <div className={styles.tab_header}>
                        <div className={styles.tab_content}>리뷰</div>
                    </div>
                </div>
                <div className={styles.tab_render}>
                    <div className={styles.contents}>
                        <div className={styles.section_list_render}>
                            <span className={styles.lyrics}>
                                {"날 사랑해서 떠난다며 눈물짓던 그대의 말을 믿을 수 없죠\n하지만 나의 전 던 약속들을 지금 또 영원히 기억하겠어요다시 한 번 생각해요\n무엇이 낭 위 돼요 세상의 모든 걸 잃어도 괜찮아용\n그대만 있다면 드개만 있다면 영원히 내곁에 있어야 해용\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ\n\n\n\n\n\n\n\n\n\nㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ\n\n\n\n\n\n\n\n\n\nㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ\n\n\n\n\n\n\n\n\n\nㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;
