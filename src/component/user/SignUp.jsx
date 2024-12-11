import { useState } from "react";
import axios from "axios";
import styles from "../../css/Signln.module.css";

const SignUp = ({ isOpen1, onClose1, openSignIn }) => {
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

    if (!isOpen1) return null; // 모달이 열리지 않았으면 렌더링하지 않음

    const goSignUp = (e) => {
        e.preventDefault();
        if (formData.password !== formData.password_check) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        axios.post("http://localhost:8787/user/signUp", formData)
            .then(response => {
                alert("회원가입 성공! 로그인 페이지로 이동합니다.");
                onClose1();
                openSignIn();
            })
            .catch(error => {
                alert("회원가입 중 오류가 발생했습니다.");
                console.error(error);
            });
    };



    return (
        <div>
            <form onSubmit={goSignUp}>
                <div className={styles.modal}>
                    <div className={styles.container}>
                        <button className={styles.modal_close_button} onClick={onClose1}></button>
                        <div className={styles.scontainer}>
                            <div className={styles.form_row}>
                                <input type={"text"} name={"id"} className={styles.login_email}
                                       onChange={handleChange} placeholder={"ID"} required/>
                            </div>
                            <div className={styles.form_row}>
                                <input type={"password"} name={"password"} className={styles.login_email}
                                       onChange={handleChange} placeholder={"PW"} required/>
                            </div>
                            <div className={styles.form_row}>
                                <input type={"password"} name={"password_check"} className={styles.login_email}
                                       onChange={handleChange} placeholder={"password check"} required/>
                            </div>
                            <div className={styles.form_row}>
                                <input type={"text"} name={"artist"} className={styles.login_email}
                                       onChange={handleChange} placeholder={"artist name"} required/>
                            </div>
                            <div className={styles.form_buttons}>
                                <button type={"submit"} className={styles.buttons_text} style={{
                                    color: "white"
                                }}>Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        // <div>
        //     <form onSubmit={goSignUp}>
        //         <input type={"text"} placeholder={"id"} onChange={handleChange} name={"id"} required/><br/>
        //         <input type={"password"} placeholder={"password"} onChange={handleChange} name={"password"} required/><br/>
    //         <input type={"password"} placeholder={"password check"} onChange={handleChange} name={"password_check"}
    //                required/><br/>
    //         <input type={"text"} placeholder={"artist name"} onChange={handleChange} name={"artist"} required/><br/>
    //         <button type={"submit"}>Sign Up</button>
    //     </form>
    // </div>
)
    ;
}

export default SignUp;