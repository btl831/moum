import AlertSong from './AlertSong'
import { Figure } from 'react-bootstrap';

export default function Recommend() {
    return (
        <Figure className="mt-3">
            <Figure.Image
            width={180}
            height={180}
            alt="180x180"
            src="https://i.ytimg.com/vi/tHmc2mAXZSA/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDLny-RWs_I2o50OjZfWAA1vyNHRg"
            
            // 미구현
            onClick = {()=>{<AlertSong />}}
            />
            <Figure.Caption>
                [Playlist] J-POP 입문은 이 밴드로! 2021 요루시카 노래 모음 Yorushika songs ヨルシカ (15곡)
            </Figure.Caption>
        </Figure>
    );
}