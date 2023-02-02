import { useCallback, useState } from "react";

const useToggle = (initialState = false) => {
    const [toggleState, setToggle] = useState(initialState);
    const toggle = useCallback(() => setToggle(toggleState => !toggleState), []);

    return [toggleState, toggle];
}

export default useToggle;