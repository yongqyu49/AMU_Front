import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
    const [trackList, setTrackList] = useState([]);

    // 재생목록 초기화
    const fetchPlaylist = async () => {
        try {
            console.log("fetchPlaylist called");
            const response = await axios.get("http://localhost:8787/playlist/getPlaylist", { withCredentials: true });
            setTrackList(response.data);
            console.log("Updated playlist fetched:", response.data);
        } catch (error) {
            console.error("Failed to fetch playlist:", error);
        }
    };

    useEffect(() => {
        console.log("PlaylistProvider mounted, fetching initial playlist...");
        fetchPlaylist();
    }, []);

    return (
        <PlaylistContext.Provider value={{ trackList, setTrackList, fetchPlaylist }}>
            {children}
        </PlaylistContext.Provider>
    );
};

export const usePlaylist = () => {
    return useContext(PlaylistContext);
};
