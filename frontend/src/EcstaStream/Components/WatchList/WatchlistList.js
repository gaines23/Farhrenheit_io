import { Fragment, useState } from "react";
import { useWatchlistData } from "../../store/WatchlistContext";

import PosterCardDropdown from "../UI/Card/Dropdown/PosterCardDropdown";
import PosterCard from "../Playlists/Cards/PosterCard";

const WatchListList = () => {
    const getList = useWatchlistData();

    const [showDetails, setShowDetails] = useState(false);
    const [getData, setData] = useState([]); 

    // Handles poster card dropdown by id and media
    const handleClick = (e, id, media_type, wl_data_id, watchlist_id) => {
        e.preventDefault();
        const info={id, media_type, wl_data_id, watchlist_id}
        setShowDetails(true);
        setData(info);
    }
    
    return (
        <Fragment>
            { showDetails && (
                <PosterCardDropdown 
                    key={getData.id}
                    setShowDetails={setShowDetails}
                    id={getData.id}
                    media_type={getData.media_type}
                    playlist={"watchlist"}
                    pl_data_id={getData.wl_data_id}
                    playlist_id={getData.watchlist_id}
                />
            )}
            <div id="infoSection" className="w-2/3 h-5/6">
                <div id="filter" className="w-2/3 h-12 float-right flex px-2 justify-between">
                    {/* add genres to data {} and streaming (?) */}
                    <button>Movies</button>
                    <button>TV</button>
                    <button>Genres</button>
                    <button>My Services</button>
                </div>

                <div className="w-full h-5/6 relative overflow-auto overflow-y-scroll scroll-smooth scrollbar overflow-y scrollbar-width:thin scrollbar-thumb-ec-orange scrollbar-track-transparent">
                    { !showDetails && <>
                        <ul 
                            id="list" 
                            className="w-full h-full px-2 gap-2 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                        >
                            { getList !== null && getList.map(item => { 
                                return (
                                    <li 
                                        className="group flex-shrink-0 w-36 h-42 rounded-md" 
                                        onClick={(e) => handleClick(e, item.wl_mov_show_id, item.media_type, item.wl_data_id, item.watchlist_id)} 
                                        key={item.wl_mov_show_id} 
                                    >
                                        <br />
                                        <PosterCard key={item.wl_mov_show_id} item={item} mediaId={item.wl_mov_show_id} />
                                    </li>
                                );
                            })}
                        </ul>
                    </>}
                </div>
            </div>
        </Fragment>
    );
}

export default WatchListList;

