import styles from '../css/Upload.module.css'
import React, {useState} from "react";
import axios from "axios";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const Upload = () => {
    const [empty, setEmpty] = useState("none");
    const [myGenre, setMyGenre] = useState("Genre");
    const handleGenre = (eventKey) => {
        setMyGenre(eventKey);
        if (eventKey === "POP") {
            eventKey = 1
            setEmpty("");
        } else if (eventKey === "Hip-hop") {
            eventKey = 2
            setEmpty("");
        } else if (eventKey === "Ballad") {
            eventKey = 3
            setEmpty("");
        } else if (eventKey === "Indie") {
            eventKey = 4
            setEmpty("");
        } else if (eventKey === "R&B") {
            eventKey = 5
            setEmpty("");
        } else {
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
            [e.target.name]: e.target.value,
        };
        setFormData(newFormData);
        console.log(newFormData);
    };

    const goUpload = async (e) => {
        e.preventDefault();

        if (!fileMp3 || !fileImg) {
            alert("파일을 입력해주세요");
            return;
        }
        if (empty === "none") {
            alert("장르를 선택해주세요");
            return;
        }

        const fileSize = fileMp3.size.toString();

        const uploadDir1 = "C:/AMU_asset/AMU_Img/";
        const uploadDir2 = "C:/AMU_asset/AMU_Music/";

        const filePath1 = `${uploadDir1}${fileMp3.name}`;
        const filePath2 = `${uploadDir2}${fileImg.name}`;

        let playTime = 0;
        if (fileMp3.type.startsWith("audio/")) {
            const audio = new Audio(URL.createObjectURL(fileMp3));
            await new Promise((resolve) => {
                audio.addEventListener("loadedmetadata", () => {
                    playTime = Math.round(audio.duration);
                    resolve();
                });
            });
        }

        const formDataToSend = new FormData();
        formDataToSend.append('fileMp3', fileMp3);
        formDataToSend.append('fileImg', fileImg);
        formDataToSend.append("fileSize", fileSize);
        formDataToSend.append("filePath1", filePath1);
        formDataToSend.append("filePath2", filePath2);
        formDataToSend.append("playTime", playTime);

        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });
        console.log("업로드1", formData);
        console.log("업로드 파일: ")
        for (let [key, value] of formDataToSend.entries()) {
            console.log(key, value);
            console.log();
        }

        try {
            const response = await axios.post("http://localhost:8787/music/upload", formDataToSend, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            const result = response.data;
            console.log("업로드 성공 front: ", result);
        } catch (error) {
            console.error("업로드 실패 front: ", error)
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={goUpload} className={styles.formContainer}>
                <div className={styles.title}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Song Title"
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.genre}>
                    <DropdownButton
                        id="dropdown-genre-button"
                        title={myGenre}
                        size="sm"
                        variant="light"
                        name="genre"
                        onSelect={handleGenre}
                        className={styles.genreDropdown}
                    >
                        <Dropdown.Item eventKey="팝">POP</Dropdown.Item>
                        <Dropdown.Item eventKey="힙합">Hip-hop</Dropdown.Item>
                        <Dropdown.Item eventKey="발라드">Ballad</Dropdown.Item>
                        <Dropdown.Item eventKey="인디">Indie</Dropdown.Item>
                        <Dropdown.Item eventKey="R&B">R&B</Dropdown.Item>
                    </DropdownButton>
                </div>

                <div>
            <textarea
                name="lyrics"
                placeholder="Input Lyrics here"
                rows="6"
                onChange={handleChange}
                className={styles.lyrics}
                required
            />
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
                            accept="audio/*"
                            name="mp3"
                            onChange={handleMp3Change}
                            required
                        />
                    </div>

                    <div className={styles.fileInputWrapper}>
                        <div className={styles.fileInputIcon}>💿</div>
                        <div className={styles.fileInputText}>Upload your image files</div>
                        <input
                            type="file"
                            accept="image/*"
                            name="image"
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
    );
};

export default Upload;
