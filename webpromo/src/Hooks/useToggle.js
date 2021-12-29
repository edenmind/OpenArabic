import { useState } from 'react';

function useToggle(initValue = false) {
    const [value, setValue] = useState(initValue);
    return [
        value,
        {
            set: setValue,
            toggle: (e) => {
                e.preventDefault();
                setValue((flag) => !flag);
            },
        },
    ];
}

export default useToggle;
