import { Fragment, } from "react";
import { Link } from 'react-router-dom';
// import useHttp from "../../../hooks/use-http";

// import AuthContext from "../../../store/auth-context";
// import LoadingSpinner from "../LoadingSpinner";

import {
    OpenNavListClass,
    OpenLinkClassName,
    OpenPDivClassName,
    OptionsParaClassName,
} from '../NavStyles';

const AppOptions = ({setOptionsIsOpen, following, muted}) => {

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

                    {(following) ? (
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
                                            {(muted && following) ? 'Unmute' : 'Mute'}
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