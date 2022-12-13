import { Fragment } from "react";
import { NavLink } from 'react-router-dom';

import { AppIconClassName } from '../../UI/NavStyles';

import EcstaLogo from '../../../assets/EcstaLogo.png';
import AnimeWire from '../../../assets/Anime-wire.png';


const AppListClosed = () => {

    const listClassName = "h-10 w-full my-2 flex justify-center items-center";
    const linkClassName = "flex group px-1 h-8 w-fit items-center rounded-lg hover:bg-bg-fill/10 outline-none hover:border-y hover:border-bg-fill/30";

    return (
        <Fragment>
            <div className="w-5/6 my-3 mx-auto justify0center border-t border-bg-fill/20 flex">
                   
            </div>
            <div className="w-full h-auto mx-auto my-2 flex flex-col">

                <p className="w-full h-auto text-center text-xs text-input-fill/30 px-2">Apps</p>
                
                <ul className="w-full mx-auto h-auto text-xs font-thin">
                    <li className={listClassName} >
                        <NavLink 
                            to={'/fahrenheit/ecstastream'} 
                            className={linkClassName}
                            title="EcstaStream"
                        >
                            < img
                                src={EcstaLogo}
                                className={AppIconClassName} 
                                alt="ec-logo"
                            />
                        </NavLink>
                    </li>
                    <li className={listClassName}>
                        <NavLink 
                            to={'/fahrenheit/the-anime-wire/'} 
                            className={linkClassName}
                            title="Anime Wire"
                        >
                            < img
                                src={AnimeWire}
                                className={AppIconClassName} 
                                alt="anime-wire-logo"
                            />
                        </NavLink>
                    </li>
                </ul>
            </div>
        </Fragment>
    );
}

export default AppListClosed;