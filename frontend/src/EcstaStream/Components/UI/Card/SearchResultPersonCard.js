import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../../../hooks/use-http";

import { TMBD_POSTER_w500 } from '../../../lib/constants';
import { getCastCrewImdbId } from "../../../lib/tmdb-api";

const SearchResultPersonCard = ({item}) => {
    const { sendRequest, status, data: loadedImdbId } = useHttp(getCastCrewImdbId, true);
    
    const tmdb_id = item.id;

    useEffect(() => {
        sendRequest(tmdb_id);
    }, [sendRequest, tmdb_id]);

    if (status === 'completed') {
        const imdb_id = loadedImdbId.imdb_id;
        return (
            <Fragment>
                <Link 
                        to={{
                            pathname: `/credit-details/${tmdb_id}/${imdb_id}`,
                            state: {
                                tmdbId: tmdb_id,
                                imdbId: imdb_id,
                            }
                        }}
                    >
                        <div className="h-24 w-full flex bg-bg-fill/10 hover:bg-bg-fill/20 hover:backdrop-blur-lg hover:bg-opacity-10 hover:border rounded-md text-input-fill/60 hover:border-input-fill/30">
                            <div className="w-1/3 h-20 m-auto float-left flex">
                                {item.profile_path ?
                                    <img 
                                        src={TMBD_POSTER_w500 + item.profile_path}
                                        alt="castimg" 
                                        className="w-5/6 h-full rounded-md object-cover m-auto"
                                /> : <p className="m-auto text-sm text-center">Image N/A</p>
                                }
                            </div>
                            <div className="w-2/3 h-auto float-right m-auto px-1">
                                <p className="w-full text-sm font-bold text-center px-1 truncate">{item.name}</p>
                            </div>
                        </div>
                    </Link>
                
            </Fragment>
        );
    }
}

export default SearchResultPersonCard;