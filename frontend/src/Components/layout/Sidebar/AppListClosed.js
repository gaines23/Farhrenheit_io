import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../../../store/auth-context";
import ClosedAppCard from "../../UI/SideBar/ClosedAppCard";

let apps_user_following = process.env.REACT_APP_FAHRENHEIT_USER_APP_FOLLOWING;

const AppListClosed = () => {
    const [userApps, setUserApps] = useState([]);

    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

    useEffect(() => {
        async function getUserAppFollowing() {
            const response = await fetch(`${apps_user_following}`, {
                methd: 'GET',
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
            <div className="w-5/6 my-3 mx-auto justify0center border-t border-bg-fill/20 flex">
                   
            </div>
            <div className="w-full h-auto mx-auto my-2 flex flex-col">

                <p className="w-full h-auto text-center text-xs text-input-fill/30 px-2">My Apps</p>
                
                <ul className="w-full mx-auto h-auto text-xs font-thin">
                    {userApps ?
                        userApps.map(app => {
                            return <ClosedAppCard key={app.id} app={app} />
                        })
                        : 'ADD BUTTON'
                    }
                    
                </ul>
            </div>
        </Fragment>
    );
}

export default AppListClosed;