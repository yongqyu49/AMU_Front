import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
    const [trackList, setTrackList] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null); // 선택된 노래 상태 관리

    // 재생목록 초기화
    const fetchPlaylist = async () => {
        if (selectedTrack?.musicCode) {
            try {
                await axios.post(
                    "http://localhost:8787/playlist/addMusic",
                    { musicCode: selectedTrack.musicCode },
                    { headers: { "Content-Type": "application/json" }, withCredentials: true }
                );
                alert("음악이 재생목록에 추가되었습니다.");
            } catch (error) {
                if (error.response?.status === 409) {
                    alert("이미 재생목록에 포함된 음악입니다.");
                } else {
                    console.error("Failed to add music:", error);
                }
            }
        }

        try {
            const response = await axios.get("http://localhost:8787/playlist/getPlaylist", { withCredentials: true });
            setTrackList(response.data);
        } catch (error) {
            console.error("Failed to fetch playlist:", error);
        }
    };


    useEffect(() => {
        // console.log("PlaylistProvider mounted, fetching initial playlist...");
        fetchPlaylist();
    }, [selectedTrack]);

    return (
        <PlaylistContext.Provider value={{ trackList, setTrackList, selectedTrack,setSelectedTrack  }}>
            {children}
        </PlaylistContext.Provider>
    );
};

export const usePlaylist = () => {
    const context = useContext(PlaylistContext);
    if(!context) throw new Error("usePlaylist must be used within a PlaylistProvider");
    return context;
};

