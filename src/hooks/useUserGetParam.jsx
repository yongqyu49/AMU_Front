import { useEffect, useState } from "react";
import axios from "axios";

const useGetUserGetParam = ({id}) => {
    const [userInfo, setUserInfo] = useState(null); // null로 초기화

    useEffect(() => {
        // 사용자 정보 가져오기
        axios
            .get(`http://localhost:8787/user/${id}`, {
                withCredentials: true,
            })
            .then((response) => {
                setUserInfo(response.data);
            })
            .catch((err) => {
                console.error("Failed to fetch user info:", err);
            });
    }, [id]);

    return userInfo;
};

export default useGetUserGetParam;
