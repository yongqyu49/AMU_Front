import Header from './Header';
import Contents from './music/Contents';
import MainPage from './music/MainPage';
import MiniPlayer from './MiniPlayer';

const Main = () => {

    return (
        <>
            <Header />
            {/*<Contents />*/}
            {/*<MainPage/>*/}
            <Contents />
            <MiniPlayer />
        </>
    );
}

export default Main;