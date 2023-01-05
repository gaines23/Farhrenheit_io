import { Fragment, useEffect, useState } from "react";
import useHttp from "../../../hooks/use-http";
import { getUserAppFollowing } from "../../../lib/fahrenheit-api";
import AppCard from "./AppCard";

const FollowingApps = ({token, isFollowingApps}) => {
    const [userApps, setUserApps] = useState([]);
    const { sendRequest, status, data: appList } = useHttp(getUserAppFollowing, true);

    useEffect(() => {
        if(isFollowingApps) {
            sendRequest(token);
        }
    }, [sendRequest, token]);

    useEffect(() => {
        if (status==='completed') {
            setUserApps(appList);
        }

    }, []);

    return (
        <Fragment>
            <p className="text-center mt-5">Following</p>
            {userApps.map(app => {
                return <AppCard key={app.id} app={app} />
            })}
        </Fragment>
    );
}

export default FollowingApps;