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
                className="outline-none w-full h-full"
                onClick={(e) => addToList(e, listID, item.id, item.media_type)} key={item.id}  
            >
                <div className="w-1/3 h-10 m-auto float-left flex">
                    { item.backdrop_path ? ( 
                        <img
                            src={TMBD_POSTER_w45 + item.poster_path}
                            alt={item.original_name}
                            className="w-5/6 h-full rounded-md object-cover m-auto"
                        />
                        ) : 
                        <div>
                            <p className="w-5/6 h-auto m-auto text-sm">No Image</p>
                        </div>
                    }
                </div>
                
                { isLoading && <LoadingSpinner /> }

                <div className="h-10 w-2/3 float-right m-auto ">
                    <div>
                        <p className="w-full relative text-xs">
                            {item.name ? item.name : item.title} 
                        </p>
                    </div>

                </div>
            </button>
        </Fragment>
    );
}

export default SearchCard;