import styles from '../../css/music/Contents.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Contents = ({ setSelectedTrack }) => {
    const [playlist, setPlaylist] = useState([]);
    const [latestMusic, setLatestMusic] = useState([]);
    const [myUpload, setMyUpload] = useState([]);
    const playlistSliderRef = useRef(null);
    const latestMusicSliderRef = useRef(null);
    const myUploadSliderRef = useRef(null);
    const [playlistShowNext, setPlaylistShowNext] = useState(true);
    const [playlistShowPrev, setPlaylistShowPrev] = useState(false);
    const [latestShowNext, setLatestShowNext] = useState(true);
    const [latestShowPrev, setLatestShowPrev] = useState(false);
    const [myUploadShowNext, setMyUploadShowNext] = useState(true);
    const [myUploadShowPrev, setMyUploadShowPrev] = useState(false);


    useEffect(() => {
        axios.post('http://localhost:8787/music/list')
            .then((response) => {
                setPlaylist(response.data);
            })
            .catch((error) => {
                console.error("Failed to fetch playlist:", error);
            });
    }, []);

    useEffect(() => {
        axios.post('http://localhost:8787/music/listLatest')
            .then((response) => {
                setLatestMusic(response.data);
            })
            .catch((error) => {
            });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8787/user/myUpload", {
            withCredentials: true,
        })
            .then((response) => {
                setMyUpload(response.data);
            })
            .catch((error) => {
                console.error("Failed to fetch my upload list:", error);
            });
    }, []);

    const handleTrackClick = (track) => {
        setSelectedTrack(track); // 선택된 노래 설정
    };

    const updatePlaylistButtonVisibility = () => {
        const slider = playlistSliderRef.current;
        if (!slider) return;

        const { scrollLeft, scrollWidth, offsetWidth } = slider;

        setPlaylistShowPrev(scrollLeft > 0);
        setPlaylistShowNext(scrollLeft + offsetWidth < scrollWidth);
    };

    const updateLatestButtonVisibility = () => {
        const slider = latestMusicSliderRef.current;
        if (!slider) return;

        const { scrollLeft, scrollWidth, offsetWidth } = slider;

        setLatestShowPrev(scrollLeft > 0);
        setLatestShowNext(scrollLeft + offsetWidth < scrollWidth);
    };

    const updateMyUploadButtonVisibility = () => {
        const slider = myUploadSliderRef.current;
        if (!slider) return;

        const { scrollLeft, scrollWidth, offsetWidth } = slider;

        setMyUploadShowPrev(scrollLeft > 0);
        setMyUploadShowNext(scrollLeft + offsetWidth < scrollWidth);
    };

    const slide = (direction, sliderRef, updateVisibility) => {
        const slider = sliderRef.current;

        if (!slider) return;

        const slideAmount = slider.offsetWidth / 2;

        if (direction === "next") {
            slider.scrollBy({ left: slideAmount, behavior: "smooth" });
        } else if (direction === "prev") {
            slider.scrollBy({ left: -slideAmount, behavior: "smooth" });
        }

        setTimeout(updateVisibility, 300); // 애니메이션 완료 후 상태 업데이트
    };

    useEffect(() => {
        updatePlaylistButtonVisibility();
        updateLatestButtonVisibility();
        updateMyUploadButtonVisibility();
    }, [playlist, latestMusic, myUpload]);

    return (
        <>
            <div className={styles.contents_container}>
                <div className={styles.inner_fullwidth}>
                    <div className={styles.container}>
                        <div></div>
                    </div>
                    <div id={styles.content}>
                        <div></div>
                        <div className={styles.fluid_fixed}>
                            <div className={styles.main}>
                                <div className={styles.heading}>
                                    <div>
                                        <div></div>
                                    </div>
                                </div>
                                <div className={styles.tab}></div>
                                <div className={styles.content}>
                                    <div>
                                        <div></div>
                                        <div></div>
                                        <div>
                                            <ul className={styles.loading_list}>
                                                <li className={styles.mix_item}>
                                                    <div>
                                                        <div className={styles.mixed_module}>
                                                            <div className={styles.mixed_module_title}>
                                                                <h2>주인장 추천</h2>
                                                            </div>
                                                            <div className={styles.mixed_music_container}>
                                                                {playlistShowPrev && (
                                                                    <button
                                                                        className={styles.prev_button}
                                                                        onClick={() => slide("prev", playlistSliderRef, updatePlaylistButtonVisibility)}
                                                                    >
                                                                        &#9664;
                                                                    </button>
                                                                )}
                                                                <div className={styles.slider} ref={playlistSliderRef}>
                                                                    <div className={styles.slider_peek_container}>
                                                                        <div className={styles.slider_panel}>
                                                                            {/*요소*/}
                                                                            {playlist.map((track) => (
                                                                                <div className={styles.slider_panel_slide}
                                                                                    key={track.musicCode}>
                                                                                    <div
                                                                                        className={styles.playable_tile}>
                                                                                        <div
                                                                                            className={styles.playable_artwork}>
                                                                                            <div
                                                                                                className={styles.playable_artwork_link}
                                                                                                onClick={() => handleTrackClick(track)}>
                                                                                                <div
                                                                                                    className={styles.playable_artwork_image}>
                                                                                                    <div
                                                                                                        className={styles.image_outline}>
                                                                                                        <span
                                                                                                            className={styles.artwork}
                                                                                                            style={{
                                                                                                                backgroundImage: `url(http://localhost:8787/${track.imgPath})`
                                                                                                            }}>
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className={styles.playable_tile_overlay}></div>
                                                                                            <div
                                                                                                className={styles.playable_tile_play_button}>
                                                                                                <Link to="/music"
                                                                                                      className={styles.play_button}>Play</Link>
                                                                                            </div>
                                                                                            <div
                                                                                                className={styles.playable_tile_action}>

                                                                                            </div>
                                                                                        </div>
                                                                                        <div
                                                                                            className={styles.playable_tile_description}>
                                                                                            <div
                                                                                                className={styles.playable_tile_description_container}>
                                                                                                <Link to="/music"
                                                                                                      className={styles.playable_audible_tile}>{track.title}</Link>
                                                                                            </div>
                                                                                            <div
                                                                                                className={styles.playable_tile_username_container}>
                                                                                                <Link to="/music"
                                                                                                      className={styles.playable_tile_username}>{track.artist}</Link>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                            {/*요소*/}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {playlistShowNext  && (
                                                                    <button
                                                                        className={styles.next_button}
                                                                        onClick={() => slide("next", playlistSliderRef, updatePlaylistButtonVisibility)}
                                                                    >
                                                                        &#9654;
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li className={styles.mix_item}>
                                                    <div>
                                                        <div className={styles.mixed_module}>
                                                            <div className={styles.mixed_module_title}>
                                                                <h2>최신 발매</h2>
                                                            </div>
                                                            <div className={styles.mixed_music_container}>
                                                                {latestShowPrev  && (
                                                                    <button
                                                                        className={styles.prev_button}
                                                                        onClick={() => slide("prev", latestMusicSliderRef, updatePlaylistButtonVisibility)}
                                                                    >
                                                                        &#9664;
                                                                    </button>
                                                                )}
                                                                <div className={styles.slider}
                                                                     ref={latestMusicSliderRef}>
                                                                    <div className={styles.slider_peek_container}>
                                                                        <div className={styles.slider_panel}>

                                                                            {/*요소*/}
                                                                            {latestMusic.map((track) => (
                                                                                <div
                                                                                    className={styles.slider_panel_slide}
                                                                                    key={track.musicCode}>
                                                                                    <div
                                                                                        className={styles.playable_tile}>
                                                                                        <div
                                                                                            className={styles.playable_artwork}>
                                                                                            <div
                                                                                                className={styles.playable_artwork_link}
                                                                                                onClick={() => handleTrackClick(track)}>
                                                                                                <div
                                                                                                    className={styles.playable_artwork_image}>
                                                                                                    <div
                                                                                                        className={styles.image_outline}>
                                                                                                    {/* <span
                                                                                                        className={styles.artwork}
                                                                                                        style={{
                                                                                                            backgroundImage: `url(http://localhost:8787/${track.imgPath})`
                                                                                                        }}>

                                                                                                    </span> */}
                                                                                                        <div
                                                                                                                className={styles.artwork}
                                                                                                                style={{
                                                                                                                    backgroundImage: `url(http://localhost:8787/music/getMusic/image/${track.musicCode})`,
                                                                                                                    backgroundSize: 'cover',
                                                                                                                    backgroundPosition: 'center',
                                                                                                                }}  
                                                                                                            />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className={styles.playable_tile_overlay}></div>
                                                                                            <div
                                                                                                className={styles.playable_tile_play_button}>
                                                                                                <Link to="/music"
                                                                                                      className={styles.play_button}>Play</Link>
                                                                                            </div>
                                                                                            <div
                                                                                                className={styles.playable_tile_action}>

                                                                                            </div>
                                                                                        </div>
                                                                                        <div
                                                                                            className={styles.playable_tile_description}>
                                                                                            <div
                                                                                                className={styles.playable_tile_description_container}>
                                                                                                <Link to="/music"
                                                                                                      className={styles.playable_audible_tile}>{track.title}</Link>
                                                                                            </div>
                                                                                            <div
                                                                                                className={styles.playable_tile_username_container}>
                                                                                                <Link to="/music"
                                                                                                      className={styles.playable_tile_username}>{track.artist}</Link>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                            {/*요소*/}

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {latestShowNext  && (
                                                                    <button
                                                                        className={styles.next_button}
                                                                        onClick={() => slide("next", latestMusicSliderRef, updateLatestButtonVisibility)}
                                                                    >
                                                                        &#9654;
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li className={styles.mix_item}>
                                                    <div>
                                                        <div className={styles.mixed_module}>
                                                            <div className={styles.mixed_module_title}>
                                                                <h2>나의 업로드</h2>
                                                            </div>
                                                            <div className={styles.mixed_music_container}>
                                                                {myUploadShowPrev  && (
                                                                    <button
                                                                        className={styles.prev_button}
                                                                        onClick={() => slide("prev", myUploadSliderRef, updateMyUploadButtonVisibility)}
                                                                    >
                                                                        &#9664;
                                                                    </button>
                                                                )}
                                                                <div className={styles.slider}
                                                                     ref={myUploadSliderRef}>
                                                                    <div className={styles.slider_peek_container}>
                                                                        <div className={styles.slider_panel}>

                                                                            {/*요소*/}
                                                                            {myUpload.map((track) => (
                                                                                <div
                                                                                    className={styles.slider_panel_slide}
                                                                                    key={track.musicCode}>
                                                                                    <div
                                                                                        className={styles.playable_tile}>
                                                                                        <div
                                                                                            className={styles.playable_artwork}>
                                                                                            <div
                                                                                                className={styles.playable_artwork_link}
                                                                                                onClick={() => handleTrackClick(track)}>
                                                                                                <div
                                                                                                    className={styles.playable_artwork_image}>
                                                                                                    <div
                                                                                                        className={styles.image_outline}>
                                                                                                    {/* <span
                                                                                                        className={styles.artwork}
                                                                                                        style={{
                                                                                                            backgroundImage: `url(http://localhost:8787/${track.imgPath})`
                                                                                                        }}>

                                                                                                    </span> */}
                                                                                                        <div
                                                                                                                className={styles.artwork}
                                                                                                                style={{
                                                                                                                    backgroundImage: `url(http://localhost:8787/music/getMusic/image/${track.musicCode})`,
                                                                                                                    backgroundSize: 'cover',
                                                                                                                    backgroundPosition: 'center',
                                                                                                                }}  
                                                                                                            />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className={styles.playable_tile_overlay}></div>
                                                                                            <div
                                                                                                className={styles.playable_tile_play_button}>
                                                                                                <Link to="/music"
                                                                                                      className={styles.play_button}>Play</Link>
                                                                                            </div>
                                                                                            <div
                                                                                                className={styles.playable_tile_action}>

                                                                                            </div>
                                                                                        </div>
                                                                                        <div
                                                                                            className={styles.playable_tile_description}>
                                                                                            <div
                                                                                                className={styles.playable_tile_description_container}>
                                                                                                <Link to="/music"
                                                                                                      className={styles.playable_audible_tile}>{track.title}</Link>
                                                                                            </div>
                                                                                            <div
                                                                                                className={styles.playable_tile_username_container}>
                                                                                                <Link to="/music"
                                                                                                      className={styles.playable_tile_username}>{track.artist}</Link>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                            {/*요소*/}

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {myUploadShowNext  && (
                                                                    <button
                                                                        className={styles.next_button}
                                                                        onClick={() => slide("next", myUploadSliderRef, updateMyUploadButtonVisibility)}
                                                                    >
                                                                        &#9654;
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Contents;