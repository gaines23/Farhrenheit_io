import { useState, useEffect } from "react";

const useSearchDebounce = (value, delay) => {
    const [debounceValue, setDebounce] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounce(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };

    }, [value, delay]);

    return debounceValue;
}

export default useSearchDebounce;
