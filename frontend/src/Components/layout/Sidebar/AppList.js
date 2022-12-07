import { Fragment } from "react";
import { NavLink } from 'react-router-dom';

import EcstaLogo from '../../../assets/EcstaLogo.png';
import AnimeWire from '../../../assets/Anime-wire.png';


const AppList = () => {

    const listClassName = "h-10 w-full my-2 px-2";
    const linkClassName = "flex group p-1 h-10 w-full items-center rounded-full hover:bg-bg-fill/10 outline-none hover:border-y hover:border-bg-fill/30";
    const iconClassName = "w-6 h-auto relative left-3";
    const itemClassName = "text-input-fill/70 w-full text-center mx-auto h-auto my-auto group-hover:text-input-fill/80";
    const liDivClassName = "w-full h-10 flex";

    return (
        <Fragment>
            <div className="w-11/12 my-3 mx-auto border-t border-bg-fill/20">
                   
            </div>
            <div className="w-11/12 h-full mx-auto my-2 border border-bg-fill/20 bg-bg-fill/10 rounded-md shadow-md shadow-bg-fill/10">

                <p className="w-full h-8 text-xs text-input-fill/30 mt-3 px-2">Apps</p>
                
                <ul className="w-full mx-auto h-full text-sm font-thin">
                    <li className={listClassName}>
                        <NavLink 
                            to={'fahrenheit/ecstastream'} 
                            className={linkClassName}
                        >
                            < img
                                src={EcstaLogo}
                                className={iconClassName} 
                                alt="ec-logo"
                            />                    
                            <div className={liDivClassName}>
                                <p className={itemClassName}>
                                    EcstaStream
                                </p>
                             </div>
                        </NavLink>
                    </li>
                    <li className={listClassName}>
                        <NavLink 
                            to={'fahrenheit/the-anime-wire/'} 
                            className={linkClassName}
                        >
                            < img
                                src={AnimeWire}
                                className={iconClassName} 
                                alt="anime-wire-logo"
                            />                    
                            <div className={liDivClassName}>
                                <p className={itemClassName}>
                                    Anime Wire
                                </p>
                             </div>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </Fragment>
    );
}

export default AppList;