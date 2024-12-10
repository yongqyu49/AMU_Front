import {useState} from "react";
import axios from "axios";
import styles from '../../css/Signln.module.css';

const SignIn = ({ isOpen, onClose }) => {

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

    if (!isOpen) return null; // 모달이 열리지 않았으면 렌더링하지 않음

    return (
            <div>
                <form onSubmit={doSignIn}>
                    <div className={styles.modal}>
                        <div className={styles.container}>
                            <button className={styles.modal_close_button} onClick={onClose}></button>
                            <div className={styles.scontainer}>
                                <div className={styles.providerButtons}>
                                    <div className={styles.form_row} style={{
                                        backgroundColor: "#3578e5"
                                    }}>
                                        <button className={styles.buttons_text} style={{color: "white"}}>Continue with
                                            Facebook
                                        </button>
                                    </div>
                                    <div className={styles.form_row}>
                                        <button className={styles.buttons_text}>Continue with Google</button>
                                    </div>
                                    <div className={styles.form_row} style={{backgroundColor: "black"}}>
                                        <button className={styles.buttons_text} style={{color: "white"}}>Continue with
                                            Apple
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.auth_method_separator}>
                                    <span>-------- or --------</span>
                                </div>
                                <div className={styles.form_row}>
                                    <input type={"text"} name={"id"} className={styles.login_email} onChange={handleChange}
                                           placeholder={"ID"} required/>
                                </div>
                                <div className={styles.form_row}>
                                    <input type={"password"} name={"password"} className={styles.login_email}
                                           onChange={handleChange} placeholder={"PW"} required/>
                                </div>
                                <div className={styles.form_buttons}>
                                    <button type={"submit"} className={styles.buttons_text} style={{
                                        color: "white"
                                    }}>Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
    );
}

export default SignIn;