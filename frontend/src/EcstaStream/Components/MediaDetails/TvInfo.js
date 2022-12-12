import { Fragment } from "react";

import CrewCard from "../UI/Card/CrewCard";

const TvInfo = ({creators, first, last, eps, seasons, next}) => {
    return (
        <Fragment>
                <div className="w-1/2 h-full float-left m-auto">
                    <h1 className="w-full pl-5 text-center text-md">Creator(s)</h1>
                    <div className="w-full h-full grid grid-cols-2 mt-2 pl-3 py-3 m-auto">
                        {creators.map((item) => {
                            return <CrewCard key={item.id} item={item} />;
                        })}
                    </div>
                </div>
                <div className="w-1/2 h-full float-right m-auto">
                    <h1 className="pl-5 text-center text-md">Series Info</h1>
                        {(next !== '' || next !=='null') ?? 
                            <p className="text-xs text-center text-input-fill">Next Episode: {next}</p>
                        }
                    <div className="grid grid-cols-2 pt-2 m-auto text-xs text-center text-input-fill/60 py-3">
                        <div>
                            <p>First Aired</p>
                            <p>{first}</p>
                                <br />
                            <p>Last Aired</p>
                            <p>{last}</p>
                        </div>

                        <div>
                            <p>Episodes</p>
                            <p>{eps}</p>
                                <br />
                            <p>Seasons</p>
                            <p>{seasons}</p>
                        </div>
                    </div>
                </div>
        </Fragment>
    );
};

export default TvInfo;