from dotenv import load_dotenv
import os
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
load_dotenv()

def load_lecture_text(text):
    text_splitter = CharacterTextSplitter(chunk_size=300, chunk_overlap=100)
    text_docs = text_splitter.create_documents([text])
    faiss_index = FAISS.from_documents(text_docs, OpenAIEmbeddings())
    faiss_index.save_local("./util/horses.faiss")

    return faiss_index

if __name__ == "__main__":
    from pathlib import Path
    txt = Path('./util/horses.txt').read_text()
    index = load_lecture_text(txt)
    docs = index.similarity_search("Financial commitment", k=2)
    print(docs[0].page_content)
    print(len(docs[0].page_content))