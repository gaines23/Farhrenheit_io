import { Fragment } from "react";

const PlaylistCard = ({playlist}) => {
    return (
        <Fragment>
            <div
                className="w-28 h-36 mt-3 relative inline-block rounded-md border border-input-fill/30"
                //onClick={handleClick}
            >
                <div className="h-full w-24 mx-auto absolute top-0 bottom-0">
                    <h1 className="h-auto text-input-fill">
                        {playlist.title}
                    </h1>
                    

                </div>
            </div>
        </Fragment>
    );
}

export default PlaylistCard;