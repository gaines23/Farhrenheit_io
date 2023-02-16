import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import { getPlaylistDetails } from "../lib/ec-api";
import NotFound from "./NotFound";
import SearchBar from "../Components/UI/SearchBar";
import PosterCard from "../Components/UI/Card/PosterCard";

const PlaylistDetails = () => {
    const params = useParams();
    const {id} = params;

    const [getData, setData] = useState([]); // just needs to send id and type

    const { sendRequest, status, data: playlistDetails, error } = useHttp(getPlaylistDetails, true);

    useEffect(() => {
        sendRequest(params);
    }, [sendRequest, params]);

    if (status === 'pending') {
        <LoadingSpinner />
    }

    if (error) {
        return <NotFound/>
    }

    console.log(playlistDetails)

    const optionsButton = "h-full w-1/3 text-sm mx-2 hover:text-ec-purple-text";

    if (status === 'completed') {
        return (
            <Fragment>
                <div className="w-full h-full mx-auto pt-5 overflow-hidden">
                    <div id="topSection" className="w-full h-48 grid grid-cols-2 border-solid border-white mb-8">
                        <div className="w-full h-full py-3 col-span-1">
                            <div className="h-1/4">
                                <div className="text-2xl my-auto mr-2 float-left font-bold">
                                    {playlistDetails.title} 
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

                    <div id="info" className="w-full h-full flex">

                        <div id="search" className="w-1/3 h-36">
                            <h1 className="text-center my-3">Add To List:</h1>
                            <SearchBar listID={playlistDetails.ec_playlist_id} />
                        </div>

                        <div id="infoSection" className="w-2/3">
                            <div id="filter" className="w-1/3 h-16 float-right flex mx-2 justify-between">
                                <button>Movies</button>
                                <button>TV</button>
                                <button>Genres</button>
                                <button>My Services</button>
                            </div>
                            <div id="list" className="grid grid-col-4 row-span-auto relative overflow-y-scroll overflow-hidden space-y-3 scroll-smooth scrollbar scrollbar-height:6 scrollbar-width:thin scrollbar-thumb-ec-orange scrollbar-track-transparent">
                                {playlistDetails.movies_shows.map(item => {
                                    return <PosterCard key={item.id} item={item}  />
                                })}
                            </div>
                        </div>

                    </div>
                    
                </div>
            </Fragment>
        );
    }
}

export default PlaylistDetails;