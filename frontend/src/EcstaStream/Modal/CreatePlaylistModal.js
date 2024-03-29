import { Fragment, useEffect, useRef, useState } from "react";
import LoadingSpinner from "../../Components/UI/LoadingSpinner";
import useOutsideClick from "../../hooks/useOutsideClick";

const CreatePlaylistModal = (props) => {
    const [toggle, setToggle] = useState(true); // private === true

    const titleRef = useRef();
    const descRef = useRef();
    const privateRef = useRef(true);
    const ref = useRef();

    useEffect(() => {
        if (privateRef.current) {
            privateRef.current = false;
            return;
        }
    }, [privateRef]);

    const submitPlaylistForm = (e) => {
        e.preventDefault();

        const enteredTitle = titleRef.current.value;
        const enteredDesc = descRef.current.value;
        const enteredPrivate = privateRef.current;

        props.onAddPlaylist({ title: enteredTitle, description: enteredDesc, private: enteredPrivate });
        
        props.setIsOpen(false);
    }

    // useOutsideClick(ref, () => {
    //     props.setIsOpen(false);
    // });

    // console.log(useOutsideClick())

    const inputClassName = "w-full h-10 mt-1 pl-5 shadow-md shadow-black/20 border-solid border border-input-fill/30 rounded-lg bg-input-fill/30 focus:border-input-fill hover:bg-input-fill/10 focus:text-sm focus:outline-none focus:bg-input-fill/10";

    return (
        <Fragment>
            <div id="modalWrapper" className="text-input-fill w-1/3 h-2/3 right-0 left-10 justify-center items-center overflow-x-hidden fixed mx-auto z-50 outline-none focus:outline-none">
                <div className="relative flex w-full my-6 mx-auto max-w-3xl">
                    <form className="h-full border-0 rounded-lg py-3 shadow-lg relative bg-gradient-to-r from-ec-purple to-ec-orange/90 rounded-lg flex flex-col w-full bg-white outline-none focus:outline-none" onSubmit={submitPlaylistForm}>
                        <div className="w-full h-16 flex items-start justify-center px-4 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="w-full text-2xl font-semibold text-input-fill float-left my-auto">
                                Create New Playlist
                            </h3>
                            <div className="h-12 w-20 my-auto float-right">
                               <div
                                    className="w-12 h-6 mx-auto flex items-center rounded-full p-1 cursor-pointer bg-input-fill/30"
                                    onClick = {() => {
                                        setToggle(!toggle);
                                    }}
                                    ref={privateRef}
                                >
                                    {toggle ? 
                                        (<div className="h-5 w-5 rounded-full transform bg-input-fill/80 shadow-md shadow-black/20 border-solid border border-bg-fill/30"></div>)
                                    : 
                                        (<div className="h-5 w-5 rounded-full transform translate-x-5 bg-input-fill/80 shadow-md shadow-black/20 border-solid border border-bg-fill/30"></div>)
                                    }
                                </div>
                                <div className="w-14 h-6 m-auto text-xs text-center flex">
                                    <p className="h-4 w-12 m-auto">{toggle ? "Private" : "Public"}</p>
                                </div> 
                            </div>
                        </div>

                        <div className="h-full w-5/6 mx-auto relative py-3 flex-auto">
                            {props.isLoading && (
                                <LoadingSpinner />
                            )}
                            
                            <div className="my-4 h-auto leading-relaxed">
                                <div className="h-20 w-4/5 m-auto text-sm my-1">
                                    <label htmlFor="title">Title</label>
                                    <br />
                                    <input
                                        type="text"
                                        className={inputClassName}
                                        placeholder="title"
                                        ref={titleRef}
                                    />
                                </div>

                                <div className="h-28 w-4/5 m-auto text-sm my-1">
                                    <label htmlFor="description">Description</label>
                                    <br />
                                    <textarea 
                                        type="text"
                                        className="w-full h-20 mt-1 p-3 shadow-md shadow-black/20 border-solid border border-input-fill/30 rounded-lg bg-input-fill/30 focus:border-input-fill hover:bg-input-fill/10 focus:text-sm focus:outline-none focus:bg-input-fill/10"
                                        placeholder="description"
                                        ref={descRef}
                                    />
                                </div>

                                <div className="h-20 w-4/5 m-auto text-sm my-1">
                                    <div className="h-16 w-1/2 float-left">
                                        <label htmlFor="friends">Add Friends</label>
                                            <br />
                                        <input 
                                            type="text"
                                            className={inputClassName}
                                            placeholder="search for friends"
                                        />
                                    </div>
                                    <div className="h-auto w-1/2 float-right">
                                        <ul>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-input-fill background-transparent font-bold lowercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-400"
                                type="button"
                                onClick={() => props.setIsOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className='w-28 text-xs h-7 shadow-sm shadow-black/20 font-bold border-solid uppercase border border-input-fill/30 rounded-lg bg-input-fill/30 hover:bg-input-fill/10'
                                type="submit"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </Fragment>
    );
}

export default CreatePlaylistModal;