import { Fragment, useEffect } from "react";

import useHttp from "../../../hooks/use-http";
import { getMediaAwards } from "../../lib/tmdb-api";
import NotFound from "../../Pages/NotFound";
import LoadingSpinner from "../UI/LoadingSpinner";

const Awards = ({id}) => {
    const { sendRequest, status, data: loadedAwards, error } = useHttp(getMediaAwards, true);

    useEffect(() => {
        sendRequest(id);
    }, [sendRequest, id]);

    if (status === 'pending') {
        <LoadingSpinner />
    }

    if (error) {
        return <NotFound />
    }

    if (status === 'completed') {
        
        return (
            <Fragment>
                <h3 className="text-center text-sm">{loadedAwards.summary}</h3>
                    <table className="w-full table-auto mt-3 py-3">
                        <thead>
                            <tr className="text-sm">
                                <th>Award Name</th>
                                <th>Category</th>
                                <th>Whomst</th>
                                <th>Year</th>
                                <th>Won</th>
                            </tr>
                        </thead>
                        <tbody className="w-full overflow-y-scroll scroll-smooth scrollbar scrollbar-width:thin scrollbar-thumb-ec-orange scrollbar-track-transparent">
                            {loadedAwards.awards.map((item) => {
                                return (
                                    <tr key={item.awardNominationId} className="h-8 px-1 text-xs text-center border-b-1 font-light">
                                        <th className="w-auto p-1 font-light">{item.awardName}</th>
                                        <th className="w-auto p-1 font-light">{item.category}</th>
                                        {/* <th className="w-auto p-1">{item.nominations.names ?? item.nominations.names.map(name => names.id)}</th> */}
                                        <th className="w-auto p-1 font-light">{item.year}</th>
                                        <th className="w-auto p-1 font-light">{item.isWinner ? "Yah" : "Nah"}</th>
                                    </tr>
                            );}).slice(0,5)}
                        </tbody>
                    </table>
            </Fragment>
        );
    }
};

export default Awards;