import { Fragment } from "react";

import useHttp from "../../../../../hooks/use-http";
import { deleteItemFromPlaylist } from "../../../../lib/ec-api";
import { usePlaylistData, usePlaylistDispatch } from "../../../../store/PlaylistContext";

const DeleteButton = ({setShowDetails, pl_data_id}) => {
    const { sendRequest, status, error} = useHttp(deleteItemFromPlaylist, true);
    const dispatch = usePlaylistDispatch();

    const handleClick = (e) => {
        e.preventDefault();

        sendRequest({pl_data_id});

        dispatch({ 
            type: 'deleted', 
            pl_data_id: pl_data_id, 
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

export default DeleteButton;