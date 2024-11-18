import styles from '../css/Upload.module.css'
import React, {useState} from "react";
import axios from "axios";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const Upload = () => {
    const [myGenre, setMyGenre] = useState("장르");
    const handleGenre = (eventKey) => {
        setMyGenre(eventKey);
        setFormData({
            ...formData,
            genre: eventKey
        })
        console.log(formData)
    }

    const [formData, setFormData] = useState({
        genre: myGenre,
        title: '',
        lyrics: '',
        mp3: '',
        image: '',
    });

    const handleChange = (e) => {
        const newFormData = {
            ...formData,
            [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value,
        };
        setFormData(newFormData);
        console.log(newFormData);
        console.log(newFormData.mp3)
        console.log(newFormData.image)
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
                <div>
                    <div className={styles.genre}> {/* 장르 */} {/*팝, 랩/힙합, 알앤비/소울, 일렉트로닉, 메탈, 재즈*/}
                        <DropdownButton
                            id="dropdown-genre-button"
                            title={myGenre}
                            size="sm"
                            variant="light"
                            name={"genre"}
                            onSelect={handleGenre}
                        >
                            <Dropdown.Item eventKey="팝">팝</Dropdown.Item>
                            <Dropdown.Item eventKey="힙합">힙합</Dropdown.Item>
                            <Dropdown.Item eventKey="발라드">발라드</Dropdown.Item>
                            <Dropdown.Item eventKey="인디">인디</Dropdown.Item>
                            <Dropdown.Item eventKey="R&B">R&B</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
                <div>
                    <textarea name={"lyrics"} placeholder={"input Lyrics here"} rows="100" cols="40"
                              onChange={handleChange} className={styles.lyrics} required/>
                </div>
                <div className={styles.box}>
                    <input type={"file"} accept={"audio/*"} name={"mp3"} onChange={handleChange} required/>
                    <input type={"file"} accept={"image/*"} name={"image"} onChange={handleChange} required/>
                </div>
                <div>
                    <br/><button type={"submit"}>Upload</button>
                </div>
                <div>
                    <h3>test</h3>
                    <pre className={styles.test}>{formData.lyrics}</pre>
                </div>
            </form>
        </>
    );
};

export default Upload;