import styles from '../css/Upload.module.css'
import React, {useState} from "react";
import axios from "axios";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const Upload = () => {
    const [empty, setEmpty] = useState("none");
    const [myGenre, setMyGenre] = useState("장르");
    const handleGenre = (eventKey) => {
        setMyGenre(eventKey);
        if(eventKey === "팝"){
            eventKey=1
            setEmpty("");
        }else if(eventKey === "힙합"){
            eventKey=2
            setEmpty("");
        }else if(eventKey === "발라드"){
            eventKey=3
            setEmpty("");
        }else if(eventKey === "인디"){
            eventKey=4
            setEmpty("");
        }else if(eventKey === "R&B"){
            eventKey=5
            setEmpty("");
        }else{
            setEmpty("none");
        }
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
        if(empty === "none"){
            alert("장르를 선택해주세요");
            return;
        }

        const fileSize = fileMp3.size.toString();

        // const uploadDir1 = "AMU_Music/";
        // const uploadDir2 = "AMU_Img/";

        const fileName1 = `${fileMp3.name}`;
        const fileName2 = `${fileImg.name}`;

        let playTime = 0;
        if (fileMp3.type.startsWith("audio/")) {
            const audio = new Audio(URL.createObjectURL(fileMp3)); //URL을 임시적으로 DOMString으로 변환
            await new Promise((resolve) => { //비동기 작업을 위한 Promise 사용
                audio.addEventListener("loadedmetadata", () => { //오디오의 메타데이터가 로드된 후 실행
                    playTime = Math.round(audio.duration); // 재생 길이 (초 단위)
                    resolve(); //Promise를 성공상태로 전환
                });
            });
        }

        const formDataToSend = new FormData(); //폼데이타 생성
        formDataToSend.append('fileMp3', fileMp3);
        formDataToSend.append('fileImg', fileImg);
        formDataToSend.append("fileSize", fileSize); //음악파일 크기
        formDataToSend.append("filePath1", fileName1); //음악파일 이름
        formDataToSend.append("filePath2", fileName2); //이미지 이름
        formDataToSend.append("playTime", playTime); //재생길이

        Object.entries(formData).forEach(([key, value]) => { //file데이터와 text데이터 같이 백에 전달
            formDataToSend.append(key, value); // 나머지 필드 추가
        });
        console.log("업로드1", formData);
        console.log("업로드 파일: ")
        for (let [key, value] of formDataToSend.entries()) {
            console.log(key, value);
        }

        try{
            console.log("업로드 시작");
            const response = await axios.post("http://localhost:8787/music/upload", formDataToSend, {
                withCredentials: true,  // 세션 공유
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            const result = response.data;
            console.log("업로드 성공 front: ", result);
        }catch(error) {
            console.error("업로드 실패 front: ", error)
        }
    }

    return (
        <>
            <div className={styles.container}>
                <form onSubmit={goUpload}>
                    <div className={styles.title}>
                        <input type={"text"} name={"title"} placeholder={"Title"} onChange={handleChange} required className={styles.input}/>
                    </div>
                    <div>
                        <div className={styles.genre}>
                            <DropdownButton
                                id="dropdown-genre-button"
                                title={myGenre}
                                size="sm"
                                variant="light"
                                name={"genre"}
                                onSelect={handleGenre}
                                className={styles.genreDropdown}
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
                        <textarea name={"lyrics"} placeholder={"input Lyrics here"} rows="6"
                                  onChange={handleChange} className={styles.lyrics} required/>
                    </div>
                    {/* Add text here */}
                    <div className={styles.fileSizeInfo}>
                        For best quality, use WAV, FLAC, AIFF, or ALAC. The maximum file size is 4GB uncompressed.
                    </div>

                    <div className={styles.fileInputs}>
                        <div className={styles.fileInputWrapper}>
                            <div className={styles.fileInputIcon}>🎵</div>
                            <div className={styles.fileInputText}>Upload your audio files</div>
                            <input
                                type="file"
                                accept={"audio/*"}
                                name={"mp3"}
                                onChange={handleMp3Change}
                                required
                            />
                        </div>

                        <div className={styles.fileInputWrapper}>
                            <div className={styles.fileInputIcon}>💿</div>
                            <div className={styles.fileInputText}>Upload your image files</div>
                            <input
                                type="file"
                                accept={"image/*"}
                                name={"image"}
                                onChange={handleImgChange}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.uploadBtnContainer}>
                        <button type="submit" className={styles.uploadBtn}>Upload</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Upload;