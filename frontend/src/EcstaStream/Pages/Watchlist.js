import { Fragment, useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import { getWatchlistDetails } from "../lib/ec-api";

import NotFound from "./NotFound";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import { WatchlistProvider } from "../store/WatchlistContext";
import WatchlistList from "../Components/WatchList/WatchlistList";
import WatchListSearch from "../Components/WatchList/WatchlistSearch";

const Watchlist = () => {
    const [getData, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { sendRequest, status, data: playlistDetails, error } = useHttp(getWatchlistDetails, true);

    useEffect(() => {
        setIsLoading(true);
        sendRequest();
    }, [sendRequest, setIsLoading]);

    useEffect(() => {
        setIsLoading(true)
        if (status === 'completed') {
            setData(playlistDetails.watchlist_info);
            setIsLoading(false);
        }
    }, [playlistDetails]);

    if (error) {
        return <NotFound/>
    }

    const optionsButton = "h-full w-1/3 text-sm mx-2 hover:text-ec-purple-text";

    if (status === 'completed') {
        const listId = playlistDetails.watchlist_id;

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

                    { isLoading && <LoadingSpinner /> }
                    
                    <div id="info" className="w-full h-5/6 mx-auto flex">
                        { !isLoading && <>
                            <WatchlistProvider getData={{getData}}>
                                <WatchListSearch listId={listId} />
                                <WatchlistList />
                            </WatchlistProvider>
                        </>}
                    </div>

                </div>
            </Fragment>
        );
    }
};

export default Watchlist;