import { Fragment, useContext, useEffect } from "react";
import { Link , useHistory } from 'react-router-dom';
import useHttp from "../../hooks/use-http";
import { getLogoutUrl } from "../../lib/fahrenheit-api";

import AuthContext from "../../store/auth-context";
import LoadingSpinner from "./LoadingSpinner";

import {
    OpenNavListClass,
    OpenLinkClassName,
    OpenPDivClassName,
    OptionsParaClassName,
} from './NavStyles';


const OptionsClosed = () => {
    const history = useHistory();

    const { sendRequest, status, error } = useHttp(getLogoutUrl);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        if (status === 'completed' || !error) {
            history.replace('/fahrenheit');
        }
    }, []);
    
    const logoutHandler = (e) => {
        e.preventDefault();

        sendRequest();
        authCtx.logout();
    }

    if (status === 'pending') {
        <LoadingSpinner />
    }

    return (
        <Fragment>
            <div 
                className="absolute z-10 left-10 bottom-10 w-32 h-44 py-2 mt-1 bg-far-navy rounded-lg shadow-sm shadow shadow-bg-fill/50"
            >
                <ul className="h-full w-5/6 mx-auto">
                    <li className={OpenNavListClass}>
                        <Link 
                            to={'/fahrenheit/user-profile/'} 
                            className={OpenLinkClassName}
                        >
                            <div className={OpenPDivClassName}>
                                <p className={OptionsParaClassName}>
                                    Profile
                                </p>
                            </div>
                        </Link>
                    </li>
                    <li className={OpenNavListClass}>
                        <Link 
                            to={'/fahrenheit'} 
                            className={OpenLinkClassName}
                        >
                            <div className={OpenPDivClassName}>
                                <p className={OptionsParaClassName}>
                                    Settings
                                </p>
                            </div>
                        </Link>
                    </li>

                    <div className="w-5/6 my-1 mx-auto border-t border-bg-fill/20 flex"></div>

                    <li className={OpenNavListClass}>
                        <button 
                            className={OpenLinkClassName}
                            type="submit"
                            onClick={logoutHandler}
                        >
                            <div className={OpenPDivClassName}>
                                <p className={OptionsParaClassName}>
                                    Logout
                                </p>
                            </div>
                        </button>
                    </li>
                </ul>
            </div>
        </Fragment>
    );
}

export default OptionsClosed;