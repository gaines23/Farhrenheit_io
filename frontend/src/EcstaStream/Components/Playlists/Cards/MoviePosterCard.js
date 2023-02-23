import { Fragment, useEffect, useState } from "react";
import useHttp from "../../../../hooks/use-http";
import { getMovieCardDetails } from "../../../lib/tmdb-api";

import LoadingSpinner from "../../UI/LoadingSpinner";
import { TMBD_POSTER_w500 } from "../../../lib/constants";

const MoviePosterCard = ({item}) => {
    const { sendRequest, status, data: loadedDetails } = useHttp(getMovieCardDetails, true);

    const [isActive, setIsActive] = useState(false);
    const mediaId = item.pl_mov_show_id;
    
    var type;
    if (item.media_type === 0) {
        type = 'movie';
    } else {
       type = 'tv';
    }

    const info = `${type}/${mediaId}`;

    useEffect(() => {
        sendRequest(info);
    }, [sendRequest]);

    if (status === 'pending') {
        <LoadingSpinner />
    }

    if (status === 'completed') {
        return (
            <Fragment>                   
                    {loadedDetails.poster_path ?
                        <img
                            src={TMBD_POSTER_w500 + loadedDetails.poster_path}
                            alt= {loadedDetails.name ? loadedDetails.name : loadedDetails.title}
                            className={isActive ? 
                                "w-24 h-32 rounded-md object-cover m-auto relative top-4 scale-150 shadow-lg shadow-input-fill/30" :
                                "w-24 h-32 rounded-md object-cover m-auto relative top-4 group-hover:rounded-md group-hover:scale-150 group-hover:shadow-md ease-in-out duration-700 shadow-lg shadow-input-fill/20"
                            }
                            
                        /> : 
                        <div className="w-24 h-32">
                            <p className="my-auto text-sm text-center">Image N/A</p>
                        </div>
                    } 

                    <div className="h-12 w-36 static rounded-md bg-bg-fill/10 group-hover:display-hidden rounded-md text-input-fill/60">
                        <p className={isActive ? 
                            "hidden" :
                            "w-full relative text-center text-xs group-hover:hidden font-base pt-6 px-2 text-input-fill/60 truncate"
                        }>
                            {loadedDetails.name ? loadedDetails.name : loadedDetails.title}
                        </p>
                    </div>
                
            </Fragment>
        );
    }
}

export default MoviePosterCard;