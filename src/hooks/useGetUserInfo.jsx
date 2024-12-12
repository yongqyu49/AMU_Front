import {useEffect, useState} from "react";
import axios from "axios";

const useGetUserInfo = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:8787/user/current", {
                withCredentials: true,
            })
            .then((response) => {
                setUserInfo(response.data);
            })
            .catch((err) => {
                console.error("Failed to fetch user info:", err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return { userInfo, isLoading };
};

export default useGetUserInfo;
