import { Fragment } from "react";
import { Link } from "react-router-dom";

const PlaylistCard = ({playlist}) => {
    const title = playlist.title;
    const user = playlist.created_by;
    const id = playlist.ec_playlist_id;

    return (
        <Fragment>
            <div
                className="w-28 h-36 mt-3 relative inline-block rounded-md border border-input-fill/30"
                //onClick={handleClick}
            >
                <Link 
                    to={{
                        pathname: `/fahrenheit/ecstastream/playlist/details/${id}/${title}/${user}`,
                        state: {
                            id: id,
                            title: title,
                            user: user,
                        }
                    }}
                >
                    <button 
                        className="h-full w-full p-1 mx-auto"
                        //Click={submitNewPlaylist}
                    >
                        <div className="h-full w-24 p-1 mx-auto relative">
                            <h1 className="h-auto w-full absolute mx-auto text-input-fill text-lg text-left inset-x-0 bottom-0">
                                {title}
                            </h1>
                        </div>
                    </button>
                </Link>
            </div>
        </Fragment>
    );
}

export default PlaylistCard;