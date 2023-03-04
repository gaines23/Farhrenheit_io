import { Fragment, useState } from "react";
import useHttp from "../../../../hooks/use-http";

import { TMDB_POSTER_w92 } from "../../../lib/constants";
import { addItemToPlaylist } from "../../../lib/ec-api";
import { usePlaylistDispatch } from "../../../store/PlaylistContext";
import LoadingSpinner from "../../UI/LoadingSpinner";

const SearchCard = ({item, listId}) => {
    const { sendRequest } = useHttp(addItemToPlaylist, true);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = usePlaylistDispatch();

    const addToList = (e, id, media) => {
        e.preventDefault();

        setIsLoading(true);
        
        sendRequest({
            "playlist_id": listId, 
            "id": id,
            "type": media,
        });

        var mediaType;
        if (media === 'movie') {
            mediaType = 0;
        } else {
            mediaType = 1;
        }

        dispatch({
            type: 'added',
            playlist_id: listId,
            pl_data_id: '',
            pl_mov_show_id: id,
            media_type: mediaType,
        });

        setIsLoading(false);
    }

    return (
        <Fragment>
            <button 
                className="group outline-none w-full h-full flex hover:bg-bg-fill/20 rounded-md"
                onClick={(e) => addToList(e, item.id, item.media_type)}
                key={item.id}  
            >
                <div className="w-1/3 h-16 my-auto flex">
                    { item.backdrop_path ? ( 
                        <img
                            src={TMDB_POSTER_w92 + item.poster_path}
                            alt={item.original_name}
                            className="w-full h-full rounded-md object-cover my-auto group-hover:border group-hover:border-input-fill/30"
                        />
                        ) : 
                        <div className="flex">
                            <p className="w-full h-10 m-auto text-xs px-1">Image N/A</p>
                        </div>
                    }
                </div>
                
                { isLoading && <LoadingSpinner /> }

                <div className="h-16 w-2/3 p-1 m-auto flex">
                    <p className="w-full h-auto m-auto text-xs px-1">
                        {item.name ? item.name.slice(0,20) : item.title.slice(0,20)}
                        {((item.name && item.name.length > 20) || (item.title && item.title.length > 20)) && '...'}
            
                    </p>
                </div>
            </button>
        </Fragment>
    );
}

export default SearchCard;