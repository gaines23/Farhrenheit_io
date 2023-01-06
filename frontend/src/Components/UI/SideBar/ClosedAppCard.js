import { Fragment } from "react";
import { NavLink } from 'react-router-dom';

import { AppIconClassName, AppsActiveLinkClassName, } from '../../UI/NavStyles';


const ClosedAppCard = ({app}) => {
    let details = app.app_info;

    const listClassName = "h-10 w-full my-2 flex justify-center items-center";
    const linkClassName = "flex group px-1 h-8 w-fit items-center rounded-lg hover:bg-bg-fill/10 outline-none hover:border-y hover:border-bg-fill/30";

    return (
        <Fragment>
            <li className={listClassName} >
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
                </NavLink>
            </li>
        </Fragment>
    )
}

export default ClosedAppCard;