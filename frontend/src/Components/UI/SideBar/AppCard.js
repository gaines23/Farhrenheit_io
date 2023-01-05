import { Fragment } from "react";
import { NavLink } from "react-router-dom";

import {
    OpenNavListClass,
    OpenPDivClassName,
    AppIconClassName,
    AppsActiveLinkClassName,
} from '../../UI/NavStyles';

const AppCard = ({app}) => {
    let details = app.app_info;

    const linkClassName = "flex group px-1 h-8 w-full items-center rounded-lg hover:bg-bg-fill/10 outline-none";
    const itemClassName = "text-input-fill/70 w-5/6 text-left mx-auto h-auto my-auto group-hover:text-input-fill/80";    

    return (
        <Fragment>
            <li className={OpenNavListClass}>
                <NavLink 
                    to={`/fahrenheit${details.app_base_link}`} 
                    className={linkClassName}
                    activeClassName={AppsActiveLinkClassName}
                >
                    < img
                        src={details.app_icon}
                        className={AppIconClassName} 
                        alt={`${details.app_name}_img`}
                    />                    
                    <div className={OpenPDivClassName}>
                        <p className={itemClassName}>
                            {details.app_name}
                        </p>
                    </div>
                </NavLink>
            </li>
        </Fragment>
    );
}

export default AppCard;