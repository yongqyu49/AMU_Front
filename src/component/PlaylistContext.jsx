import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
    const [trackList, setTrackList] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null); // 선택된 노래 상태 관리
    const [currentTime, setCurrentTime] = useState(0); // 현재 재생 시간
    const getId = () => localStorage.getItem("id"); // 로컬스토리지에서 id 가져오기

    const addTrack = (newTrack) => {
        const id = getId();
        if (!id) {
            console.warn("User ID is not set. Cannot save track to localStorage.");
            return;
        }
        if (!newTrack) return;

        const exists = trackList.some((track) => track.musicCode === newTrack.musicCode);
        if (!exists) {
            const updatedTrackList = [...trackList, newTrack];
            setTrackList(updatedTrackList);
            savePlaylistToLocalStorage(id, updatedTrackList);
            console.log("Track added and saved to localStorage:", newTrack);
        } else {
            console.log("Track already exists:", newTrack);
        }
    };

    const removeTrack = (trackToRemove) => {
        const id = getId();
        if (!id) return;

        // 로컬스토리지에서 재생 목록 가져오기
        const savedPlaylist = JSON.parse(localStorage.getItem(`playlist_${id}`)) || [];

        // 삭제할 트랙을 제외한 새로운 목록 생성
        const updatedTrackList = savedPlaylist.filter(
            (track) => track.musicCode !== trackToRemove.musicCode
        );

        // 로컬스토리지 업데이트
        localStorage.setItem(`playlist_${id}`, JSON.stringify(updatedTrackList));

        // 일정 시간 후 상태 업데이트
        setTimeout(() => {
            setTrackList(updatedTrackList);
            console.log("Track removed from localStorage and state:", trackToRemove);
        }, 300); // 300ms의 텀을 추가
    };


    const findIndex = (track) => {
        return trackList.findIndex((t) => t.musicCode === track?.musicCode);
    };

    const nextTrack = () => {
        const currentIndex = findIndex(selectedTrack);
        if (currentIndex >= 0 && currentIndex < trackList.length - 1) {
            const next = trackList[currentIndex + 1];
            setSelectedTrack(next);
        } else if (currentIndex === trackList.length - 1) {
            setSelectedTrack(trackList[0]);
        } else {
            console.log("No tracks available.");
        }
    };

    const previousTrack = () => {
        if (currentTime > 3) {
            // 3초 이상이면 현재 곡 처음부터 재생
            setCurrentTime(0);
        } else {
            // 3초 미만이면 이전 곡 재생
            const currentIndex = findIndex(selectedTrack);
            if (currentIndex > 0) {
                const prev = trackList[currentIndex - 1];
                setSelectedTrack(prev);
                setCurrentTime(0); // 재생 시간 초기화
            } else {
                console.log("No previous track available.");
            }
        }
    };

    // 재생목록 초기화
    const fetchPlaylist = async () => {
        if (selectedTrack?.musicCode) {
            const res = await axios.get(`http://localhost:8787/music/${selectedTrack.musicCode}`, { withCredentials: true });
            console.log(res.data);
            addTrack(res.data);
        }
    };

    useEffect(() => {
        // console.log("PlaylistProvider mounted, fetching initial playlist...");
        fetchPlaylist();
    }, [selectedTrack]);

    const savePlaylistToLocalStorage = (id, playlist) => {
        if (!id) {
            console.error("User ID is required to save the playlist.");
            return;
        }
        localStorage.setItem(`playlist_${id}`, JSON.stringify(playlist));
    };

    const getPlaylistFromLocalStorage = () => {
        const id = getId();
        const savedPlaylist = localStorage.getItem(`playlist_${id}`);
        return savedPlaylist ? JSON.parse(savedPlaylist) : [];
    };

    useEffect(() => {
        const savedPlaylist = getPlaylistFromLocalStorage();
        setTrackList(savedPlaylist); // 초기 로드 시 로컬스토리지 데이터 가져오기
    }, []);

    return (
        <PlaylistContext.Provider
            value={{
                trackList,
                setTrackList,
                selectedTrack,
                setSelectedTrack,
                nextTrack,
                previousTrack,
                addTrack,
                currentTime,
                setCurrentTime,
                removeTrack,
            }}
        >
            {children}
        </PlaylistContext.Provider>
    );
};

export const usePlaylist = () => {
    const context = useContext(PlaylistContext);
    if(!context) throw new Error("usePlaylist must be used within a PlaylistProvider");
    return context;
};

