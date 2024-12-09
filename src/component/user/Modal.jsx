import styles from "../../css/user/Modal.module.css";

const Modal = ({ closeModal }) => {
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
                                                <span className={styles.sc_artwork}></span>
                                            </div>
                                            <button type={"button"} className={styles.edit_image_button}>Update image</button>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.profile_settings_base_fields}></div>
                            </div>
                            <div className={styles.profile_settings_form_buttons}></div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Modal;
