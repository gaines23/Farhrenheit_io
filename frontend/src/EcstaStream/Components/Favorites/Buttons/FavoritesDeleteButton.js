import { Fragment } from "react";
import useHttp from "../../../../hooks/use-http";

import { deleteItemFromFavorites } from "../../../lib/ec-api";


const FavoritesDeleteButton = ({setShowDetails, fav_data_id}) => {
    const { sendRequest} = useHttp(deleteItemFromFavorites, true);
    const dispatch = useWatchlistDispatch();

    const handleClick = (e) => {
        e.preventDefault();

        sendRequest({wl_data_id});

        dispatch({ 
            type: 'deleted', 
            fav_data_id: fav_data_id, 
        });
        
        setShowDetails(false);
    }

    return (
        <Fragment>
            <button 
                className="w-1/2 text-sm h-10 mx-1 shadow-md shadow-black/20 border-solid border border-input-fill/30 rounded-lg bg-input-fill/30 hover:bg-input-fill/10"
                onClick={handleClick}
            >
                Remove
            </button>
        </Fragment>
    );
}

export default FavoritesDeleteButton;