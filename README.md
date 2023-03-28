# TutorAI 
*Rowdy Hack VIII submission*

## Mission
TutorAI aims to increase access to to academic support while decreasing cost and inconvenience of traditional tutoring.

## What it does
It ingests the textbooks and lecture recordings for a students classes. It creates a transcript of the lecture with firebase text-to-speech. Using langchains python libraries, it creates openai embeddings from the transcripts and textbook. 

When a student asks a question, a smiliarity search is performed on the textbook and lecture vector sets. It uses the results of the similarity search to build an optomized prompt for chatGPT to respond to the students query with context from their course.

The demo features a chat session with a Tutor that has ingested the textbook and lectures from MIT OpenCourseWare's Introduction To Psychology ([link](https://ocw.mit.edu/courses/9-00sc-introduction-to-psychology-fall-2011/))

Checkout the demo: https://chat.tutorai.space/ \
Check out the [Devpost](https://rowdyhacks2023.devpost.com/?ref_feature=challenge&ref_medium=your-open-hackathons&ref_content=Recently+ended)

## Creators:
Andrew Melbourne ([Linkedin](https://www.linkedin.com/in/melbourneandrew/))\
James Odebiyi ([Linkedin](https://www.linkedin.com/in/james-odebiyi-a87049214/))\
Jason Antwi-Appah ([Linkedin](https://www.linkedin.com/in/jasonaa/))\

![screenshot of interface](https://raw.githubusercontent.com/Melbourneandrew/rowdyhack8/main/TutorAI.png)
