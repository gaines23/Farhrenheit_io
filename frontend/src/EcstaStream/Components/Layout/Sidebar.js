import { Fragment } from 'react';
import SideMenu from './SideMenu';
import UserActions from './UserActions';

const SideBar = () => {
    return (
        <Fragment>
            <div className="fixed">
                <SideMenu />
            </div>
            
        </Fragment>
    );
};
    

export default SideBar;