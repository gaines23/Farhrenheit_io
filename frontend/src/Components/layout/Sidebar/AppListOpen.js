import { Fragment, useEffect, useState } from "react";
import useHttp from "../../../hooks/use-http";
import { getNotFollowingApps, getUserAppFollowing } from "../../../lib/fahrenheit-api";

import AppCard from '../../UI/SideBar/AppCard';

//let appListURL = process.env.REACT_APP_FAHRENHEIT_APP_LIST;
let apps_user_following = process.env.REACT_APP_FAHRENHEIT_USER_APP_FOLLOWING;
let apps_user_not_following = process.env.REACT_APP_FAHRENHEIT_USER_APPS_NOT_FOLLOWING;

const AppListOpen = () => {
    const [notUserApps, setNotUserApps] = useState([]);
    const [userApps, setUserApps] = useState([]);

    let token = localStorage.getItem('token');

    useEffect(() => {
        async function getNotFollowingApps() {
            try {
                const response = await fetch(`${apps_user_not_following}`, { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            
            setNotUserApps(data);
            } catch { 
                return;
            }
        }

        getNotFollowingApps();
    
    }, [token]);

    useEffect(() => {
        async function getUserAppFollowing() {
            try { 
                const response = await fetch(`${apps_user_following}`, { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
                const data = await response.json();

                setUserApps(data);
            } catch {
                return;
            }
        }

        getUserAppFollowing();

    }, [token]);

    return (
        <Fragment>
            <div className="w-5/6 my-3 mx-auto border-t border-bg-fill/20 flex">
                   
            </div>
            <div className="w-full h-auto mx-auto my-2 flex flex-col">

                <p className="w-full h-auto text-xs text-input-fill/30 px-2">My Apps</p>
                
                <ul className="w-full mx-auto h-auto text-xs font-thin my-2">
                    {userApps !== null ? 
                        userApps.map(app => {
                            return <AppCard key={app.id} app={app} following={true} />
                        })
                    : 'ADD BUTTON'}
                </ul>
                <p className="w-full h-auto text-xs text-input-fill/30 px-2">All Apps</p>
                
                <ul className="w-full mx-auto h-auto text-xs font-thin mt-2">

                    {notUserApps.map(app => {
                        return <AppCard key={app.id} app={app} following={false} />
                    })}
                    
                </ul>
            </div>
        </Fragment>
    );
}

export default AppListOpen;