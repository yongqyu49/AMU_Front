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
    });
    const [fileMp3, setFile1] = useState(null);
    const [fileImg, setFile2] = useState(null);

    const handleMp3Change = (e) => {
        const selectedFile = e.target.files[0];
        setFile1(selectedFile);
        console.log(selectedFile)
    };

    const handleImgChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile2(selectedFile);
        console.log(selectedFile)
    };

    const handleChange = (e) => {
        const newFormData = {
            ...formData,
            [e.target.name]:e.target.value,
        };
        setFormData(newFormData);
        console.log(newFormData);
    };

    const goUpload = async (e) => {
        e.preventDefault();

        if(!fileMp3 || !fileImg){
            alert("파일을 입력해주세요");
            return;
        }

        const fileSize = fileMp3.size.toString();

        const uploadDir1 = "C:/amuUploads/music/";
        const uploadDir2 = "C:/amuUploads/mainImg/";

        const filePath1 = `${uploadDir1}${fileMp3.name}`;
        const filePath2 = `${uploadDir2}${fileImg.name}`;

        let playTime = 0;
        if (fileMp3.type.startsWith("audio/")) {
            const audio = new Audio(URL.createObjectURL(fileMp3)); //URL을 임시적으로 DOMString으로 변환
            await new Promise((resolve) => { //비동기 작업을 위한 Promise 사용
                audio.addEventListener("loadedmetadata", () => { //오디오의 메타데이터가 로드된 후 실행
                    playTime = audio.duration; // 재생 길이 (초 단위)
                    resolve(); //Promise를 성공상태로 전환
                });
            });
        }

        const formDataToSend = new FormData(); //폼데이타 생성
        formDataToSend.append('fileMp3', fileMp3);
        formDataToSend.append('fileImg', fileImg);
        formDataToSend.append('fileSize', fileSize); //음악파일 크기
        formDataToSend.append('filePath1', filePath1); //음악파일 경로
        formDataToSend.append('filePath2', filePath2); //이미지 경로
        formDataToSend.append('playTime', playTime); //재생길이

        Object.entries(formData).forEach(([key, value]) => { //file데이터와 text데이터 같이 백에 전달
            formDataToSend.append(key, value); // 나머지 필드 추가
        });
        console.log("업로드1", formData);
        console.log("업로드 파일: ")
        for (let [key, value] of formDataToSend.entries()) {
            console.log(key, value);
        }

        try{
            const response = await axios.post("http://localhost:8787/music/upload", formDataToSend, {
                headers:{
                    'Content-Type': "multipart/form-data",
                }
            });
            const result = response.data;
            console.log("업로드 성공: ", result);
        }catch(error) {
            console.error("업로드 실패: ", error)
        }
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
                    <input type={"file"} accept={"audio/*"} name={"mp3"} onChange={handleMp3Change} required/>
                    <input type={"file"} accept={"image/*"} name={"image"} onChange={handleImgChange} required/>
                </div>
                <div>
                    <br/><button type={"submit"}>Upload</button>
                </div>
                <div>
                    <h3></h3>
                    <pre className={styles.test}>{formData.lyrics}</pre>
                </div>
            </form>
        </>
    );
};

export default Upload;
