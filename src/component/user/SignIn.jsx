import {useState} from "react";
import axios from "axios";

const SignIn = () => {

    const [formData, setFormData] = useState({
        id: '',
        password: '',
    });

    const handleChange = (e) => {
        const newFormData = {
            ...formData,
            [e.target.name]: e.target.value
        };
        setFormData(newFormData);
        console.log(newFormData);
    };


    const doSignIn = (e) => {
        e.preventDefault();
        console.log("로그인 시도:", formData);

        axios.post("http://localhost:8787/user/signIn", formData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        })
            .then(response => {
                console.log("로그인 성공:", response);
                alert("로그인 성공!");
                window.location.href = "/";
            })
            .catch(error => {
                console.error("로그인 실패:", error);
                if (error.response && error.response.data) {
                    alert(`로그인 중 오류가 발생했습니다: ${error.response.data}`);
                } else {
                    alert("로그인 중 오류가 발생했습니다.");
                }
            });
    }

    return (
        <div>
            <form onSubmit={doSignIn} style={{paddingTop: "100px"}}>
                <input type={"text"} name={"id"} placeholder={"id"} onChange={handleChange} />
                <input type={"password"} name={"password"} placeholder={"password"} onChange={handleChange} />
                <button type={"submit"}>Login</button>
            </form>
        </div>
    );
}

export default SignIn;