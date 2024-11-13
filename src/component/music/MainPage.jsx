import Layout from '../Layout'
import styles from '../../css/music/MainPage.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const MainPage = () => {
    const listElement = document.getElementsByClassName('list_table');
    listElement.innerHTML = '<tr>\n' +
        '<th>' +
        '   <img src="image.jpg" alt="이미지" style="width: 50px; height: 50px;">' +
        '</th>' +
        '<th><></th>' +
        '</tr>'

    return (
        <>
            <div className={styles.container}>
                <div className={styles.drop_down}> {/* 드롭다운 바 */}
                    <div className={styles.drop1}> {/* 장르 */}
                        <DropdownButton
                        id="dropdown-genre-button"
                        title="장르"
                        size="sm"
                        variant="light">
                            <Dropdown.Item>genre1</Dropdown.Item>
                            <Dropdown.Item>genre2</Dropdown.Item>
                            <Dropdown.Item>genre3</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div className={styles.drop2}> {/* 노래 정렬 */}
                        <DropdownButton
                        id="dropdown-sort-button1"
                        title="이름순"
                        size="sm"
                        variant="light">
                            <Dropdown.Item>이름순</Dropdown.Item>
                            <Dropdown.Item>최신순</Dropdown.Item>
                            <Dropdown.Item>인기순</Dropdown.Item>
                            <Dropdown.Item>좋아요순</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div><br/>
                {/*<div> /!* 노래 목록 *!/*/}
                    <table className={styles.list_table}>
                        {/*이미지, 제목*/}
                        {/*노래정보[날짜, 파일크기, 제작자, 장르, 조회수, 하트수*/}
                        {/*다운로드 버튼*/}
                        {/*하트버튼*/}
                        {/*플레이리스트 추가 버튼*/}
                        <tr>

                        </tr>
                    </table>
                {/*</div>*/}
                <div className={styles.page}>

                </div>
            </div>
        </>
    );
}

export default MainPage;