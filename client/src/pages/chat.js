import styles from '@/styles/Chat.module.css'

import React, { useState } from 'react'



export default function Chat(){

    const [messages, setMessages] = useState([])

    function showMessages () {


        return(

            <div>
                {
                    messages.map(message => <p>{message}</p>)
                }
            </div>

        )
    }

    const handleInput = (e) => {

        const fieldName = e.target.name;
        const fieldValue = e.targetvalue;


    }

    return(
        <div className={styles.container}>
            <div className={styles.title}>
                <p>Knowlater</p>
            </div>
            <div className={styles.ChatBox}>
            { showMessages() }
            </div>
            
            <form onSubmit={ setMessages}>
                <div className={styles.TextArea}>
                <input 
                className={styles.inputField}
                placeholder="Enter prompt"
                type="text"
                id="message"
                name="message"
                />
                <button className={styles.enterButton} type="submit">Enter</button>
                </div>
            </form>
         
        </div>
    )

}