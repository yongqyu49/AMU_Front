import React, {useState} from 'react';

function Main() {

    return (
        <>
        <div className="body">
            <div className="dropdown">
            </div>
            <div className="list">
                <div>
                    <img name="image"/>
                    <input type="file" name="file"/>
                </div>
                {/* 이미지 */}
                <div className=""> {/*제목, 게시일, 파일크기, 제작자, 장르, 조회수, 하트 수*/}
                    <table>
                    </table>
                </div>
            </div>
        </div>
        </>
    );
};

export default Main;