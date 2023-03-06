import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getWatchlistDetails } from "../lib/ec-api";

import NotFound from "./NotFound";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import SearchBar from "../Components/Playlists/UI/SearchBar";
import { PlaylistProvider } from "../store/PlaylistContext";
import PlaylistList from "../Components/Playlists/PlaylistList";

const Watchlist = () => {
    const params = useParams();
    const {id} = params;
    const [getData, setData] = useState([]);

    const { sendRequest, status, data: playlistDetails, error } = useHttp(getWatchlistDetails, true);

    useEffect(() => {
        sendRequest(params);
    }, [sendRequest, params]);

    useEffect(() => {
        if (status === 'completed') {
            setData(playlistDetails.watchlist_info);
        }
    }, [playlistDetails]);
        
    if (status === 'pending') {
        <LoadingSpinner />
    }

    if (error) {
        return <NotFound/>
    }

    const optionsButton = "h-full w-1/3 text-sm mx-2 hover:text-ec-purple-text";

    if (status === 'completed') {
        const listId = playlistDetails.ec_playlist_id;

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
                                Start adding movies or shows you want to finally get around to watching!
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
                    
                    <div id="info" className="w-full h-5/6 mx-auto flex">
                        <PlaylistProvider getData={{getData}}>
                            <SearchBar listId={listId} />
                            <PlaylistList />
                        </PlaylistProvider>
                    </div>

                </div>
            </Fragment>
        );
    }
};

export default Watchlist;