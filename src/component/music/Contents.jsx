import styles from '../../css/music/Contents.module.css';
import { Link } from 'react-router-dom';
import Layout from '../Layout'


const Contents = () => {
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
                                                                            <div className={styles.slider_panel_slide}>
                                                                                <div className={styles.playable_tile}>
                                                                                    <div className={styles.playable_artwork}>
                                                                                        <Link to="/music" className={styles.playable_artwork_link}>
                                                                                            <div className={styles.playable_artwork_image}>
                                                                                                <div className={styles.image_outline}>
                                                                                                    <span className={styles.artwork}>

                                                                                                    </span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </Link>
                                                                                        <div className={styles.playable_tile_overlay}></div>
                                                                                        <div className={styles.playable_tile_play_button}>
                                                                                            <Link to="/music" className={styles.play_button}>Play</Link>
                                                                                        </div>
                                                                                        <div className={styles.playable_tile_action}>

                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.playable_tile_description}>
                                                                                        <div className={styles.playable_tile_description_container}>
                                                                                            <Link to="/music" className={styles.playable_audible_tile}>Hip Hop & Rap</Link>
                                                                                        </div>
                                                                                        <div className={styles.playable_tile_username_container}>
                                                                                            <Link to="/music" className={styles.playable_tile_username}>Trending Music</Link>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            {/*요소 끝*/}

                                                                            {/*요소*/}
                                                                            <div className={styles.slider_panel_slide}>
                                                                                <div className={styles.playable_tile}>
                                                                                    <div className={styles.playable_artwork}>
                                                                                        <Link to="/music" className={styles.playable_artwork_link}>
                                                                                            <div className={styles.playable_artwork_image}>
                                                                                                <div className={styles.image_outline}>
                                                                                                    <span className={styles.artwork}>

                                                                                                    </span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </Link>
                                                                                        <div className={styles.playable_tile_overlay}></div>
                                                                                        <div className={styles.playable_tile_play_button}>
                                                                                            <Link to="/music" className={styles.play_button}>Play</Link>
                                                                                        </div>
                                                                                        <div className={styles.playable_tile_action}>

                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.playable_tile_description}>
                                                                                        <div className={styles.playable_tile_description_container}>
                                                                                            <Link to="/music" className={styles.playable_audible_tile}>Hip Hop & Rap</Link>
                                                                                        </div>
                                                                                        <div className={styles.playable_tile_username_container}>
                                                                                            <Link to="/music" className={styles.playable_tile_username}>Trending Music</Link>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            {/*요소 끝*/}

                                                                            {/*요소*/}
                                                                            <div className={styles.slider_panel_slide}>
                                                                                <div className={styles.playable_tile}>
                                                                                    <div className={styles.playable_artwork}>
                                                                                        <Link to="/music" className={styles.playable_artwork_link}>
                                                                                            <div className={styles.playable_artwork_image}>
                                                                                                <div className={styles.image_outline}>
                                                                                                    <span className={styles.artwork}>

                                                                                                    </span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </Link>
                                                                                        <div className={styles.playable_tile_overlay}></div>
                                                                                        <div className={styles.playable_tile_play_button}>
                                                                                            <Link to="/music" className={styles.play_button}>Play</Link>
                                                                                        </div>
                                                                                        <div className={styles.playable_tile_action}>

                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.playable_tile_description}>
                                                                                        <div className={styles.playable_tile_description_container}>
                                                                                            <Link to="/music" className={styles.playable_audible_tile}>Hip Hop & Rap</Link>
                                                                                        </div>
                                                                                        <div className={styles.playable_tile_username_container}>
                                                                                            <Link to="/music" className={styles.playable_tile_username}>Trending Music</Link>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            {/*요소 끝*/}

                                                                            {/*요소*/}
                                                                            <div className={styles.slider_panel_slide}>
                                                                                <div className={styles.playable_tile}>
                                                                                    <div className={styles.playable_artwork}>
                                                                                        <Link to="/music" className={styles.playable_artwork_link}>
                                                                                            <div className={styles.playable_artwork_image}>
                                                                                                <div className={styles.image_outline}>
                                                                                                    <span className={styles.artwork}>

                                                                                                    </span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </Link>
                                                                                        <div className={styles.playable_tile_overlay}></div>
                                                                                        <div className={styles.playable_tile_play_button}>
                                                                                            <Link to="/music" className={styles.play_button}>Play</Link>
                                                                                        </div>
                                                                                        <div className={styles.playable_tile_action}>

                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.playable_tile_description}>
                                                                                        <div className={styles.playable_tile_description_container}>
                                                                                            <Link to="/music" className={styles.playable_audible_tile}>Hip Hop & Rap</Link>
                                                                                        </div>
                                                                                        <div className={styles.playable_tile_username_container}>
                                                                                            <Link to="/music" className={styles.playable_tile_username}>Trending Music</Link>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            {/*요소 끝*/}

                                                                            {/*요소*/}
                                                                            <div className={styles.slider_panel_slide}>
                                                                                <div className={styles.playable_tile}>
                                                                                    <div className={styles.playable_artwork}>
                                                                                        <Link to="/music" className={styles.playable_artwork_link}>
                                                                                            <div className={styles.playable_artwork_image}>
                                                                                                <div className={styles.image_outline}>
                                                                                                    <span className={styles.artwork}>

                                                                                                    </span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </Link>
                                                                                        <div className={styles.playable_tile_overlay}></div>
                                                                                        <div className={styles.playable_tile_play_button}>
                                                                                            <Link to="/music" className={styles.play_button}>Play</Link>
                                                                                        </div>
                                                                                        <div className={styles.playable_tile_action}>

                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.playable_tile_description}>
                                                                                        <div className={styles.playable_tile_description_container}>
                                                                                            <Link to="/music" className={styles.playable_audible_tile}>Hip Hop & Rap</Link>
                                                                                        </div>
                                                                                        <div className={styles.playable_tile_username_container}>
                                                                                            <Link to="/music" className={styles.playable_tile_username}>Trending Music</Link>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            {/*요소 끝*/}

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