import Header from './Header';
import MiniPlayer from './MiniPlayer';

const Main = (props) => {

    return (
        <>
            <Header />
            <main style={{padding: '46px'}}>
                {props.children}
            </main>
            <MiniPlayer />
        </>
    );
}

export default Main;