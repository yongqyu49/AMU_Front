import styles from '../css/MiniPlayer.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MiniPlayer = ({ selectedTrack }) => {
    const [audioUrl, setAudioUrl] = useState(null); // Blob으로 생성된 Object URL
    const [audio, setAudio] = useState(null); // Audio 객체
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

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

    const pauseAudio = () => {
        if (audio) {
            audio.pause();
            setIsPlaying(false);
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

    return (
        <div className={styles.play_controls}>
            <section className={styles.mini_player_container}>
                <div className={styles.play_controls_wrapper}>
                    <div className={styles.play_controls_elements}>
                        {/* 재생/일시 정지 버튼 */}
                        <button type="button" onClick={isPlaying ? pauseAudio : () => audio?.play()}>
                            {isPlaying ? 'Pause' : 'Play'}
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

                        {/* 현재 트랙 제목 */}
                        <div>
                            <span>{selectedTrack?.title || 'No Track Selected'}</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MiniPlayer;
