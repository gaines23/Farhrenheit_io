const { Fragment } = require("react");

const PlaylistTotals = () => {
    return (
        <Fragment>
            <div className="h-40 w-3/5 border rounded-lg border-bg-fill/10 bg-gradient-to-br from-ec-orange/50 to-ec-purple/30">
                <div className="w-full h-full py-1 mx-auto ">
                    <h1 className="w-full h-8 text-md font-bold">Watched</h1>
                </div>
            </div>
        </Fragment>
    );
}

export default PlaylistTotals;