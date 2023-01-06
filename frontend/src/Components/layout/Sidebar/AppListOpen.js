import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../../../store/auth-context";

import AppCard from '../../UI/SideBar/AppCard';

//let appListURL = process.env.REACT_APP_FAHRENHEIT_APP_LIST;
let apps_user_following = process.env.REACT_APP_FAHRENHEIT_USER_APP_FOLLOWING;
let all_apps = process.env.REACT_APP_FAHRENHEIT_APP_LIST;

const AppListOpen = () => {
    const [allApps, setAllApps] = useState([]);
    const [userApps, setUserApps] = useState([]);

    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

    useEffect(() => {
        async function getAllApps() {
            const response = await fetch(`${all_apps}`, { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            setAllApps(data);
        }

        getAllApps();

    }, []);

    useEffect(() => {
        async function getUserAppFollowing() {
            const response = await fetch(`${apps_user_following}`, { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            setUserApps(data);
        }

        getUserAppFollowing();

    }, []);

    return (
        <Fragment>
            <div className="w-5/6 my-3 mx-auto border-t border-bg-fill/20 flex">
                   
            </div>
            <div className="w-full h-auto mx-auto my-2 flex flex-col">

                <p className="w-full h-auto text-xs text-input-fill/30 px-2">My Apps</p>
                
                <ul className="w-full mx-auto h-auto text-xs font-thin mt-3">
                    {userApps ? 
                        userApps.map(app => {
                            return <AppCard key={app.id} app={app.app_info} following={true} />
                        })
                    : 'ADD BUTTON'}
                </ul>
                <p className="w-full h-auto text-xs text-input-fill/30 px-2">Other Apps</p>
                
                <ul className="w-full mx-auto h-auto text-xs font-thin mt-3">
                    { allApps.map(app => {
                        return <AppCard key={app.id} app={app} following={false} />
                    })}
                </ul>
            </div>
        </Fragment>
    );
}

export default AppListOpen;