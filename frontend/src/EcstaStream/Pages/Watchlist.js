import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getWatchlistDetails } from "../lib/ec-api";

import NotFound from "./NotFound";
import SearchBar from "../Components/UI/SearchBar";
import MoviePosterCard from "../Components/Playlists/Cards/MoviePosterCard";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import MovieCardDropdown from "../Components/UI/Card/Dropdown/MovieCardDropdown";
import DeleteButton from "../Components/Playlists/UI/DeleteButton";

const Watchlist = () => {
    const { sendRequest, status, data: playlistDetails, error } = useHttp(getWatchlistDetails, true);

    const params = useParams();
    const {id} = params;
    
    const [showDetails, setShowDetails] = useState(false);
    const [getData, setData] = useState([]); 
    const [getReload, setReload] = useState(false);

    useEffect(() => {
        sendRequest(params);
    }, [sendRequest, params]);

    const handleClick = (e, id, media_type) => {
        e.preventDefault();
        const info={id, media_type}
        setShowDetails(true);
        setData(info);
    }

    if (status === 'pending') {
        <LoadingSpinner />
    }

    if (error) {
        return <NotFound/>
    }

    const optionsButton = "h-full w-1/3 text-sm mx-2 hover:text-ec-purple-text";

    if (status === 'completed') {
        const media = playlistDetails.watchlist_data;

        return (
            <Fragment>
                <div className="w-full h-full mx-auto pt-5 overflow-hidden">
                    <div id="topSection" className="w-full h-48 grid grid-cols-2 border-solid border-white mb-8">
                        <div className="w-full h-full py-3 col-span-1">
                            <div className="h-1/4">
                                <div className="text-2xl my-auto mr-2 float-left font-bold">
                                    Watchlist
                                </div>
                                <div className="h-10 text-xs my-auto float-left py-3 ml-2">
                                    | {playlistDetails.username} | # Following
                                </div>
                            </div>

                            <div className="h-1/2 p-2">
                                {playlistDetails.description}
                            </div>
                            
                            <div id="options" className="w-1/3 h-1/4 flex pl-2 justify-between">
                                <button className={optionsButton}>Edit</button>
                                <button className={optionsButton}>Share</button>
                                <button className={optionsButton}>Options</button>
                            </div>
                        </div>

                        <div className="col-span-1">

                        </div>
                    </div>

                    <div id="info" className="w-full h-full mx-auto flex">

                        <div id="search" className="w-1/3 h-full px-4 flex flex-col">
                            <h1 className="text-center my-3">Add To List:</h1>
                            <SearchBar listID={playlistDetails.ec_playlist_id} />
                        </div>

                        <div id="infoSection" className="w-2/3 h-full">
                            <div id="filter" className="w-2/3 h-16 float-right flex mx-2 justify-between">
                                <button>Movies</button>
                                <button>TV</button>
                                <button>Genres</button>
                                <button>My Services</button>
                            </div>

                            <div className="w-full relative overflow-y-scroll scroll-smooth scrollbar overflow-y scrollbar-width:thin scrollbar-thumb-ec-orange scrollbar-track-transparent">
                                <ul 
                                    id="list" 
                                    className="w-full h-2/3 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-1 gap-1"
                                >
                                    { media !== null && media.map(item => { 
                                        return (
                                            <li 
                                                className="group flex-shrink-0 w-36 mt-2 h-42 rounded-md" 
                                                onClick={(e) => handleClick(e, item.pl_mov_show_id, item.media_type)} 
                                                key={item.pl_mov_show_id} 
                                            >
                                                <br/>
                                                <MoviePosterCard key={item.pl_mov_show_id} item={item} />
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
                    </div>
                </div>
            </Fragment>
        );
    }
};

export default Watchlist;