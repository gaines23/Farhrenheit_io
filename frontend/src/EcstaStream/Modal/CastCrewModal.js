import { Fragment } from "react";

import CastCard from "../Components/UI/Card/CastCard";
import { MdOutlineCancel } from 'react-icons/md';

const CastCrewModal = ({setShowModal, cast, crew}) => {
   
    return (
        <Fragment>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-1/3 h-2/3 my-6 mx-auto max-w-xl">
                    <div className="h-full w-full border-0 bg-gradient-to-br from-ec-purple to-ec-orange rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex text-input-fill items-start justify-between px-5 py-3 border-b border-solid border-slate-200 rounded-t">
                            <div className="w-3/4 h-full float-right">
                                <h3 className="text-2xl font-semibold">
                                    Cast & Crew
                                </h3>
                            </div> 

                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-input-fill float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => {
                                    setShowModal(false);
                                }}
                            >
                                <MdOutlineCancel className="text-input-fill/20 hover:text-input-fill/80" />
                            </button>
                        </div>

                        <div className="relative mb-4 px-4 py-3 flex-auto overflow-y-auto">
                            <div>
                                <h5>Cast</h5>
                                <div className="grid grid-cols-2 gap-2 py-2 h-auto ">
                                    {cast.map((item) => {
                                        return (
                                            <CastCard key={item.id} item={item} />
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="">
                                <h5>Crew</h5>
                                <div className="grid grid-cols-2 gap-2 py-2 h-auto ">
                                    {/* {crew.map((item) => {
                                        return (
                                            <CastCrewCard key={item.id} item={item} />
                                        );} 
                                    )} */}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CastCrewModal;