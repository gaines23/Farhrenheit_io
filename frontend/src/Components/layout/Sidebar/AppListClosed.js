import { Fragment } from "react";
import { NavLink } from 'react-router-dom';

import EcstaLogo from '../../../assets/EcstaLogo.png';
import AnimeWire from '../../../assets/Anime-wire.png';


const AppListClosed = () => {

    const listClassName = "h-10 w-full my-2 px-1 flex justify-center items-center";
    const linkClassName = "flex group px-1 h-10 w-full items-center rounded-lg hover:bg-bg-fill/10 outline-none hover:border-y hover:border-bg-fill/30";
    const iconClassName = "w-7 h-auto px-1 relative";
    const liDivClassName = "w-full h-10 flex";
    const itemClassName = "text-input-fill/70 w-5/6 text-left mx-auto h-auto my-auto group-hover:text-input-fill/80";
    

    return (
        <Fragment>
            <div className="w-5/6 my-3 mx-auto border-t border-bg-fill/20 flex">
                   
            </div>
            <div className="w-full h-auto mx-auto my-2 flex flex-col">

                <p className="w-full h-auto text-xs text-input-fill/30 px-2">Apps</p>
                
                <ul className="w-full mx-auto h-auto text-xs font-thin">
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

export default AppListClosed;