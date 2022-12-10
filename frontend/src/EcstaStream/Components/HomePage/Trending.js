import { Fragment, useEffect, useState } from 'react';

import PosterCard from "../UI/Card/PosterCard";
import TvCardDropdown from "../UI/Card/Dropdown/TvCardDropdown";
import MovieCardDropdown from "../UI/Card/Dropdown/MovieCardDropdown";

import { TRENDING_TMBD } from "../../lib/constants";

const Trending = () => {
    const [trending, setTrending] = useState([]);

    const [showDetails, setShowDetails] = useState(false);
    const [cardInfo, setCardInfo] = useState([]);

// Have to add useRef for current card location

    const handleClick = async (e, id, media) => {
        e.preventDefault();

        const info = {id, media};
        setShowDetails(true);
        setCardInfo(info);
    }
    
    useEffect(() => {
        fetchTrending();
    }, []);


    const fetchTrending = async () => {
        const data = await fetch(TRENDING_TMBD);
        const items = await data.json();
        setTrending(items.results);
    };

    return (
        <Fragment>
            <div className="mt-10">
                <p className="w-full text-lg">Trending ({trending.length})</p>
                <div
                    className="h-full flex items-center px-5 py-1 overflow-x-auto space-x-3 scroll-smooth scrollbar scrollbar-width:thin scrollbar-thumb-ec-orange scrollbar-track-transparent"
                >
                    {trending.map(item => {
                        return (
                            <div onClick={(e) => handleClick(e, item.id, item.media_type)} key={item.id}>
                                <PosterCard key={item.id} item={item} />
                            </div>
                        );
                    }).slice(0,5)}
                </div>
                    {(showDetails && cardInfo.media === 'tv') && (
                        <TvCardDropdown key={cardInfo.id} setShowDetails={setShowDetails} id={cardInfo.id} />
                    )}
                    {(showDetails && cardInfo.media === 'movie') && (
                        <MovieCardDropdown key={cardInfo.id} setShowDetails={setShowDetails} id={cardInfo.id} />
                    )}
            </div>
                    
        </Fragment>
    );
};

export default Trending;