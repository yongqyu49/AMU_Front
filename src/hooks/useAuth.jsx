import { useState, useEffect } from "react";
import axios from "axios";

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 현재 로그인된 사용자 정보 가져오기
        axios.get("http://localhost:8787/user/current", {
            withCredentials: true
        })
            .then(response => {
                if (response.data && response.data.id) {
                    setIsLoggedIn(true); // 로그인 상태 설정
                } else {
                    setIsLoggedIn(false);
                }
            })
            .catch(error => {
                setIsLoggedIn(false);
            });
    }, []);

    return isLoggedIn;
};

export default useAuth;
