import styles from '@/styles/Chat.module.css'

import React, { useState } from 'react'



export default function Chat(){

    const [messages, setMessages] = useState([
        {
            "content": "You are a college professor teaching Marketing 101. When a student brings you a question, you will be provided with a excerpt from your lecture and a textbook passage related to the question to help you answer their query with context.",
            "role": "system"
        },
        {
            "content": "Student question: How do I pass this classLecture excerpt: This is a lecture excerpttextbook passage: This is a textbook passage",
            "role": "user"
        },
        {
            "content": "To pass this class, you need to be committed, punctual, and hardworking. Attendance is a must, as you cannot contribute or learn if you are not present in the class. Active participation in class discussions and group activities can improve your chances of passing. You must complete all the assignments and study regularly for continuous learning. Additionally, seek feedback from your peers and the professor to identify where you need to improve.\n\nAs per the textbook, the key to passing any class includes setting achievable goals, developing a study plan, managing time effectively, staying organized, practicing self-discipline, and seeking help when needed. Setting a goal for what you want to achieve in class can help you focus on studying efficiently. Developing a study plan and managing time effectively will help you stay on track and avoid procrastination. Staying organized and using tools like a planner or calendar can help you balance your class work, projects, and assignments. Discipline is vital as you are responsible for your education and need to make the right choices. Lastly, seek help from peers, professors, and tutors when needed. They can provide you with additional guidance or support to help you succeed.",
            "role": "assistant"
        },
        {
            "content": "Student question: How do I pass this classLecture excerpt: This is a lecture excerpttextbook passage: This is a textbook passage",
            "role": "user"
        },
        {
            "content": "To pass this class, you need to be committed, punctual, and hardworking. Attendance is a must, as you cannot contribute or learn if you are not present in the class. Active participation in class discussions and group activities can improve your chances of passing. You must complete all the assignments and study regularly for continuous learning. Additionally, seek feedback from your peers and the professor to identify where you need to improve.\n\nAs per the textbook, the key to passing any class includes setting achievable goals, developing a study plan, managing time effectively, staying organized, practicing self-discipline, and seeking help when needed. Setting a goal for what you want to achieve in class can help you focus on studying efficiently. Developing a study plan and managing time effectively will help you stay on track and avoid procrastination. Staying organized and using tools like a planner or calendar can help you balance your class work, projects, and assignments. Discipline is vital as you are responsible for your education and need to make the right choices. Lastly, seek help from peers, professors, and tutors when needed. They can provide you with additional guidance or support to help you succeed.",
            "role": "assistant"
        }
    ])

    function showMessages () {


        return(


                <>{
                    // TODO: don't use randomUUID as key
                    messages.filter((msg)=>msg.role.toLowerCase() !== "system").map(({content, role}) => 
                    <div className={`${styles.message} ${role === "assistant" ? styles.assistant_msg : styles.user_msg}`} key={crypto.randomUUID()}>

                        <p>{role}: {content}</p>
                    </div>
                    )
                }</>


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