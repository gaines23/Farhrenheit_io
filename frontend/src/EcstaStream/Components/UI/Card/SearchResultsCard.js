import { Fragment } from "react";
import { Link } from "react-router-dom";

import { TMBD_POSTER_w500 } from '../../../lib/constants';

const SearchResultsCard = ({item}) => {
    const r = new Date(item.release_date);
    const release_date = r.getFullYear();
    const a = new Date(item.first_air_date);
    const air_date = a.getFullYear();

    const id = item.id;
    const media_type = item.media_type;

    return (
        <Fragment>    
            <Link
                to={{
                    pathname: `/fahrenheit/ecstastream/details/${id}/${media_type}`,
                    state:{
                        id: id, 
                        media_type: media_type,
                    }
                }}
            >
                <div className="h-24 w-full flex bg-bg-fill/10 hover:bg-bg-fill/20 hover:backdrop-blur-lg hover:bg-opacity-10 hover:border rounded-md text-input-fill/60 hover:border-input-fill/30">
                    <div className="w-1/3 h-20 m-auto float-left flex">
                        { item.backdrop_path ? ( 
                            <img
                                src={TMBD_POSTER_w500 + item.poster_path}
                                alt={item.original_name}
                                className="w-5/6 h-full rounded-md object-cover m-auto"
                            />
                            ) : 
                            <div>
                                <p className="w-5/6 h-auto m-auto">No Image</p>
                            </div>
                        }
                    </div>
                
                    <div className="h-20 w-2/3 float-right m-auto ">
                        <div>
                            <p className="w-full relative text-md truncate">
                                {item.name ? item.name : item.title} 
                            </p>
                        </div>
                        <div>
                            <p className="text-xs pt-1">
                                {item.release_date && (<p>{release_date}</p>)}
                                {item.first_air_date && (<p>{air_date}</p>)}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>

        </Fragment>
    );
};

export default SearchResultsCard;

