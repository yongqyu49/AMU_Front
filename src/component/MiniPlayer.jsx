import styles from '../css/MiniPlayer.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Player from "./playlist/Player";

const MiniPlayer = ({ selectedTrack }) => {
    const [audioUrl, setAudioUrl] = useState(null); // Blob으로 생성된 Object URL
    const [audio, setAudio] = useState(null); // Audio 객체
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [showPlayer, setShowPlayer] = useState(false);

    // Blob 데이터를 가져오고 Object URL 생성
    useEffect(() => {
        if (selectedTrack) {
            // 이전 트랙의 오디오 중지 및 URL 해제
            if (audio) {
                audio.pause();
                audio.src = '';
                setAudio(null);
            }
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
                setAudioUrl(null);
            }

            axios
                .get(`http://localhost:8787/music/play/${selectedTrack.title}`, {
                    withCredentials: true,
                    responseType: 'blob', // Blob 데이터를 반환받음
                })
                .then((response) => {
                    const url = URL.createObjectURL(response.data); // Blob 데이터를 Object URL로 변환
                    setAudioUrl(url);
                })
                .catch((error) => {
                    console.error('Error loading audio:', error);
                });
        }
    }, [selectedTrack]);

    // Audio 객체 생성 및 이벤트 설정
    useEffect(() => {
        if (audioUrl) {
            const newAudio = new Audio(audioUrl);
            setAudio(newAudio);

            newAudio.onloadedmetadata = () => {
                setDuration(newAudio.duration); // 총 재생 시간
                setCurrentTime(0); // 초기화
                setIsPlaying(true); // 자동 재생 상태로 설정
                newAudio.play(); // 자동 재생
            };

            newAudio.ontimeupdate = () => {
                setCurrentTime(newAudio.currentTime); // 현재 재생 위치
            };

            newAudio.onended = () => {
                setIsPlaying(false); // 재생이 끝나면 상태 업데이트
            };

            return () => {
                newAudio.pause();
                newAudio.src = ''; // 메모리 누수 방지
                setAudio(null);
                URL.revokeObjectURL(audioUrl); // Object URL 해제
            };
        }
    }, [audioUrl]);

    const togglePlayPause = () => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSeek = (e) => {
        if (audio) {
            const newTime = parseFloat(e.target.value);
            audio.currentTime = newTime; // 오디오의 현재 재생 위치 변경
            setCurrentTime(newTime);
        }
    };

    // 시간 포맷팅 함수
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
            .toString()
            .padStart(2, '0');
        const seconds = Math.floor(time % 60)
            .toString()
            .padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const handleNextTrack = () => {
        // setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
        setIsPlaying(false); // 다음 곡으로 넘어갈 때 자동 재생
    };

    const handlePreviousTrack = () => {
        // setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
        setIsPlaying(false);
    };

    const togglePlayer = () => {
        console.log("togglePlayer");
        setShowPlayer(!showPlayer); // Player 슬라이드 상태 변경
    };

    return (
        <>
            {/* Player 컴포넌트 */}
            <div
                    className={`${styles.a} ${
                    showPlayer ? styles.show : ""
                }`}
                >
              <Player selectedTrack={selectedTrack}/>
            </div>
            <div className={styles.play_controls}>
                <section className={styles.mini_player_container}>
                    <div className={styles.play_controls_wrapper}>
                        <div className={styles.play_controls_elements}>
                            <button type={"button"} className={styles.play_controls_previous}
                                    onClick={handlePreviousTrack}>Skip to previous
                            </button>
                            <button
                                type="button"
                                onClick={togglePlayPause}
                                className={isPlaying ? styles.play_controls_pause : styles.play_controls_play}
                            >
                                {isPlaying ? 'Pause' : 'Play'}
                            </button>
                            <button type={"button"} className={styles.play_controls_next} onClick={handleNextTrack}>Skip
                                to
                                next
                            </button>

                            {/* 현재 시간 / 총 시간 */}
                            <div>
                            <span>
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                            </div>

                            {/* 재생 위치 조절 */}
                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                value={currentTime}
                                onChange={handleSeek}
                            />
                            <div className={styles.play_controls_cast_control}></div>
                            <div className={styles.play_controls_volume}>
                                <div className={styles.volume}>
                                    <div className={styles.visually_hidden}></div>
                                    <div className={styles.volume_icon_wrapper}>
                                        <button type={"button"} className={styles.volume_icon}></button>
                                    </div>
                                    <div className={styles.sc_hidden}>Use shift and the arrow up and down keys to change
                                        the
                                        volume.
                                    </div>
                                    <div className={styles.volume_slider_wrapper} role={"slider"} aria-valuemin={0}
                                         aria-valuemax={1} aria-valuenow={1}>
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
                                        <Link to={"/"} className={styles.playback_sound_badge_light_link}>Shiitake
                                            Products</Link>
                                    </div>
                                    <div className={styles.playback_sound_badge_title}>
                                        <Link to={"/"} className={styles.playback_sound_badge_title_link}>
                                            <span className={styles.visually_hidden}></span>
                                            <span
                                                aria-hidden={true}>{selectedTrack?.title || "No Track Selected"}</span>
                                        </Link>
                                    </div>
                                    <div className={styles.playback_sound_badge_actions}>
                                        <button type={"button"} className={styles.sc_button_icon}>Like</button>
                                        <button type={"button"} className={styles.sc_button_follow}>Follow</button>
                                        <Link to={"/"} className={styles.playback_sound_badge_action_link}></Link>
                                    </div>
                                </div>
                            </div>

                            {/* 현재 트랙 제목 */}
                            <div>
                                <button type={"button"} onClick={togglePlayer}>slide</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default MiniPlayer;

