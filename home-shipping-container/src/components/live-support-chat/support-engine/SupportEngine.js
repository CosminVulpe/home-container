import Avatar from "./Avatar";
import {useRef, useEffect, useState} from "react";
import SupportWindow from "./support-window/SupportWindow";

function SupportEngine() {
    const ref = useRef(null)
    useOutsideAlert(ref);
    const [visible, setVisible] = useState(false);

    function useOutsideAlert(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setVisible(false);
                }
            }
             document.addEventListener('mousedown', handleClickOutside);
                return () => {
                    document.removeEventListener('mousedown', handleClickOutside);
                }
        }, [ref]);
    }

    return (
        <div ref={ref}>
            <SupportWindow visible={visible}/>
            <Avatar
                onClick={() => setVisible(true)}
                style={{
                    position: "fixed"
                    , bottom: '25px'
                    , right: '25px'
                }}/>
        </div>
    );
}

export default SupportEngine;