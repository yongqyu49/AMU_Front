import styles from '../../css/music/MainPage.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const MainPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.drop_down}>
                <div className={`${styles.drop1} d-flex`}> {/* 장르 */}
                    <DropdownButton
                    id="dropdown-basic-button"
                    title="장르"
                    size="sm"
                    variant="light">
                        <Dropdown.Item>genre1</Dropdown.Item>
                        <Dropdown.Item>genre2</Dropdown.Item>
                        <Dropdown.Item>genre3</Dropdown.Item>
                    </DropdownButton>
                </div>
                <div className={styles.drop2}> {/* 노래 정렬 */}
                    <DropdownButton
                    id="dropdown-basic-button"
                    title="이름순"
                    size="sm"
                    variant="light">
                        <Dropdown.Item>이름순</Dropdown.Item>
                        <Dropdown.Item>최신순</Dropdown.Item>
                        <Dropdown.Item>인기순</Dropdown.Item>
                        <Dropdown.Item>좋아요순</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
            <div className={styles.table}> {/* 노래 목록 */}
                <div className={styles.main_img}>

                </div>
                <div className={styles.title}>

                </div>
                <div className={styles.contents}> {/* 노래 정보 */}
                    <div className={styles.date}>

                    </div>
                    <div className={styles.file_size}>

                    </div>
                    <div className={styles.maker}>

                    </div>
                    <div className={styles.genre}>

                    </div>
                    <div className={styles.views}>

                    </div>
                    <div className={styles.heart_count}>

                    </div>
                    <div className={styles.download}>
                        <button className={styles.download_button}>download</button>
                    </div>
                </div>
                <div className={styles.heart}>
                    <button className={styles.heart_button}>♡</button>
                </div>
                <div className={styles.playlist}>
                    <button className={styles.playlist_button}>현재 재생목록에 추가</button>
                </div>
            </div>
            <div className={styles.page}>

            </div>
        </div>
    );
}

export default MainPage;