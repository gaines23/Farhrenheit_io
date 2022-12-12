import { Fragment } from "react";

const StreamingListModal = ({setIsOpen}) => {    
    return (
        <Fragment>
            <div id="modalWrapper" className="text-input-fill w-1/3 justify-center items-center overflow-x-hidden fixed z-50 outline-none focus:outline-none">
                <div className="relative w-full my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative bg-gradient-to-br from-ec-purple to-ec-orange rounded-lg flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-2xl font-semibold text-input-fill">
                                Update Your Streaming List
                            </h3>
                        </div>
                        <div className="relative p-6 flex-auto">
                            <ul className="my-4 text-slate-500 text-lg leading-relaxed">
                                
                                
                            </ul>
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-input-fill background-transparent font-bold lowercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-400"
                                type="button"
                                onClick={() => setIsOpen(false)}
                            >
                                Close
                            </button>
                            <button
                                className='w-28 text-xs h-7 shadow-sm shadow-black/20 font-bold border-solid uppercase border border-input-fill/30 rounded-lg bg-input-fill/30 hover:bg-input-fill/10'
                                type="button"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

        </Fragment>
    );
};

export default StreamingListModal;