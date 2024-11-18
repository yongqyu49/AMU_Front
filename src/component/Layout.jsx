import Header from './Header';
import MiniPlayer from './MiniPlayer';

const Main = (props) => {

    return (
        <>
            <Header />
            <main>
                {props.children}
            </main>
            <MiniPlayer />
        </>
    );
}

export default Main;