import React, { useState } from "react";
import styles from "../../css/user/Modal.module.css";
import axios from "axios";

const Modal = ({ closeModal, userInfo }) => {
    const [formData, setFormData] = useState({
        artist: userInfo.artist,
        profileImg: userInfo.profileImg,
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [isModified, setIsModified] = useState(false); // 변경사항 여부

    // 변경사항이 발생하면 업데이트
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setIsModified(true); // 변경사항 발생
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setIsModified(true); // 파일 변경 시에도 변경사항 발생
        }
    };

    // Save Changes 버튼 클릭 시 처리
    const handleSaveChanges = (event) => {
        event.preventDefault();

        const updateData = new FormData();
        updateData.append("artist", formData.artist);

        if (selectedFile) {
            updateData.append("profileImg", selectedFile); // 파일 추가
        }

        axios
            .post("http://localhost:8787/user/updateProfile", updateData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            })
            .then((response) => {
                alert("프로필이 성공적으로 업데이트되었습니다.");
                closeModal(true); // closeModal 호출 시 새로고침 플래그 전달
            })
            .catch((error) => {
                console.error("프로필 업데이트 실패:", error);
                alert("업데이트 중 문제가 발생했습니다.");
            });
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modal_modal} style={{
                width: "850px",
                left: "54px",
                marginTop: "76px",
                height: "auto",
            }}>
                <div className={styles.modal_content}>
                    <button
                        type={"button"}
                        className={styles.modal_close_button}
                        onClick={closeModal} // 닫기 버튼 클릭 시 호출
                    >
                    </button>
                    <div className={styles.profile_settings}>
                        <h2 className={styles.g_modal_title}>Profile Settings</h2>
                        <form className={styles.profile_settings_form}>
                            <div className={styles.sc_media}>
                                <div className={styles.profile_settings_avatar}>
                                    <div className={styles.edit_image}>
                                        <div className={styles.edit_image_select}>
                                            <div className={styles.image_outline}>
                                                <span
                                                    className={styles.sc_artwork}
                                                    style={{
                                                        backgroundImage: selectedFile
                                                            ? `url(${URL.createObjectURL(selectedFile)})`
                                                        : `url(http://localhost:8787/${userInfo.profileImg})`,
                                                    }}
                                                />
                                            </div>
                                            <label className={styles.edit_image_button}>
                                                Update image
                                                <input
                                                    type="file"
                                                    style={{display: "none"}}
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.profile_settings_base_fields}>
                                    <div className={styles.profile_settings_cell}>
                                        <div className={styles.text_field}>
                                            <label
                                                className={styles.g_flex_row}
                                                htmlFor="artist"
                                            >
                                                <span className={styles.text_field_label}>
                                                    Display Artist Name
                                                </span>
                                            </label>
                                            <div className={styles.text_field_input}>
                                                <input
                                                    type="text"
                                                    className={styles.display_name}
                                                    name="artist"
                                                    value={formData.artist}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.profile_settings_cell}>
                                        <div className={styles.text_field}>
                                            <label className={styles.g_flex_row} htmlFor={"display_password"}>
                                                <span className={styles.text_field_label}>Password</span>
                                            </label>
                                            <div className={styles.text_field_input}>
                                                <input
                                                    type={"password"}
                                                    className={styles.display_name}
                                                    name={"display_password"}
                                                    onChange={handleFileChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.profile_settings_cell}>
                                        <div className={styles.text_field}>
                                            <label className={styles.g_flex_row} htmlFor={"display_confirm_password"}>
                                                <span className={styles.text_field_label}>Confirm Password</span>
                                            </label>
                                            <div className={styles.text_field_input}>
                                                <input type={"password"} className={styles.display_name}
                                                       name={"display_confirm_password"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.profile_settings_form_buttons}>
                                <div></div>
                                <button type={"button"} className={styles.sc_button_cancel} onClick={closeModal}>Cancel</button>
                                <button
                                    type="submit"
                                    className={styles.sc_button_cta}
                                    onClick={handleSaveChanges}
                                    disabled={!isModified} // 변경사항이 없으면 비활성화
                                    style={{
                                        opacity: isModified ? 1 : 0.6,
                                        cursor: isModified ? "pointer" : "not-allowed",
                                    }}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Modal