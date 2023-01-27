import { Fragment, useState, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import useOutsideClick from "../../../hooks/useOutsideClick";

import {
    OpenNavListClass,
    OpenPDivClassName,
    AppIconClassName,
    AppsActiveLinkClassName,
} from '../../UI/NavStyles';
import { BsCaretDown, BsCaretUp } from 'react-icons/bs';
import AppOptions from "./AppOptions";

const AppCard = ({app, following}) => {
   
    const [appOptionsIsOpen, setAppOptionsIsOpen] = useState(false);
    const ref = useRef();

    const handleDropdown = () => {
        if (appOptionsIsOpen) {
            setAppOptionsIsOpen(false);
            return;
        }
        setAppOptionsIsOpen(true);
    }

    useOutsideClick(ref, () => {
        setAppOptionsIsOpen(false);
    });

    const linkClassName = "flex group px-1 h-full w-full items-center rounded-l-lg hover:bg-bg-fill/10 outline-none";
    const itemClassName = "text-input-fill/70 w-5/6 text-left pr-1 mx-auto h-auto my-auto group-hover:text-input-fill/80";    

    return (
        <Fragment>
            <li className={OpenNavListClass}>
                <NavLink 
                    to={following ? `/fahrenheit${app.app_info.app_base_link}` : `/fahrenheit${app.app_base_link}`} 
                    className={linkClassName}
                    activeClassName={AppsActiveLinkClassName}
                >
                    < img
                        src={following ? app.app_info.app_icon : app.app_icon}
                        className={AppIconClassName} 
                        alt={following ? `${app.app_info.app_name}_img` : `${app.app_name}_img`}
                    />                    
                    <div className={OpenPDivClassName}>
                        <p className={itemClassName}>
                            {following ? app.app_info.app_name : app.app_name}
                        </p>
                    </div>
                </NavLink>
                <div className="h-full w-1/4 rounded-r-lg hover:bg-bg-fill/20" onClick={handleDropdown}>
                    <button 
                        className="h-full w-full flex my-auto float-right focus:outline-none" 
                        ref={ref}
                    >                           
                        {!appOptionsIsOpen ? 
                            <BsCaretDown className="w-fit h-fit m-auto" /> 
                            : <BsCaretUp className="w-fit h-fit m-auto" /> 
                        }
                    </button>
                </div>
                {appOptionsIsOpen && <AppOptions following={following} app={app} /> }
                
            </li>
        </Fragment>
    );
}

export default AppCard;