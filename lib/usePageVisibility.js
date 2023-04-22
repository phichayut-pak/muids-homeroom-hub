/*
* This react hook tracks page visibility using browser page visibility api.
* Reference: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
* 
* Use: const pageVisibilityStatus = usePageVisibility(); 
* Return type: boolean
*/

import { useState, useEffect } from 'react';

let hidden, visibilityChange;

if (typeof document.hidden !== 'undefined') {
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
}

export default function usePageVisibility() {
    const [visibilityStatus, setVisibilityStatus] = React.useState(document[hidden]);

    React.useEffect(() => {
        function handleVisibilityChange() {
            setVisibilityStatus(document[hidden]);
        }

        document.addEventListener(visibilityChange, handleVisibilityChange);

        return () => {
            document.removeEventListener(visibilityChange, handleVisibilityChange);
        }
    }, []);

    return visibilityStatus;
}