import { Fragment, useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import { getFavoritesDetails } from "../lib/ec-api";
import { FavoritesProvider } from "../store/FavoritesContext";

import FavoritesSearch from "../Components/Favorites/FavoritesSearch";
import FavoritesList from "../Components/Favorites/FavoritesList";
import NotFound from "./NotFound";
import LoadingSpinner from "../Components/UI/LoadingSpinner";

const Favorites = () => {
    const [getData, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { sendRequest, status, data: playlistDetails, error } = useHttp(getFavoritesDetails, true);

    useEffect(() => {
        setIsLoading(true);
        sendRequest();
    }, [sendRequest, setIsLoading]);

    useEffect(() => {
        setIsLoading(true);
        if (status === 'completed') {
            setData(playlistDetails.favs_info);
            setIsLoading(false);
        }
    }, [playlistDetails]);

    const optionsButton = "h-full w-1/3 text-sm mx-2 hover:text-ec-purple-text";

    if (error) {
        return <NotFound/>
    }


    if (status === 'completed') {
        const listId = playlistDetails.favorite_id;

        return (
            <Fragment>
                <div className="w-full h-full mx-auto pt-5 overflow-hidden">
                    <div id="topSection" className="w-full h-48 grid grid-cols-2 border-solid border-white mb-8">
                        <div className="w-full h-full py-3 col-span-1">
                            <div className="h-1/4">
                                <div className="text-2xl my-auto mr-2 float-left font-bold">
                                    Favorites
                                </div>
                                <div className="h-10 text-xs my-auto float-left py-3 ml-2">
                                    | {playlistDetails.username} | # Following
                                </div>
                            </div>

                            <div className="h-1/2 p-2">
                                Start adding or favoriting more movies and shows to add to your list!
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

                    {isLoading && <LoadingSpinner />}
                                        
                    <div id="info" className="w-full h-5/6 mx-auto flex">
                        {!isLoading && <> 
                            <FavoritesProvider getData={{getData}}>
                                <FavoritesSearch listId={listId} />
                                <FavoritesList />
                            </FavoritesProvider>
                        </>}
                    </div>

                </div>
            </Fragment>
        );
    }
};

export default Favorites;