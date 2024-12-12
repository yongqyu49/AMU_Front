import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../css/MiniPlayer.module.css';
import Player from './playlist/Player';

const MiniPlayer = ({ selectedTrack }) => {
    const [audioUrl, setAudioUrl] = useState(null);
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [showPlayer, setShowPlayer] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [showVolumeModal, setShowVolumeModal] = useState(false);
    const [isLiked, setIsLiked] = useState(false); // 상태 추가

    useEffect(() => {
        if (selectedTrack) {
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
                    responseType: 'blob',
                })
                .then((response) => {
                    const url = URL.createObjectURL(response.data);
                    setAudioUrl(url);
                })
                .catch((error) => {
                    console.error('Error loading audio:', error);
                });
        }
    }, [selectedTrack]);

    useEffect(() => {
        if (audioUrl) {
            const newAudio = new Audio(audioUrl);
            setAudio(newAudio);

            newAudio.onloadedmetadata = () => {
                setDuration(newAudio.duration);
                setCurrentTime(0);
                setIsPlaying(true);
                newAudio.play();
            };

            newAudio.ontimeupdate = () => {
                setCurrentTime(newAudio.currentTime);
            };

            newAudio.onended = () => {
                setIsPlaying(false);
            };

            return () => {
                newAudio.pause();
                newAudio.src = '';
                setAudio(null);
                URL.revokeObjectURL(audioUrl);
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
            audio.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
            .toString()
            .padStart(2, '0');
        const seconds = Math.floor(time % 60)
            .toString()
            .padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const handlePreviousTrack = () => {
        // 이전 곡으로 이동하는 기능 구현
        setIsPlaying(false);
    };

    const handleNextTrack = () => {
        // 다음 곡으로 이동하는 기능 구현
        setIsPlaying(false);
    };

    const toggleMute = () => {
        if (audio) {
            if (isMuted) {
                audio.volume = volume;
            } else {
                audio.volume = 0;
            }
            setIsMuted(!isMuted);
        }
    };

    const getVolumeIcon = () => {
        if (isMuted || volume === 0) {
            return '🔇';
        } else if (volume > 0 && volume <= 0.5) {
            return '🔈';
        } else {
            return '🔊';
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audio) {
            audio.volume = newVolume;
        }
        setIsMuted(newVolume === 0);
    };

    const togglePlayer = () => {
        setShowPlayer(!showPlayer);
    };

    const toggleLike = () => {
        setIsLiked(!isLiked); // 하트 클릭 시 상태 반전
    };

    return (
        <>
            {/* Player 컴포넌트 */}
            <div
                className={`${styles.a} ${
                    showPlayer ? styles.show : ''
                }`}
            >
                <Player selectedTrack={selectedTrack} />
            </div>
            <div className={styles.play_controls}>
                <section className={styles.mini_player_container}>
                    <div className={styles.play_controls_wrapper}>
                        <div className={styles.play_controls_elements}>
                            <button type="button" className={styles.play_controls_previous} onClick={handlePreviousTrack}>
                                Skip to previous
                            </button>
                            <button
                                type="button"
                                onClick={togglePlayPause}
                                className={isPlaying ? styles.play_controls_pause : styles.play_controls_play}
                            >
                                {isPlaying ? 'Pause' : 'Play'}
                            </button>
                            <button type="button" className={styles.play_controls_next} onClick={handleNextTrack}>
                                Skip to next
                            </button>

                            <div style={{ marginLeft: '20px' }}>
                                <span>
                                    {formatTime(currentTime)} / {formatTime(duration)}
                                </span>
                            </div>

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
                                        <div
                                            className={styles.volume_control}
                                            onMouseEnter={() => setShowVolumeModal(true)}
                                            onMouseLeave={() => setShowVolumeModal(false)}
                                        >
                                            <button type="button" className={styles.volume_icon} onClick={toggleMute}>
                                                {getVolumeIcon()}
                                            </button>
                                            {showVolumeModal && (
                                                <div className={styles.volume_modal}>
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="1"
                                                        step="0.01"
                                                        value={isMuted ? 0 : volume}
                                                        onChange={handleVolumeChange}
                                                    />
                                                    <span>{Math.round(volume * 100)}%</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.play_controls_sound_badge}>
                                <div className={styles.playback_sound_badge}>
                                    <Link to="/" className={styles.playback_sound_badge_link}>
                                        <div className={styles.sc_media_image}>
                                            <span
                                                className={styles.image_full}
                                                style={{
                                                    backgroundImage: selectedTrack?.imgPath
                                                        ? `url(http://localhost:8787/${selectedTrack.imgPath})`
                                                        : 'none',
                                                }}
                                            ></span>
                                        </div>
                                    </Link>
                                    <div className={styles.playback_sound_badge_title_context_container}>
                                        <Link to="/" className={styles.playback_sound_badge_light_link}>
                                            Shiitake Products
                                        </Link>
                                    </div>
                                    <div className={styles.playback_sound_badge_title}>
                                        <Link to="/" className={styles.playback_sound_badge_title_link}>
                                            <span className={styles.visually_hidden}></span>
                                            <span aria-hidden={true}>{selectedTrack?.title || 'No Track Selected'}</span>
                                        </Link>
                                    </div>
                                    <div className={styles.playback_sound_badge_actions}>
                                        <button
                                            type="button"
                                            className={styles.sc_button_follow}
                                            onClick={toggleLike} // 하트 버튼 클릭 시 상태 변경
                                        >
                                            {isLiked ? '🖤' : '🤍'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button type="button" onClick={togglePlayer} className={styles.slide_button}>
                                    ☰
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default MiniPlayer;
