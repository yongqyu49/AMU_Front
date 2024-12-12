import { useState, useEffect } from "react";
import axios from "axios";

const usePlaylist = () => {
    const [trackList, setTrackList] = useState([]);

    // 서버에서 최신 재생목록 가져오기
    const fetchPlaylist = () => {
        axios.get("http://localhost:8787/playlist/getPlaylist", { withCredentials: true })
            .then(response => {
                setTrackList(response.data);
            })
            .catch(error => console.error("Failed to fetch playlist:", error));
    };

    useEffect(() => {
        fetchPlaylist(); // 초기 데이터 로드
    }, []);

    return { trackList, fetchPlaylist };
};

export default usePlaylist;
