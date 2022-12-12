
const SecondaryFilter = () => {
    const buttonClassName = "w-1/4 text-sm mx-1 h-5 text-input-fill text-center rounded-lg border-input-fill/70 hover:bg-input-fill/40 hover:border";

    return (
        <div className="w-full h-7 float-right mt-5">
            <div className="flex w-1/3 mr-3 float-right justify-center">
                <button className={buttonClassName}>
                    All
                </button>
                <button className={buttonClassName}>
                    Movies
                </button>
                <button className={buttonClassName}>
                    Tv
                </button>
                <div className={buttonClassName}>
                    Genres
                </div>
            </div>
        </div>
    );
};

export default SecondaryFilter;