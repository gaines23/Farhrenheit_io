import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import { getPlaylistDetails } from "../lib/ec-api";
import NotFound from "./NotFound";
import SearchBar from "../Components/UI/SearchBar";

const PlaylistDetails = () => {
    const params = useParams();
    const {id} = params;

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
                <div className="w-full h-full mx-auto pt-5">
                    <div id="topSection" className="w-full h-48 grid grid-cols-2 border-solid border-white mb-8">
                        <div className="w-full h-full py-3 col-span-1">
                            <div className="h-1/4">
                                <div className="text-2xl my-auto mr-2 float-left font-bold">
                                    {playlistDetails.title} 
                                </div>
                                <div className="h-10 text-xs my-auto float-left py-3 ml-2">
                                    | {playlistDetails.created_by} | # Following
                                </div>
                            </div>

                            <div className="h-1/2 p-2">
                                {playlistDetails.description}
                            </div>
                            
                            <div id="options" className="w-2/3 h-1/4 flex justify-between">
                                <button className={optionsButton}>Edit</button>
                                <button className={optionsButton}>Share</button>
                                <button className={optionsButton}>Options</button>
                            </div>
                        </div>

                        <div className="col-span-1">

                        </div>
                    </div>

                    <div id="info" className="w-full h-full grid grid-cols-3 gap-2">

                        <div id="search" className="col-span-1">
                            <h1 className="text-center my-3">Add To List:</h1>
                            <SearchBar />
                        </div>

                        <div id="infoSection" className="grid col-span-2">
                            <div id="filter" className="w-full h-40 row-span-1">

                            </div>
                            <div id="list" className="grid grid-col-4 row-span-auto">

                            </div>
                        </div>

                    </div>
                    
                </div>
            </Fragment>
        );}
}

export default PlaylistDetails;