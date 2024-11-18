import styles from '../css/MiniPlayer.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const MiniPlayer = () => {
    const [audioSrc, setAudioSrc] = useState('');
    const [audio, setAudio] = useState(new Audio());

    const playAudio = async (filename) => {
        try {
            const response = await fetch(`http://localhost:8787/playlist/play/${filename}`);
            if (!response.ok) throw new Error('Failed to fetch audio file');
            const url = response.url;

            audio.pause(); // 현재 재생 중인 오디오 중지
            const newAudio = new Audio(url); // 새 오디오 인스턴스 생성
            setAudio(newAudio);
            await newAudio.play();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.play_controls}>
            <section className={styles.mini_player_container}>
                <div className={styles.play_controls_wrapper}>
                    <div className={styles.play_controls_queue}>
                        <div className={styles.queue}>
                            <div className={styles.queue_panel}>
                                <div className={styles.queue_title}>Next up</div>
                                <button type="button" className={styles.queue_clear}>Clear</button>
                                <button type="button" className={styles.queue_hide}>Hide queue</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.play_controls_bg}></div>
                    <div className={styles.play_controls_elements}>
                        <button type={"button"} className={styles.play_controls_previous}>Skip to previous</button>
                        <button type={"button"} className={styles.play_controls_play} onClick={() => playAudio('After_You.mp3')}>Play current</button>
                        <button type={"button"} className={styles.play_controls_next} onClick={() => playAudio('Burkinelectric.mp3')}>Skip to next</button>
                        <div className={styles.play_controls_shuffle}>
                            <button type={"button"} className={styles.shuffle_control}>Shuffle</button>
                        </div>
                        <div className={styles.play_controls_repeat}>
                            <button type={"button"} className={styles.repeat_control}>Repeat track</button>
                        </div>
                        <div className={styles.play_controls_timeline}>
                            <div className={styles.playback_timeline}>
                                <div className={styles.playback_timeline_time_passed}>
                                    <span className={styles.visually_hidden}>Current time: 0 seconds</span>
                                    <span>0:00</span>
                                </div>
                                <div className={styles.playback_timeline_progress_wrapper}>
                                    <div className={styles.playback_timeline_progress_background}></div>
                                    <div className={styles.playback_timeline_progress_bar} style={
                                        {
                                            minWidth: "0px", width: "0%"
                                        }
                                    }></div>
                                    <div className={styles.playback_timeline_progress_handle} style={
                                        {left: "0%"}
                                    }></div>
                                </div>
                                <div className={styles.playback_timeline_duration}>
                                    <span className={styles.visually_hidden}>Duration: 3 minutes 5 seconds</span>
                                    <span aria-hidden={true}>3:05</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.play_controls_cast_control}></div>
                        <div className={styles.play_controls_volume}>
                            <div className={styles.volume}>
                                <div className={styles.visually_hidden}></div>
                                <div className={styles.volume_icon_wrapper}>
                                    <button type={"button"} className={styles.volume_icon}></button>
                                </div>
                                <div className={styles.sc_hidden}>Use shift and the arrow up and down keys to change the volume.</div>
                                <div className={styles.volume_slider_wrapper} role={"slider"} aria-valuemin={0} aria-valuemax={1} aria-valuenow={1}>
                                    <div className={styles.volume_slider_background}></div>
                                    <div className={styles.volume_slider_progress} style={{
                                        height: "92px"
                                    }}></div>
                                    <div className={styles.volume_slider_handle} style={{
                                        top: "10px"
                                    }}></div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.play_controls_sound_badge}>
                            <div className={styles.playback_sound_badge}>
                                <Link to={"/"} className={styles.playback_sound_badge_link}>
                                    <div className={styles.sc_media_image}>
                                        <span className={styles.image_full}></span>
                                    </div>
                                </Link>
                                <div className={styles.playback_sound_badge_title_context_container}>
                                    <Link to={"/"} className={styles.playback_sound_badge_light_link}>Shiitake Products</Link>
                                </div>
                                <div className={styles.playback_sound_badge_title}>
                                    <Link to={"/"} className={styles.playback_sound_badge_title_link}>
                                        <span className={styles.visually_hidden}>Current track: Nebula Nightshade</span>
                                        <span aria-hidden={true}>Nebula Nightshade</span>
                                    </Link>
                                </div>
                                <div className={styles.playback_sound_badge_actions}>
                                    <button type={"button"} className={styles.sc_button_icon}>Like</button>
                                    <button type={"button"} className={styles.sc_button_follow}>Follow</button>
                                    <Link to={"/"} className={styles.playback_sound_badge_action_link}></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}

export default MiniPlayer;