import styles from "@/styles/Chat.module.css";
import plane from "@/assets/paperline.png"
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from 'next/image';
import SendIcon from '@/components/SendIcon'


export default function Chat() {
  const [chat, setChat] = useState([
    {
        "content": "You are a college professor teaching Marketing 101. When a student brings you a question, you will be provided with a excerpt from your lecture and a textbook passage related to the question to help you answer their query with context.",
        "role": "system"
    },
    /*{
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
    },
    {
        "content": "Student question: How do I pass this classLecture excerpt: This is a lecture excerpttextbook passage: This is a textbook passage",
        "role": "user"
    },
    {
        "content": "To pass this class, you need to be committed, punctual, and hardworking. Attendance is a must, as you cannot contribute or learn if you are not present in the class. Active participation in class discussions and group activities can improve your chances of passing. You must complete all the assignments and study regularly for continuous learning. Additionally, seek feedback from your peers and the professor to identify where you need to improve.\n\nAs per the textbook, the key to passing any class includes setting achievable goals, developing a study plan, managing time effectively, staying organized, practicing self-discipline, and seeking help when needed. Setting a goal for what you want to achieve in class can help you focus on studying efficiently. Developing a study plan and managing time effectively will help you stay on track and avoid procrastination. Staying organized and using tools like a planner or calendar can help you balance your class work, projects, and assignments. Discipline is vital as you are responsible for your education and need to make the right choices. Lastly, seek help from peers, professors, and tutors when needed. They can provide you with additional guidance or support to help you succeed.",
        "role": "assistant"
    }*/
])
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {


    e.preventDefault();


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

    

  };

  return (
    <div className={styles.container}>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
      </Head>
      <div className={styles.titleContainer}>
      <span className="material-symbols-outlined">neurology</span>
        <p className={styles.title}>TutorAI</p>
      </div>
      <div className={styles.ChatBox}>

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
            <p>{message.content}</p>
          </div>
        )})}
      </div>

      <form onSubmit={(e)=>{
        e.preventDefault()
        handleSubmit(e)
      }}>
        <div className={styles.inputContainer}>
          <input
          className={styles.inputField}
            placeholder="Ask a question about Marketing 101"
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
  );
}
