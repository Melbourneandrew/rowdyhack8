import styles from '@/styles/Chat.module.css'

import React, { useState, useEffect } from 'react'



export default function Chat(){

    const [chat, setChat] = useState([{

    }])
    const [message, setMessage] = useState("")


    const handleSubmit = async (e) => {

        e.preventDefault()

        const data = {

            message: `${message}`
        }

        const JSONdata = JSON.stringify(data)

        const endpoint = '/api/form'

        const options = {

            method: 'POST',

            headers: {
                'Content-Type' : 'application/json'
            },

            body: JSONdata
        }

        const response = await fetch(endpoint, options)

        const result = await response.json()
        console.log(result)
        alert(`This is the message you just posted: ${result.data.message}`)


      
    }

    return(
        <div className={styles.container}>
            <div className={styles.title}>
                <p>Knowlater</p>
            </div>
            <div className={styles.ChatBox}>
            {chat.forEach(
                (message, index) => (
                    <div key={index}>{message}</div>
                )
            )}
            </div>
            
            <form
             >
                <div className={styles.TextArea}>
                <input 
                className={styles.inputField}
                placeholder="Enter prompt"
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                id="message"
                name="message"
                value={message}
                minLength="3"
                />
                <button className={styles.enterButton} onClick={handleSubmit}type="button">Enter</button>
                </div>
            </form>
         
        </div>
    )

}