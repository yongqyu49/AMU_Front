import styles from '../css/Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className={styles.header_container}>
            <div className={styles.header_row}>
                <Link to="/" className={styles.header_logo} />
                <form name="searchform" action="" id="search">
                    <div className={styles.search_holder}>
                        <input type="text" className={styles.search_input} id={styles.searchQuery} placeholder="파일, 음악 동영상, 사진을 검색하세요…" maxLength="200" autoComplete="off" />
                        <button id={styles.doSearch} type="button" className={styles.search_button} aria-label="Search button"></button>
                    </div>
                </form>
                <div className={styles.header_buttons_holder}>
                    <Link to="/login" className={styles.head_elem}>로그인</Link>
                    <Link to="/signup" className={styles.head_elem}>회원가입</Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
