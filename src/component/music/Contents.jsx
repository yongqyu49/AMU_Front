import styles from '../../css/music/Contents.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Contents = ({ setSelectedTrack }) => {

    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:8787/music/list')
            .then((response) => {
                setPlaylist(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Failed to fetch music list:', error);
            });
    }, []);

    const handleTrackClick = (track) => {
        console.log("Contents.jsx 이미지 클릭 track: " + track.title);
        setSelectedTrack(track); // 선택된 노래 설정
    };

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
                                                                <h2>Trending Music on SoundCloud</h2>
                                                            </div>
                                                            <div className={styles.mixed_music_container}>
                                                                <div className={styles.slider}>
                                                                    <div className={styles.slider_peek_container}>
                                                                        <div className={styles.slider_panel}>

                                                                            {/*요소*/}
                                                                            {playlist.map((track) => (
                                                                                <div className={styles.slider_panel_slide} key={track.musicCode}>
                                                                                    <div className={styles.playable_tile}>
                                                                                        <div className={styles.playable_artwork}>
                                                                                            <div className={styles.playable_artwork_link} onClick={() => handleTrackClick(track)}>
                                                                                                <div className={styles.playable_artwork_image}>
                                                                                                    <div className={styles.image_outline}>
                                                                                                    <span className={styles.artwork}>

                                                                                                    </span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className={styles.playable_tile_overlay}></div>
                                                                                            <div className={styles.playable_tile_play_button}>
                                                                                                <Link to="/music" className={styles.play_button}>Play</Link>
                                                                                            </div>
                                                                                            <div className={styles.playable_tile_action}>

                                                                                            </div>
                                                                                        </div>
                                                                                        <div className={styles.playable_tile_description}>
                                                                                            <div className={styles.playable_tile_description_container}>
                                                                                                <Link to="/music" className={styles.playable_audible_tile}>{track.title}</Link>
                                                                                            </div>
                                                                                            <div className={styles.playable_tile_username_container}>
                                                                                                <Link to="/music" className={styles.playable_tile_username}>{track.artist}</Link>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                            {/*요소*/}

                                                                        </div>
                                                                    </div>
                                                                </div>
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