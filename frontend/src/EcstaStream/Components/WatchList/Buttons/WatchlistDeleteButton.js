import { Fragment } from "react";
import useHttp from "../../../../hooks/use-http";

import { deleteItemFromWatchlist } from "../../../lib/ec-api";
import { useWatchlistDispatch } from "../../../store/WatchlistContext";


const WatchlistDeleteButton = ({setShowDetails, wl_data_id}) => {
    const { sendRequest} = useHttp(deleteItemFromWatchlist, true);
    const dispatch = useWatchlistDispatch();

    const handleClick = (e) => {
        e.preventDefault();

        sendRequest({wl_data_id});

        dispatch({ 
            type: 'deleted', 
            wl_data_id: wl_data_id, 
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

export default WatchlistDeleteButton;