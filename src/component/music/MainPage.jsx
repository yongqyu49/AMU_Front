import styles from '../../css/music/MainPage.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import heart1 from '../../img/heart1.png';
import heart2 from '../../img/heart2.png';
import heart3 from '../../img/heart3.png';

const MainPage = () => {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.drop_down}> {/* 드롭다운 바 */}
                    <div className={styles.drop1}> {/* 장르 */}
                        <DropdownButton
                        id="dropdown-genre-button"
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
                        id="dropdown-sort-button1"
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
                <div className={styles.catalog}>
                    {/* 노래 목록 */}
                    {/*이미지, 제목*/}
                    {/*노래정보[제작자, 조회수, 하트수, 날짜, 장르, 파일크기 */}
                    {/*다운로드 버튼*/}
                    {/*하트버튼*/}
                    {/*플레이리스트 추가 버튼*/}
                    <div className={styles.image}><img src={heart1} alt="main img"/></div>
                    <div className={styles.content}>
                        <div className={styles.title}><span>title</span></div>
                        <div className={styles.info}>
                            <div className={styles.maker}>lsw</div>|
                            <div className={styles.views}>999</div>|
                            <div className={styles.hearts}>10</div>|
                            <div className={styles.date}>2024-11-13</div>|
                            <div className={styles.genre}>hiphop</div>|
                            <div className={styles.size}>100mb</div>
                            <div className={styles.download_btn}>
                                <button type="button" onClick="">download</button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.heart_btn}><img src={heart1} alt="heart"/></div>
                    <div className={styles.playlist_btn}><img src={heart3}/></div>
                </div>
                <div className={styles.page}>

                </div>
            </div>
        </>
    );
}

export default MainPage;