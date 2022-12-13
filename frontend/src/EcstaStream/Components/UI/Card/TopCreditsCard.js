import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { TMBD_POSTER_w500 } from "../../../lib/constants";

const TopCreditsCard = ({item}) => {
    const [isActive, setIsActive] = useState(false);

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
                <div
                    className="group flex-shrink-0 w-36 mt-3 h-48 rounded-md"
                    //onClick={handleClick}
                >
                    {item.poster_path ?
                        <img
                            src={TMBD_POSTER_w500+ item.poster_path}
                            alt= {item.name ? item.name : item.title}
                            className={isActive ? 
                                "w-24 h-32 rounded-md object-cover m-auto relative top-4 scale-150 shadow-lg shadow-input-fill/30" :
                                "w-24 h-32 rounded-md object-cover m-auto relative top-4 group-hover:rounded-md group-hover:scale-150 ease-in-out duration-700 shadow-lg group-hover:shadow- shadow-input-fill/20"
                            }
                            
                        /> : 
                        <div className="flex h-full w-full rounded-md border-y border-l border-bg-fill/10">
                            <p className="w-full h-5 m-auto text-sm text-center">No Image</p>
                        </div>
                    } 
                        
                    <div className="h-12 w-36 static rounded-md bg-bg-fill/10 group-hover:display-hidden rounded-md text-input-fill/60">
                        <p className={isActive ? 
                            "hidden" :
                            "w-full relative text-center text-xs group-hover:hidden font-base pt-6 px-2 truncate"
                        }>
                            {item.character}
                        </p>
                    </div>
                </div>
            </Link>
        </Fragment>
    );
}

export default TopCreditsCard;