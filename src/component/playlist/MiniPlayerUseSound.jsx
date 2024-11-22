// import styles from '../css/MiniPlayer.module.css';
// import useSound from "use-sound"
// import { Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
//
// const MiniPlayer = ({ selectedTrack }) => {
//     const [audio, setAudio] = useState(null);
//     const [playlist, setPlaylist] = useState([]);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
//     const [time, setTime] = useState({
//         min: "",
//         sec: ""
//     });
//     const [currTime, setCurrTime] = useState({
//         min: "",
//         sec: ""
//     });
//
//     const [seconds, setSeconds] = useState();
//
//     console.log("MiniPlayer.jsx selectedTrack: " + selectedTrack);
//     const [play, { pause, duration, sound }] = useSound(
//         selectedTrack ? `http://localhost:8787/music/play/${selectedTrack.title}` : null,
//         { format: ['mp3'], autoplay: true }
//     );
//
//     // useEffect(() => {
//     //     axios.post('http://localhost:8787/music/list')
//     //         .then((response) => {
//     //             setPlaylist(response.data);
//     //         })
//     //         .catch((error) => {
//     //             console.error('Failed to fetch music list:', error);
//     //         });
//     // }, []);
//
//     useEffect(() => {
//         if (selectedTrack) {
//             axios
//                 .get(`http://localhost:8787/music/play/${selectedTrack.title}`, {
//                     withCredentials: true, // 세션 유지용
//                     responseType: "blob", // 오디오 데이터를 blob으로 받음
//                 })
//                 .then((response) => {
//                     console.log(response.data)
//                     const audioUrl = URL.createObjectURL(response.data); // blob URL 생성
//                     if (audio) audio.pause(); // 기존 오디오 정지
//                     const newAudio = new Audio(audioUrl);
//                     setAudio(newAudio);
//                 })
//                 .catch((error) => {
//                     console.error("Error loading audio:", error);
//                 });
//         }
//     }, [selectedTrack]);
//
//     // 음악 길이
//     useEffect(() => {
//         if (duration) {
//             const sec = duration / 1000;
//             const min = Math.floor(sec / 60);
//             const secRemain = Math.floor(sec % 60);
//             setTime({
//                 min: min,
//                 sec: secRemain
//             });
//         }
//     }, [isPlaying]);
//
//     useEffect(() => {
//         const interval = setInterval(() => {
//             if (sound) {
//                 setSeconds(sound.seek([]));
//                 const min = Math.floor(sound.seek([]) / 60);
//                 const sec = Math.floor(sound.seek([]) % 60);
//                 setCurrTime({
//                     min,
//                     sec
//                 });
//             }
//         }, 1000);
//         return () => clearInterval(interval);
//     }, [sound]);
//
//     const playingButton = () => {
//         if (isPlaying) {
//             pause();
//             setIsPlaying(false);
//         } else {
//             play();
//             setIsPlaying(true);
//         }
//     };
//
//     const handleNextTrack = () => {
//         setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
//         setIsPlaying(false); // 다음 곡으로 넘어갈 때 자동 재생
//     };
//
//     const handlePreviousTrack = () => {
//         setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
//         setIsPlaying(false);
//     };
//
//     return (
//         <div className={styles.play_controls}>
//             <section className={styles.mini_player_container}>
//                 <div className={styles.play_controls_wrapper}>
//                     <div className={styles.play_controls_queue}>
//                         <div className={styles.queue}>
//                             <div className={styles.queue_panel}>
//                                 <div className={styles.queue_title}>Next up</div>
//                                 <button type="button" className={styles.queue_clear}>Clear</button>
//                                 <button type="button" className={styles.queue_hide}>Hide queue</button>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={styles.play_controls_bg}></div>
//                     <div className={styles.play_controls_elements}>
//                         <button type={"button"} className={styles.play_controls_previous} onClick={handlePreviousTrack}>Skip to previous</button>
//                         {!isPlaying ? (
//                             <button type={"button"} className={styles.play_controls_play} onClick={playingButton}>Play current</button>
//                         ) : (
//                             <button type={"button"} className={styles.play_controls_pause} onClick={playingButton}>Pause
//                                 current</button>
//                         )}
//                         <button type={"button"} className={styles.play_controls_next} onClick={handleNextTrack}>Skip to next
//                         </button>
//                         <div className={styles.play_controls_shuffle}>
//                             <button type={"button"} className={styles.shuffle_control}>Shuffle</button>
//                         </div>
//                         <div className={styles.play_controls_repeat}>
//                             <button type={"button"} className={styles.repeat_control}>Repeat track</button>
//                         </div>
//                         <div className={styles.play_controls_timeline}>
//                             <div className={styles.playback_timeline}>
//                                 <div className={styles.playback_timeline_time_passed}>
//                                     <span className={styles.visually_hidden}>Current time: 0 seconds</span>
//                                     <span>{currTime.min}:{currTime.sec}</span>
//                                 </div>
//                                 <div className={styles.playback_timeline_progress_wrapper}>
//                                     <input
//                                         type="range"
//                                         min="0"
//                                         max={duration / 1000}
//                                         default="0"
//                                         value={seconds}
//                                         className={styles.playback_timeline_progress_background}
//                                         onChange={(e) => {
//                                             sound.seek([e.target.value]);
//                                         }}
//                                     />
//                                     <div className={styles.playback_timeline_progress_bar} style={
//                                         {
//                                             minWidth: "0px", width: "0%"
//                                         }
//                                     }></div>
//                                     <div className={styles.playback_timeline_progress_handle} style={
//                                         {left: "0%"}
//                                     }></div>
//                                 </div>
//                                 <div className={styles.playback_timeline_duration}>
//                                     <span className={styles.visually_hidden}></span>
//                                     <span aria-hidden={true}>{time.min}:{time.sec}</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={styles.play_controls_cast_control}></div>
//                         <div className={styles.play_controls_volume}>
//                             <div className={styles.volume}>
//                                 <div className={styles.visually_hidden}></div>
//                                 <div className={styles.volume_icon_wrapper}>
//                                     <button type={"button"} className={styles.volume_icon}></button>
//                                 </div>
//                                 <div className={styles.sc_hidden}>Use shift and the arrow up and down keys to change the volume.</div>
//                                 <div className={styles.volume_slider_wrapper} role={"slider"} aria-valuemin={0} aria-valuemax={1} aria-valuenow={1}>
//                                     <div className={styles.volume_slider_background}></div>
//                                     <div className={styles.volume_slider_progress} style={{
//                                         height: "92px"
//                                     }}></div>
//                                     <div className={styles.volume_slider_handle} style={{
//                                         top: "10px"
//                                     }}></div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={styles.play_controls_sound_badge}>
//                             <div className={styles.playback_sound_badge}>
//                                 <Link to={"/"} className={styles.playback_sound_badge_link}>
//                                     <div className={styles.sc_media_image}>
//                                         <span className={styles.image_full}></span>
//                                     </div>
//                                 </Link>
//                                 <div className={styles.playback_sound_badge_title_context_container}>
//                                     <Link to={"/"} className={styles.playback_sound_badge_light_link}>Shiitake Products</Link>
//                                 </div>
//                                 <div className={styles.playback_sound_badge_title}>
//                                     <Link to={"/"} className={styles.playback_sound_badge_title_link}>
//                                         <span className={styles.visually_hidden}></span>
//                                         <span aria-hidden={true}>{selectedTrack?.title || "No Track Selected"}</span>
//                                     </Link>
//                                 </div>
//                                 <div className={styles.playback_sound_badge_actions}>
//                                     <button type={"button"} className={styles.sc_button_icon}>Like</button>
//                                     <button type={"button"} className={styles.sc_button_follow}>Follow</button>
//                                     <Link to={"/"} className={styles.playback_sound_badge_action_link}></Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                 </div>
//             </section>
//         </div>
//     );
// }
//
// export default MiniPlayer;