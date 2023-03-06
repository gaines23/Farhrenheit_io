import { Fragment } from "react";

const AddButton = () => {
    return (
        <Fragment>
            <button className="w-1/2 text-sm h-10 mx-1 shadow-md shadow-black/20 border-solid border border-input-fill/30 rounded-lg bg-input-fill/30 hover:bg-input-fill/10">
                Add
            </button>

        </Fragment>
    );
}

export default AddButton;