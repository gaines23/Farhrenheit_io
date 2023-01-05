import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../../../store/auth-context";

import useHttp from "../../../hooks/use-http";
import { getUserAppFollowing } from "../../../lib/fahrenheit-api";

import AppCard from '../../UI/SideBar/AppCard';
import FollowingApps from "../../UI/SideBar/FollowingApps";

let appListURL = process.env.REACT_APP_FAHRENHEIT_APP_LIST;

const AppListOpen = () => {
    // const [appList, setAppList] = useState([]);

    const authCtx = useContext(AuthContext);
    const isFollowingApps = authCtx.apps;
    const token = authCtx.token;

    // useEffect(() => {
    //     fetchAppList();
    // }, []);

    // const fetchAppList = async () => {
    //     const data = await fetch(appListURL);
    //     const apps = await data.json();
    //     setAppList(apps);
    // }

    // console.log(authCtx)

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
            <div className="w-5/6 my-3 mx-auto border-t border-bg-fill/20 flex">
                   
            </div>
            <div className="w-full h-auto mx-auto my-2 flex flex-col">

                <p className="w-full h-auto text-xs text-input-fill/30 px-2">My Apps</p>
                
                <ul className="w-full mx-auto h-auto text-xs font-thin mt-3">
                    {userApps.map(app => {
                        return <AppCard key={app.id} app={app} />
                    })}
                </ul>
            </div>
        </Fragment>
    );
}

export default AppListOpen;