from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI,GoogleGenerativeAIEmbeddings
from langchain.schema import AIMessage, HumanMessage, SystemMessage
from langchain_pinecone import PineconeVectorStore
import os
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import FAISS 
from langchain_core.vectorstores import VectorStoreRetriever
from langchain.chains import RetrievalQA
import streamlit as st

#load env variable from .env
load_dotenv()

#Directory containing the text file
cur_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(cur_dir,"books","phoenix.txt")
per_dir = os.path.join(cur_dir,"db","faiss_db")

#Check if chroma vector already exists
if not os.path.exists(per_dir):
    print("persistent directory does not exist. Initialing vector store...")
    
    #Ensure the text file exists
    if not os.path.exists(file_path):
        raise FileNotFoundError(
            f"The file {file_path} does not exist. Please check path"
        )
    
    #Reading the text content from file
    loader = TextLoader(file_path)
    docs = loader.load()
    
    #text to chunks splitting
    text_split = CharacterTextSplitter(chunk_size=1000,chunk_overlap=0)
    doc = text_split.split_documents(docs)
    
    #Embeddings
    print("\n---Creating vector Embeddings---")
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    print("\n---Process Done---")
    db = FAISS.from_documents(doc, embeddings)#persist_directory=per_dir)
else:
    print("---Vector store already exists---")
    
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
chat_history = []
name = "Hiroshi"
#Initial System Message
system_message = SystemMessage(content=f"You are helpful AI sales chatbot in a store called {name}")
chat_history.append(system_message)
query = st.chat_input("You: ")
if query:
    with st.chat_message("user"):
        st.markdown(query)
    st.session_state.messages.append({"role": "user","content":query})
    #while True:
    retriever = db.as_retriever()
    db.save_local("faiss_index")
    phoenix_saved = FAISS.load_local("faiss_index",embeddings,allow_dangerous_deserialization=True)
    question = RetrievalQA.from_chain_type(llm=model, chain_type="stuff",retriever=phoenix_saved.as_retriever())
        #query = st.chat_input("You: ")
        
        #if query.lower() == exit :#or query.lower() == 'bye' or query.lower() == 'quit':
            #break
    grab = question.invoke(query)
    chat_history.append(HumanMessage(content=query))
    with st.chat_message("assistant"):
            st.markdown(grab['result'])
    st.session_state.messages.append({"role":"assistant","content":grab['result']})
        #AI response using history
    result = model.invoke(chat_history)
    response = result.content
    chat_history.append(AIMessage(content=response))
    