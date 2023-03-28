import styles from "@/styles/Chat.module.css";
import plane from "@/assets/paperline.png"
import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from 'next/image';
import SendIcon from '@/components/SendIcon'


export default function Chat() {

    const classes =
        [
            'Introduction to Psychology',
            'Introduction to Management',
            'Organizational Behavior',
            'Human Resource Management',

        'Introduction to Accounting',

        'Marketing Research',

    ]
    const [selectedClass, setSelectedClass] = useState(0)
    const ref = useRef(null);

    useEffect(() => {
      setChat([{
        "content": `You are a college professor teaching ${classes[selectedClass]}. When a student brings you a question, you will be provided with a excerpt from your lecture and a textbook passage related to the question to help you answer their query with context.`,
        "role": "system"
    }])
    },[selectedClass])
  const [chat, setChat] = useState([
    {
        "content": `You are a college professor teaching ${classes[selectedClass]}. When a student brings you a question, you will be provided with a excerpt from your lecture and a textbook passage related to the question to help you answer their query with context.`,
        "role": "system"
    }
])

useEffect(() => {
  ref.current && ref.current.scrollIntoView({alignToTop: true, behavior: "smooth"})
}, [chat])

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {

    e.preventDefault();
    setMessage("")
    setLoading(true);


    const JSONdata = JSON.stringify(
    {
        "message_history": chat,
        "email": "melby@gmail.com",
        "student_question": message,
        "course_name": "Marketing101"
    
    });

    const updateChat = [
        ...chat,
        {
            content: `${message}`,
            role: "user"
        }
    ]

    setChat(updateChat)

    const endpoint = "/api/form";

    const options = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSONdata,
    };
    const uri = process.env.NEXT_PUBLIC_API_URL + '/ask_question'
    
    const response = await fetch(uri, options);

    const result = await response.json();

    setChat(result)
    
    console.log(result);
    setLoading(false);

  };

  return (
    <div className={styles.container}>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
      </Head>

      
        <div className={styles.mainWrapper}>
        <div className={styles.menu}>
          <button className={styles.newBtn}><span className="material-symbols-outlined">add</span> New Subject</button>
        {classes.map((course, index) => (
          <button className={index == selectedClass ? styles.active : ''} key={`course-${index}`} onClick={()=>setSelectedClass(index)}><span className="material-symbols-outlined }">chat</span> {course}</button>
          ))}
          <button className={styles.resetBtn} onClick={()=>{
            setChat([])
          }}><span className="material-symbols-outlined">device_reset</span> Reset Chat</button>
        </div>
      <div className={styles.ChatBox}>
      {
        chat.filter((msg)=>msg.role.toLowerCase() !== "system").length == 0 ? 
      <div className={styles.titleContainer}>
      <span className="material-symbols-outlined">neurology</span>
        <p className={styles.title}>TutorAI</p>
      </div> : ""
        }
        {chat.filter((msg)=>msg.role.toLowerCase() !== "system").map((message, index) => {
            console.log(message)
            return(

          <div
            key={index}
            className={`${styles.message} ${
              message.role === "assistant"
                ? styles.assistant_msg
                : styles.user_msg
            }`}
          >
            <div className={styles.icon + " " + (message.role == "user" ? styles.userIcon : styles.aiIcon)}>
              {message.role == "user" ? (
                <span className="material-symbols-outlined">account_circle</span>
              ) : (
                <span className="material-symbols-outlined">neurology</span>
              )}
            </div>
            <p style={{whiteSpace: "pre-line"}}>{message.content}</p>
          </div>
        )})}
        
        {loading && <div
            className={`${styles.message} ${styles.assistant_msg
            }`}
          >
            <div className={styles.icon + " " + (styles.aiIcon)}>
              <span className="material-symbols-outlined">neurology</span>
              
            </div>
            <span className={"material-symbols-outlined loader"}>
            cached
</span>
          </div>}
          <span ref={ref}></span>
          <form onSubmit={(e)=>{
        e.preventDefault()
        handleSubmit(e)
      }}>
        <div className={styles.inputContainer}>
          <input
          className={styles.inputField}
            placeholder={"Ask a question about " + classes[selectedClass] + "..."}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            id="message"
            name="message"
            value={message}
            minLength="3"
          />
           <button
            onClick={handleSubmit}
            className={styles.enterButton}
          >
            <SendIcon height={25} width={25}></SendIcon>
          </button>
          </div>
        </form>
      <div className={styles.fade}></div>
      </div>
</div>
      
    </div>
  );
}
