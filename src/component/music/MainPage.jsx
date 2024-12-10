import styles from '../../css/music/MainPage.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import heart1 from '../../img/heart1.png';
import heart2 from '../../img/heart2.png';
import heart3 from '../../img/heart3.png';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MainPage = ({ setSelectedTrack }) => { //구조분해할당

    const [myGenre, setMyGenre] = useState("전체");
    const [mySort, setMySort] = useState("이름순");

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
            console.log("전체")
        }
    }
    const handleSort = (eventKey) => {
        setMySort(eventKey);
        if(eventKey === "이름순"){
            eventKey=1
        }else if(eventKey === "최신순"){
            eventKey=2
        }else if(eventKey === "인기순"){
            eventKey=3
        }else if(eventKey === "좋아요순"){
            eventKey=4
        }else{
            eventKey=0
        }
    }

    // ##########
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:8787/music/list')
            .then((response) => {
                setPlaylist(response.data);
            })
            .catch((error) => {
                console.error('Failed to fetch music list:', error);
            });
    }, []);

    const handleTrackClick = (track) => {
        console.log("Contents.jsx 이미지 클릭 track: " + track.title);
        setSelectedTrack(track); // 선택된 노래 설정 //props.setSelectedTrack(track)
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
                            // name={"genre"}
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
                    {/*요소*/}
                    {playlist.map((track) => (
                        <div className={styles.slider_panel_slide} key={track.musicCode}>
                            <div className={styles.playable_tile}>
                                <div className={styles.playable_artwork}>
                                    <div className={styles.playable_artwork_image} onClick={() => handleTrackClick(track)}>
                                        <div className={styles.artwork} style={{
                                            backgroundImage: `url(http://localhost:8787/music/getMusic/image/${track.musicCode})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            width: '100%',
                                            height: '100%'
                                        }}>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.playable_tile_description}>
                                    <div className={styles.playable_tile_description_container}>
                                        {track.title}
                                    </div>
                                    <div className={styles.playable_tile_username_container}>
                                        {/* 이미지 경로 디버깅을 위한 출력 */}
                                        <p>이미지 경로: {track.imgPath}</p><br/>
                                        <p>음악 경로: {track.mp3Path}</p><br/>
                                        <p>Artist: {track.artist}</p><br/>
                                        <p>Views: {track.views}</p><br/>
                                        <p>date: {track.releaseDate}</p><br/>
                                        <p>fileSize: {track.fileSize}</p><br/>
                                        <p>runTime: {track.runtime}sec</p><br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/*요소*/}
                </div>
                <div className={styles.page}>

                </div>
            </div>
        </>
    );
}

export default MainPage;