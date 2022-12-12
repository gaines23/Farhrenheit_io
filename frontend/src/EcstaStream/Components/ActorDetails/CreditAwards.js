import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getCreditAwards } from "../../lib/tmdb-api";

import NotFound from "../../Pages/NotFound";
import LoadingSpinner from "../UI/LoadingSpinner";

const CreditAwards = () => {
    const params = useParams();
    const imdbId = params;

    const { sendRequest, status, data: loadedAwards, error } = useHttp(getCreditAwards, true);

    useEffect(() => {
        sendRequest(params);
    }, [sendRequest, params]);

    if (status === 'pending') {
        <LoadingSpinner />
    }

    if (error) {
        return <NotFound />
    }

    if (status === 'completed') {

        const thClassName = "w-auto px-2 py-3";
   
        return (
            <Fragment>
                
                <h3 className="text-center text-sm">{loadedAwards.summary_totals.otherWinsCount} Wins | {loadedAwards.summary_totals.otherNominationsCount} Nominations</h3>
                <table className="w-full table-auto mt-3 bg-bg-fill/10 shadow-xl shadow-black/20 rounded-md">
                    <thead>
                        <tr className="text-sm">
                            <th className={thClassName}>Award Name</th>
                            <th className={thClassName}>Category</th>
                            <th className={thClassName}>Title</th>
                            <th className={thClassName}>Year</th>
                            <th className={thClassName}>Won</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {loadedAwards.sort_awards.map((item) => {
                            return (
                                <tr key={item.awardNominationId} className="h-8 px-1 text-xs text-center border-b-1 font-light">
                                    <th className="w-auto p-1 font-light">{item.awardName}</th>
                                    <th className="w-auto p-1 font-light">{item.category}</th>
                                    <th className="w-auto p-1 font-light">{item.nominations.titles && item.nominations.titles['title'] }</th>
                                    <th className="w-auto p-1 font-light">{item.year}</th>
                                    <th className="w-auto p-1 font-light">{item.isWinner ? "Yah" : "Nah"}</th>
                                </tr>
                            );})}
                    </tbody>
                </table>

            </Fragment>
        );
    }

    
}

export default CreditAwards;