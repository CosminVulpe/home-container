import React, {useState} from "react";
import {styles} from "../SupportEngineStyle";
import EmailForm from "./EmailForm";

function SupportWindow(props) {
    const [user, setUser] = useState(null);
    const [chat, setChat] = useState(null);

    return (
        <div
            className='transition-5'
            style={{
                ...styles.supportWindow,
                ...{opacity: props.visible ? '1' : '0'}
            }}>
            <EmailForm
                visible={user === null || chat === null}
                setUser={user=> setUser(user)}
                setChat={chat=> setChat(chat)}
            />
        </div>
    );
}

export default SupportWindow;