import { LazyLoadImage } from "react-lazy-load-image-component";

import 'react-lazy-load-image-component/src/effects/blur.css';

const generateArray = (items) => {
    return [...Array.from(Array(items).keys())]
}

function App() {

    return (
    <div>
        <h1><span>Lazy Loading Images</span> 🖼️</h1>

        <div className="container-images">
            {
                generateArray(15).map(i => {
                    return <LazyLoadImage
                        key={i}
                        src={`https://picsum.photos/id/${i}/500`}
                        alt={`Image Alt-${i}`}
                        className="img-lazy"
                        width={700} height={500}
                        placeholderSrc={process.env.PUBLIC_URL + '/loadingImage.png'}
                        effects='blur'                    
                    />
                })
            }
        </div>
    </div>
    );
}

export default App;
