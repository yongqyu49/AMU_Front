import Header from './Header';
import MiniPlayer from './MiniPlayer';
import props from "bootstrap/js/src/dom/selector-engine";

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