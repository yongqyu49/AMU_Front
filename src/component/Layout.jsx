import Header from './Header';
import MiniPlayer from './MiniPlayer';
import React from 'react';

const Main = (props) => {
    // const [selectedTrack, setSelectedTrack] = useState(null); // 선택된 노래 상태 관리

    return (
        <>
            <Header />
            <main style={{ margin: "30px" }}>
                {props.children}
                {/*{React.cloneElement(, { setSelectedTrack })}*/}
            </main>
            <MiniPlayer/>
        </>
    );
};

export default Main;
