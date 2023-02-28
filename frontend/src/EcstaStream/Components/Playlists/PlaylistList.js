import { Fragment, useContext, useEffect, useState } from "react";
import useHttp from "../../../hooks/use-http";
import { getPlaylistData } from "../../lib/ec-api";
import { usePlaylistData, PlaylistDispatchContext } from "../../store/PlaylistContext";

import NotFound from "../../Pages/NotFound";
import MovieCardDropdown from "../UI/Card/Dropdown/MovieCardDropdown";
import LoadingSpinner from "../UI/LoadingSpinner";
import PosterCard from "./Cards/PosterCard";

const PlaylistList = () => {
    const data = usePlaylistData();
    
    const [showDetails, setShowDetails] = useState(false);
    const [getData, setData] = useState([]); 
    
    const handleClick = (e, id, media_type) => {
        e.preventDefault();
        const info={id, media_type}
        setShowDetails(true);
        setData(info);
    }
    
    console.log(data)

        return (
            <Fragment>
                <div id="infoSection" className="w-2/3 h-full">
                    <div id="filter" className="w-2/3 h-16 float-right flex mx-2 justify-between">
                        {/* add genres to data {} and streaming (?) */}
                        <button>Movies</button>
                        <button>TV</button>
                        <button>Genres</button>
                        <button>My Services</button>
                    </div>

                    <div className="w-full relative overflow-y-scroll scroll-smooth scrollbar overflow-y scrollbar-width:thin scrollbar-thumb-ec-orange scrollbar-track-transparent">
                        <ul 
                            id="list" 
                            className="w-full h-2/3 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 p-1 gap-2"
                        >
                            { data !== null && data.map(item => { 
                                return (
                                    <li 
                                        className="group flex-shrink-0 w-36 mt-2 h-42 rounded-md" 
                                        onClick={(e) => handleClick(e, item.pl_mov_show_id, item.media_type)} 
                                        key={item.pl_mov_show_id} 
                                    >
                                        <br/>
                                        <PosterCard key={item.pl_mov_show_id} item={item} />
                                    </li>
                                )}
                            )}
                        </ul>
                    </div>
                </div>

                { showDetails && (
                    <MovieCardDropdown 
                        key={getData.id}
                        setShowDetails={setShowDetails}
                        id={getData.id}
                        media_type={getData.media_type}
                    />
                )}
            </Fragment>
        );
    
}

export default PlaylistList;

