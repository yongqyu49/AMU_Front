import styles from '../../css/music/MainPage.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MainPage = ({ setSelectedTrack }) => { //구조분해할당

    const [myGenre, setMyGenre] = useState("전체");
    const [mySort, setMySort] = useState("이름순");
    const [playlist, setPlaylist] = useState([]);

    const handleGenre = (eventKey) => {
        setMyGenre(eventKey);
        if(eventKey === "팝"){
            eventKey=1
        }else if(eventKey === "힙합"){
            eventKey=2
        }else if(eventKey === "발라드"){
            eventKey=3
        }else if(eventKey === "인디"){
            eventKey=4
        }else if(eventKey === "R&B"){
            eventKey=5
        }else{
            eventKey=0
            console.log("���체")
        }
    }

    const handleSort = (eventKey) => {
        setMySort(eventKey);
        let sortType;

        switch(eventKey) {
            case "이름순":
                sortType = "name";
                break;
            case "최신순":
                sortType = "date";
                break;
            case "인기순":
                sortType = "views";
                break;
            case "좋아요순":
                sortType = "likes";
                break;
            default:
                sortType = "name";
        }

        axios.get(`http://localhost:8787/music/sort/${sortType}`)
            .then((response) => {
                setPlaylist(response.data);
            })
            .catch((error) => {
                console.error('정렬중 오류:', error);
            });
    }

    useEffect(() => {
        axios.post('http://localhost:8787/music/list')
            .then((response) => {
                setPlaylist(response.data);
                return axios.get(`http://localhost:8787/music/sort/name`);
            })
            .then((sortResponse) => {
                setPlaylist(sortResponse.data);
            })
            .catch((error) => {
                console.error('Failed to fetch music list:', error);
            });
    }, []);

    const handleTrackClick = (track) => {
        console.log("Contents.jsx 이미지 클릭 track: " + track.title);
        setSelectedTrack(track); // 선택된 노래 설정
    };

    const toggleMenu = (trackId) => {
        setActiveMenu(activeMenu === trackId ? null : trackId); // 토글 방식
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.drop_down}> {/* 드롭다운 바 */}
                    <div className={styles.drop1}>
                        <DropdownButton
                            id="dropdown-genre-button"
                            title={myGenre}
                            size="sm"
                            variant="light"
                            onSelect={handleGenre}
                        >
                            <Dropdown.Item eventKey="전체">전체</Dropdown.Item>
                            <Dropdown.Item eventKey="팝">팝</Dropdown.Item>
                            <Dropdown.Item eventKey="힙합">힙합</Dropdown.Item>
                            <Dropdown.Item eventKey="발라드">발라드</Dropdown.Item>
                            <Dropdown.Item eventKey="인디">인디</Dropdown.Item>
                            <Dropdown.Item eventKey="R&B">R&B</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div className={styles.drop2}> {/* 노래 정렬 */}
                        <DropdownButton
                            id="dropdown-sort-button1"
                            title={mySort}
                            size="sm"
                            variant="light"
                            onSelect={handleSort}
                        >
                            <Dropdown.Item eventKey="이름순">이름순</Dropdown.Item>
                            <Dropdown.Item eventKey="최신순">최신순</Dropdown.Item>
                            <Dropdown.Item eventKey="인기순">인기순</Dropdown.Item>
                            <Dropdown.Item eventKey="좋아요순">좋아요순</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
                <div className={styles.catalog}>
                    {/* 요소 */}
                    <div className={styles.album_grid}>
                        {playlist.map((track, index) => (
                            <div className={styles.album_card} key={`${track.musicCode}-${index}`}>
                                <div
                                    className={styles.album_artwork}
                                    style={{
                                        backgroundImage: `url(http://localhost:8787/music/getMusic/image/${track.musicCode})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                    onClick={() => handleTrackClick(track)}
                                />
                                <div className={styles.album_details}>
                                    <h4 className={styles.album_title}>
                                        {track.title}
                                        </h4>
                                    <p className={styles.album_artist}>{track.artist}</p>
                                </div>
                                <div className={styles.album_more} onClick={() => toggleMenu(track.musicCode)}>
                                    <span className={styles.album_more_icon}>...</span>
                                </div>

                                {activeMenu === track.musicCode && (
                                    <div
                                        className={`${styles.more_menu} ${activeMenu === track.musicCode ? "active" : ""}`}>
                                        <div className={styles.more_menu_item}>Views: {track.views}</div>
                                        <div className={styles.more_menu_item}>Likes: {track.likes}</div>
                                        <div className={styles.more_menu_item}>FileSize: {track.fileSize}</div>
                                        <div className={styles.more_menu_item}>RunTime: {track.runtime}</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* 요소 */}
                </div>
                <div className={styles.page}>
                    {/* 페이지 내용 */}
                </div>
            </div>
        </>
    );
}

export default MainPage;
