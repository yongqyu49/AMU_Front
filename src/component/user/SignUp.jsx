import { useState } from "react";
import axios from "axios";

const SignUp = () => {
    const [formData, setFormData] = useState({
        id: '',
        password: '',
        password_check: '',
        artist: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        console.log(formData);
    };

    const goSignUp = (e) => {
        e.preventDefault();
        if (formData.password !== formData.password_check) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        axios.post("http://localhost:8787/user/signUp", formData)
            .then(response => {
                alert("회원가입 성공! 로그인 페이지로 이동합니다.");
                // 예: 로그인 페이지로 리다이렉션
                window.location.href = "/signIn";
            })
            .catch(error => {
                alert("회원가입 중 오류가 발생했습니다.");
                console.error(error);
            });
    };

    return (
        <div>
            <form onSubmit={goSignUp}>
                <input type={"text"} placeholder={"id"} onChange={handleChange} name={"id"} required/><br/>
                <input type={"password"} placeholder={"password"} onChange={handleChange} name={"password"} required/><br/>
                <input type={"password"} placeholder={"password check"} onChange={handleChange} name={"password_check"} required/><br/>
                <input type={"text"} placeholder={"artist name"} onChange={handleChange} name={"artist"} required/><br/>
                <button type={"submit"}>Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;