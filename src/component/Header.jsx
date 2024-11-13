import styles from '../css/Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.header_inner}>
                    <div className={styles.header_left}>
                        <div className={styles.header_logo}>
                            <Link to="/" className={styles.header_logo_link}/>
                        </div>
                        <nav className={styles.header_nav}>
                            <ul className={styles.header_nav_ul}>
                                <li className={styles.header_nav_li}>
                                    <Link to="/mainPage" className={styles.header_nav_link}>Home</Link>
                                </li>
                                <li className={styles.header_nav_li}>
                                    <Link to="/feed" className={styles.header_nav_link}>Feed</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className={styles.header_middle}>
                        <div className={styles.header_search} role="search">
                            <form className={styles.header_search_form}>
                                <input type="search" className={styles.header_search_input} placeholder="Search" />
                                <button type="button" className={styles.search_button}>Search</button>
                            </form>
                        </div>
                    </div>
                    <div className={styles.header_right}>
                        <div className={styles.header_upsell}>
                            <Link to="/upload" className={styles.upload_link}>Upload</Link>
                        </div>
                        <div className={styles.header_user_nav}>
                            <Link to="/signIn" className={styles.login_link}>Login</Link>
                            <Link to="/signUp" className={styles.signup_link}>Signup</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
