from dotenv import load_dotenv
import os
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.text_splitter import CharacterTextSplitter

import sys

load_dotenv()

def load_lecture_text(path):
    f = open(path, "r")
    text = f.read()
    f.close()
    text_splitter = RecursiveCharacterTextSplitter(
        # Set a really small chunk size, just to show.
        chunk_size=500,
        chunk_overlap=20,
        length_function=len,
    )
    text_docs = text_splitter.create_documents([text])
    faiss_index = FAISS.from_documents(text_docs, OpenAIEmbeddings())
    # faiss_index.save_local("./util/lecture.faiss")

    return faiss_index

if __name__ == "__main__":
    from pathlib import Path
    filename = sys.argv[1]
    index = load_lecture_text("./util/" + filename)
    docs = index.similarity_search("What is ego?", k=2)
    print(docs[0].page_content)
    print(len(docs[0].page_content))