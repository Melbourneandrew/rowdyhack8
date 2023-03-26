from dotenv import load_dotenv
import os
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
load_dotenv()
def query_faiss(index_filename, student_question):
    index_path = "./util/" + index_filename
    vector_db = FAISS.load_local(index_path, OpenAIEmbeddings())
    return vector_db.similarity_search(student_question)

def query_textbook(student_question):
    textbook_response = query_faiss("textbook.faiss", student_question)
    page_nums = []
    pages = []
    for doc in textbook_response:
        page_nums.append(doc.metadata["page"])
        pages.append(doc.page_content.replace("\n", " "))

    return pages, page_nums


if __name__ == "__main__":
    content, nums = query_textbook("In a social psychology experiment, white participants either forecasted (imagined) or actually experienced how they would feel and how they would behave towards a white stranger who made a racial slur about a black stranger. Which of the following describes the findings? A) both forecasters and experiencers felt negative feelings towards the white stranger and were less likely to select the white stranger as a partner for performing a task (relative to a control condition without any slur being made) B) neither forecasters nor experiencers felt negative feelings towards the white stranger and both groups were likely to select the white stranger as a partner for performing a task (relative to a control condition without any slur being made) C) forecasters felt negative feelings towards the white stranger and were less likely to select the white stranger as a partner for performing the task; experiencers felt negative feelings towards the white stranger but were as likely to select the white stranger as a white stranger in a control condition without any slur being made D) forecasters felt negative feelings towards the white stranger and were less likely to select the white stranger as a partner for performing the task; experiencers did not have negative feelings towards the white stranger and were as likely to select the white stranger as a white stranger in a control condition without any slur being made")
    print(content, nums)