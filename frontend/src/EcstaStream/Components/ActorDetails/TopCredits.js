import { Fragment, useState } from "react";

import TopCreditsCard from "../UI/Card/TopCreditsCard";
import MovieCardDropdown from "../UI/Card/Dropdown/PosterCardDropdown";
import TvCardDropdown from "../UI/Card/Dropdown/TvCardDropdown";

const TopCredits = ({credits, media}) => {
    const [showDetails, setShowDetails] = useState(false);
    const [cardInfo, setCardInfo] = useState([]);

    const handleClick = async (e, id, media) => {
        e.preventDefault();

        const info = {id, media};
        setShowDetails(true);
        setCardInfo(info);
    }


    return (
        <Fragment>
            <div className="mt-10 px-5">
                <p className="text-lg h-10 font-bold">Recognize Them?</p>
                <div
                    className="h-full flex items-center mx-5 py-1 overflow-x-auto space-x-3 scroll-smooth scrollbar scrollbar-width:thin scrollbar-thumb-ec-orange scrollbar-track-transparent"
                >
                    {credits.map(item => {
                        return (
                            <div onClick={(e) => handleClick(e, item.id, item.media_type)} key={item.id}>
                                <TopCreditsCard key={item.id} item={item} />
                            </div>
                        );
                    })}
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
}

export default TopCredits;