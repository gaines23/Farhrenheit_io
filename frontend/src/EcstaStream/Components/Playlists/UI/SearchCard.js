import { Fragment } from "react";

import { TMBD_POSTER_w45 } from "../../../lib/constants";

const SearchCard = ({item}) => {
    // EC Playistdata

    return (
        <Fragment>
            <li className="h-12 w-full flex bg-bg-fill/10 hover:bg-bg-fill/20 hover:backdrop-blur-lg hover:bg-opacity-10 hover:border rounded-md text-input-fill/60 hover:border-input-fill/30">
                <div className="w-1/3 h-10 m-auto float-left flex">
                    { item.backdrop_path ? ( 
                        <img
                            src={TMBD_POSTER_w45 + item.poster_path}
                            alt={item.original_name}
                            className="w-5/6 h-full rounded-md object-cover m-auto"
                        />
                        ) : 
                        <div>
                            <p className="w-5/6 h-auto m-auto">No Image</p>
                        </div>
                    }
                </div>
                
                <div className="h-10 w-2/3 float-right m-auto ">
                    <div>
                        <p className="w-full relative text-xs">
                            {item.name ? item.name : item.title} 
                        </p>
                    </div>

                </div>
            </li>
        </Fragment>
    );
}

export default SearchCard;