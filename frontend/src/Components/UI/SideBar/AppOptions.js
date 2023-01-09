import { Fragment, useEffect, useRef, useState} from "react";
import { Link } from 'react-router-dom';

import LoadingSpinner from "../LoadingSpinner";

import {
    OpenNavListClass,
    OpenLinkClassName,
    OpenPDivClassName,
    OptionsParaClassName,
} from '../NavStyles';


let apps_user_following = process.env.REACT_APP_FAHRENHEIT_USER_APP_FOLLOWING;

const AppOptions = ({app, following}) => {
    // following = POST , unfollow = DELETE
    // mute = PUT
    
    const submitFollow = async (e) => {
        e.preventDefault();

        let id = app.id;
 
        fetch (
            apps_user_following, 
            {
                method: 'POST',
                body: JSON.stringify({
                    following_app_id: id,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(async res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then(data => {
                        errorMessage = data.error.message;
                    });
                }
                throw new Error(errorMessage);
            });
    }


    useEffect(() => {
        apps_user_following,
        {
            method: 'POST',
            body: JSON.stringify({

            }),
        }
    }, []);


    return (
        <Fragment>
            <div 
                className="absolute z-10 left-full bottom-0 w-full h-auto py-2 mt-1 bg-far-navy rounded-lg shadow-sm shadow shadow-bg-fill/50"
            >
                <ul className="h-full w-5/6 mx-auto">
                    <li className={OpenNavListClass}>
                        <Link 
                            to={'/fahrenheit'} 
                            className={OpenLinkClassName}
                        >
                            <div className={OpenPDivClassName}>
                                <p className={OptionsParaClassName}>
                                    {following ? 'Unfollow' : 'Follow'}
                                </p>
                            </div>
                        </Link>
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