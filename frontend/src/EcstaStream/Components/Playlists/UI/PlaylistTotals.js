const { Fragment } = require("react");

const PlaylistTotals = () => {
    return (
        <Fragment>
            <div className="h-5/6 w-2/3 my-auto p-1 rounded-lg bg-gradient-to-r from-ec-purple to-ec-orange/90">
                <div className="w-full h-full py-1 mx-auto bg-bg-fill/10">
                    <h1 className="w-full h-8 px-5 text-lg font-bold text-input-fill">Watched</h1>
                </div>
            </div>
        </Fragment>
    );
}

export default PlaylistTotals;