import { useEffect, useState } from "react";
import axios from "axios";

const useGetUserInfo = () => {
    const [userInfo, setUserInfo] = useState(null); // null로 초기화

    useEffect(() => {
        // 사용자 정보 가져오기
        axios
            .get("http://localhost:8787/user/current", {
                withCredentials: true,
            })
            .then((response) => {
                console.log("User info fetched:", response.data); // 로그로 확인
                setUserInfo(response.data);
            })
            .catch((err) => {
                console.error("Failed to fetch user info:", err);
            });
    }, []);

    return userInfo;
};

export default useGetUserInfo;
