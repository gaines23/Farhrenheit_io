import { Fragment, useEffect, useState } from "react";
import useHttp from "../../../hooks/use-http";
import { getAllApps } from "../../../lib/fahrenheit-api";
import LoadingSpinner from "../../UI/LoadingSpinner";
import AppCard from "../../UI/SideBar/AppCard";

const AppListNotLoggedIn = () => {
    const { sendRequest, status, data: allAppDetails } = useHttp(getAllApps, true);
    const [getApps, setAllApps] = useState([]);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    return (
        <Fragment>
            <div className="w-5/6 my-3 mx-auto border-t border-bg-fill/20 flex">
               
           </div>
            <p className="w-full h-auto text-xs text-input-fill/30 px-2">All Apps</p>
                
                <ul className="w-full mx-auto h-auto text-xs font-thin mt-2">
                    {status === 'loading' && <LoadingSpinner />}

                    {status === 'completed' &&
                        <Fragment>
                            {allAppDetails.map(app => {
                            return <AppCard key={app.id} app={app} following={false} />
                        })}
                        </Fragment>
                        
                    }
                    
                </ul>
        </Fragment>
    );
}

export default AppListNotLoggedIn;