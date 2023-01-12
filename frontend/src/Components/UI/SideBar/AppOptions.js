import { Fragment, useEffect, useRef, useState} from "react";
import { Link, useHistory } from 'react-router-dom';

import LoadingSpinner from "../LoadingSpinner";

import {
    OpenNavListClass,
    OpenLinkClassName,
    OpenPDivClassName,
    OptionsParaClassName,
} from '../NavStyles';


let apps_user_following = process.env.REACT_APP_FAHRENHEIT_USER_APP_FOLLOWING;

const AppOptions = ({app, following}) => {
    const history = useHistory();
    // following = POST , unfollow = DELETE
    // mute = PUT
    let token = localStorage.getItem('token'); 
    const appId = app.id;
    const appUrl = app.app_base_link;
    
    
    const [isLoading, setIsLoading] = useState(false);



    const submitFollowHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        fetch(
            apps_user_following,
            {
                method: 'POST',
                body: JSON.stringify({
                    following_app_id: appId,
                }),
                headers: {
                    'Content-Type': 'application/json' ,
                    'Authorization': `Bearer ${token}`,
                    'accept': 'application/json',
                }
            }
        ).then(async res => {
            setIsLoading(false)
            if (res.ok) {
                return res.json();
            }
        }).then(() => {
            //history.replace(`/fahrenheit${appUrl}`);
        });
    }


    return (
        <Fragment>
            <div 
                className="absolute z-10 left-full bottom-0 w-full h-auto py-2 mt-1 bg-far-navy rounded-lg shadow-sm shadow shadow-bg-fill/50"
            >
                <ul className="h-full w-5/6 mx-auto">
                    <li className={OpenNavListClass} >
                        <div className={OpenLinkClassName} >
                            <button className={OpenPDivClassName} type="submit" onClick={submitFollowHandler}>
                                <p className={OptionsParaClassName}>
                                    {following ? 'Unfollow' : 'Follow'}
                                </p>
                                { isLoading && <LoadingSpinner /> }
                            </button>
                        </div>
                    </li>

                    {following ? (
                        <Fragment>
                            <div className="w-5/6 my-1 mx-auto border-t border-bg-fill/20 flex"></div>
                        
                            <li className={OpenNavListClass}>
                                <button 
                                    className={OpenLinkClassName}
                                    //type="submit"
                                    //onClick={logoutHandler}
                                >
                                    <div className={OpenPDivClassName}>
                                        <p className={OptionsParaClassName} >
                                            {app.app_info.mute_notifications !== '' ? 'Unmute' : 'Mute'}
                                        </p>
                                    </div>
                                </button>
                            </li>
                        </Fragment>
                    ) : ''}
                    
                </ul>
            </div>
        </Fragment>
    );
}

export default AppOptions;