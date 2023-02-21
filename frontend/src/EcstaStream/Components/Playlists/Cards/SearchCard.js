import { Fragment, useState } from "react";
import useHttp from "../../../../hooks/use-http";

import { TMBD_POSTER_w45 } from "../../../lib/constants";
import { addItemToPlaylist } from "../../../lib/ec-api";
import LoadingSpinner from "../../UI/LoadingSpinner";

const SearchCard = ({item, listID}) => {
    const { sendRequest } = useHttp(addItemToPlaylist, true);
    const [isLoading, setIsLoading] = useState(false);

    const addToList = (e, list, id, media) => {
        e.preventDefault();

        setIsLoading(true);

        sendRequest({
            "playlist_id": list.listID, 
            "id": id,
            "type": media,
        });

        setIsLoading(false);
    }

    return (
        <Fragment>
            <button 
                className="outline-none w-full h-full flex"
                onClick={(e) => addToList(e, listID, item.id, item.media_type)} key={item.id}  
            >
                <div className="w-1/3 h-14 my-auto flex pr-2">
                    { item.backdrop_path ? ( 
                        <img
                            src={TMBD_POSTER_w45 + item.poster_path}
                            alt={item.original_name}
                            className="w-full h-full rounded-md object-cover"
                        />
                        ) : 
                        <div className="flex">
                            <p className="w-2/3 h-10 m-auto text-sm">No Image</p>
                        </div>
                    }
                </div>
                
                { isLoading && <LoadingSpinner /> }

                <div className="h-12 w-2/3 p-1 m-auto">
                    <p className="w-5/6 h-auto m-auto text-xs px-1">
                        {item.name ? item.name.slice(0,25) : item.title.slice(0,25)}
                    </p>
                </div>
            </button>
        </Fragment>
    );
}

export default SearchCard;