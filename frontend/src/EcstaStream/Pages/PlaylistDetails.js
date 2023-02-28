import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getPlaylistDetails } from "../lib/ec-api";

import NotFound from "./NotFound";
import SearchBar from "../Components/Playlists/UI/SearchBar";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import PlaylistList from "../Components/Playlists/PlaylistList";
import { PlaylistProvider } from "../store/PlaylistContext";


const PlaylistDetails = () => {
    const { sendRequest, status, data: playlistDetails, error } = useHttp(getPlaylistDetails, true);

    const params = useParams();
    const {id} = params;

    useEffect(() => {
        sendRequest(params);
    }, [sendRequest, params]);

    if (status === 'pending') {
        <LoadingSpinner />
    }

    if (error) {
        return <NotFound/>
    }

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
                    
                    <div id="info" className="w-full h-full mx-auto flex">
                        <PlaylistProvider id={playlistDetails.ec_playlist_id}>
                            <SearchBar />
                            <PlaylistList />
                        </PlaylistProvider>
                    </div>
                    
                </div>
            </Fragment>
        );
    }
}
export default PlaylistDetails;