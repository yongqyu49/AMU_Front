import styles from '../css/Upload.module.css'
import {useState} from "react";
import axios from "axios";

const Upload = () => {
    const [formData, setFormData] = useState({
        title: '',
        lyrics: '',
        mp3: '',
        image: '',
    });

    const handleChange = (e) => {
        const newFormData = {
            ...formData,
            [e.target.name]: e.target.value
        };
        setFormData(newFormData);
        console.log(newFormData);
    };
    
    const goUpload = (e) => {
        e.preventDefault();
        console.log("업로드", formData);

        axios.post("http://localhost:8787/music/upload", formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log("뮤직 데이터 전송");
                alert("음악 업로드 완료");
                window.location.href = "/music/Contents.jsx";
            })
            .catch(error => {
                console.log("데이터 전송 실패: ", error);
            })
    }

    return (
        <> {/*제목, 가사, mp3파일, 이미지*/}
            <form onSubmit={goUpload}>
                <div className={styles.title}>
                    <input type={"text"} name={"title"} placeholder={"Title"} onChange={handleChange} required/>
                </div>
                <div className={styles.lyrics}>
                    <textarea name={"lyrics"} placeholder={"input Lyrics here"} rows="10" cols="40" onChange={handleChange} required/>
                </div>
                <div className={styles.box}>
                    <input type={"file"} accept={"audio/*"} name={"mp3"} onChange={handleChange} required/>
                    <input type={"file"} accept={"image/*"} name={"image"} onChange={handleChange} required/>
                </div>
                <div>
                    <br/><button type={"submit"}>Upload</button>
                </div>
            </form>
        </>
    );
};

export default Upload;