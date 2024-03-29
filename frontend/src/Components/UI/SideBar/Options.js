import { Fragment, useContext } from "react";
import { Link , useHistory } from 'react-router-dom';
import useHttp from "../../../hooks/use-http";
import { getLogoutUrl } from "../../../lib/fahrenheit-api";

import AuthContext from "../../../store/auth-context";
import LoadingSpinner from "../LoadingSpinner";

import {
    OpenNavListClass,
    OpenLinkClassName,
    OpenPDivClassName,
    OptionsParaClassName,
} from '../NavStyles';


const Options = ({setOptionsIsOpen}) => {
    const history = useHistory();

    const { sendRequest, status } = useHttp(getLogoutUrl);
    const authCtx = useContext(AuthContext);

    const logoutHandler = (e) => {
        e.preventDefault();

        sendRequest();
        authCtx.logout();
        history.replace('/fahrenheit/user/login/');
        setOptionsIsOpen(false);
    }

    if (status === 'pending') {
        <LoadingSpinner />
    }

    return (
        <Fragment>
            <div 
                className="absolute z-10 left-full bottom-0 w-full h-32 py-2 mt-1 bg-far-navy rounded-lg shadow-sm shadow shadow-bg-fill/50"
            >
                <ul className="h-full w-5/6 mx-auto inline-block">
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

export default Options;