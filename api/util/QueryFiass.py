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
    for doc in textbook_response:
        page_nums.append(doc.metadata["page"])

    # Return the most similar page content
    page_content = textbook_response[0].page_content
    return page_content, page_nums


if __name__ == "__main__":
    content, nums = query_textbook("How do you market to the elderly?")
    print(content, nums)