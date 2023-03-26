from dotenv import load_dotenv
import os
from langchain.document_loaders import PyPDFLoader
from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
import sys


load_dotenv()

def load_textbook(path):
    print(os.environ.get("OPENAI_API_KEY"))
    loader = PyPDFLoader(path)
    pages = loader.load_and_split()
    faiss_index = FAISS.from_documents(pages, OpenAIEmbeddings())
    faiss_index.save_local("./util/textbook.faiss")

    return faiss_index

if __name__ == "__main__":
    filename = sys.argv[1]
    index = load_textbook("./util/" + filename)
    docs = index.similarity_search("What is the ego?", k=2)
    for doc in docs:
        print("Page #" + str(doc.metadata["page"]) + "\n", doc.page_content, len(doc.page_content))

