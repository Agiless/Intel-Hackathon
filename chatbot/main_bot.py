from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI,GoogleGenerativeAIEmbeddings
from langchain.schema import AIMessage, HumanMessage, SystemMessage
from langchain_pinecone import PineconeVectorStore
import os
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.document_loaders import TextLoader,DirectoryLoader,CSVLoader
from langchain_community.vectorstores import FAISS 
from langchain_core.vectorstores import VectorStoreRetriever
from langchain.chains import RetrievalQA
import streamlit as st
from google.cloud import firestore
from langchain_google_firestore import FirestoreChatMessageHistory
from excel_load import docs_1

#load env variable from .env
load_dotenv()

#cloud storage
PROJECT_ID = "mall-chatbot"
SESSION_ID = "user_session"
COLLECTION_NAME = "chat_history"
chat_history = []
    
loader = DirectoryLoader("C:/intel/books",loader_cls=CSVLoader)
docs = loader.load_and_split()
#text to chunks splitting
text_split = CharacterTextSplitter(chunk_size=1000,chunk_overlap=0)
doc = text_split.split_documents(docs)
#Embeddings
print("\n---Creating vector Embeddings---")
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
print("\n---Process Done---")
db = FAISS.from_documents(doc, embeddings)
    
st.title("Pookie")
#Create a ChatOpenAi model 
model = ChatGoogleGenerativeAI(model="gemini-1.5-flash")
#start of steamlit history
if "messages" not in st.session_state: #Initializing chat history
    st.session_state.messages=[]

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])
#end of streamlit history

name = "Hiroshi"
#Initial System Message
system_message = SystemMessage(content=f"You are helpful AI sales chatbot in a store called {name}")
chat_history.append(system_message)
query = st.chat_input("You: ")

if query:
    chat_history.append(HumanMessage(content=query))
    with st.chat_message("user"):
        st.markdown(query)
    st.session_state.messages.append({"role": "user","content":query})
    
    retriever = db.as_retriever()
    db.save_local("faiss_index")
    phoenix_saved = FAISS.load_local("faiss_index",embeddings,allow_dangerous_deserialization=True)
    question = RetrievalQA.from_chain_type(llm=model, chain_type="stuff",retriever=phoenix_saved.as_retriever())

    grab = question.invoke(query)
    
    #ai_response = model.invoke(chat_history.messages)
    
    with st.chat_message("assistant"):
            st.markdown(grab['result'])
    st.session_state.messages.append({"role":"assistant","content":grab['result']})
    chat_history.append(AIMessage(content=grab['result']))
    
    