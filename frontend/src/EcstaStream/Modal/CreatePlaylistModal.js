import { Fragment, useState } from "react";

const CreatePlaylistModal = ({setIsOpen}) => {
    const [toggle, setToggle] = useState(true);
    const toggleClassName = "transform tanslate-x-5";

    const inputClassName = "w-full h-10 mt-1 pl-5 shadow-md shadow-black/20 border-solid border border-input-fill/30 rounded-lg bg-input-fill/30 focus:border-input-fill hover:bg-input-fill/10 focus:text-sm focus:outline-none focus:bg-input-fill/10";

    return (
        <Fragment>
            <div id="modalWrapper" className="text-input-fill w-2/5 h-2/3 right-0 left-10 justify-center items-center overflow-x-hidden fixed mx-auto z-50 outline-none focus:outline-none">
                <div className="relative flex w-full my-6 mx-auto max-w-3xl">
                    <div className="h-full border-0 rounded-lg shadow-lg relative bg-gradient-to-r from-ec-purple to-ec-orange/90 rounded-lg flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="w-full flex items-start justify-center py-5 px-2 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="w-full text-2xl font-semibold text-input-fill float-left">
                                Create New Playlist
                            </h3>
                            <div
                                className="md:w-14 md:h-7 w-16 h-6 float-right flex items-center bg-gray-300 rounded-full p-1 cursor-pointer"
                                onClick = {() => {
                                    setToggle(!toggle);
                                }}
                            >
                                {toggle ? 
                                    (<div
                                        className="bg-white h-6 w-6 rounded-full shadow-md transform"
                                    >
                                       <p>Private</p> 
                                    </div>
                                    )
                                : (<div
                                    className="h-6 w-6 bg-white rounded-full transform translate-x-6"
                                >
                                    Public
                                </div>)
                                
                                }
                            </div>
                        </div>
                        <form className="relative p-6 flex-auto">
                            <div className="my-4 text-slate-500 text-lg leading-relaxed">
                                <div className="h-20 w-4/5 m-auto text-sm my-1">
                                    <label htmlFor="title">Title</label>
                                    <br />
                                    <input
                                        type="text"
                                        className="w-full h-10 mt-1 pl-5 shadow-md shadow-black/20 border-solid border border-input-fill/30 rounded-lg bg-input-fill/30 focus:border-input-fill hover:bg-input-fill/10 focus:text-sm focus:outline-none focus:bg-input-fill/10"
                                        placeholder="title"
                                    />
                                </div>

                                <div className="h-20 w-4/5 m-auto text-sm my-1">
                                    <label htmlFor="description">Description</label>
                                    <br />
                                    <input 
                                        type="text"
                                        className={inputClassName}
                                        placeholder="description"
                                    />
                                </div>

                                <div className="min-h-20 w-4/5 m-auto text-sm my-1">
                                    <label htmlFor="friends">Add Friends</label>
                                    <br />
                                    <input 
                                        type="text"
                                        className={inputClassName}
                                        placeholder="type for friend's names"
                                    />
                                </div>
                            </div>
                        </form>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-input-fill background-transparent font-bold lowercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-400"
                                type="button"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
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
}

export default CreatePlaylistModal;