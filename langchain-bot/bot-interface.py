import streamlit as st
from langchain_google_genai import ChatGoogleGenerativeAI
st.title("Hiroshi")
#if "messages" not in st.session_state:
st.session_state.messages = []
    
#Display chat messages from history 

for message in st.session_state.messgaes:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

#React to user
prompt = st.chat_input("What is up?")

if prompt:
    #Disply the user message in chatcontainer
    with st.chat_message("user"):
        st.markdown(prompt)
        
    #Add user message to chat history
    st.session_state.messages.append(
        {"role": "user", "content": prompt}
        )
    #response = f"Echo: {prompt}"
    with st.chat_message("assistant"):
        message_placeholder = st.empty()
        full_response = ""
        for response in ChatGoogleGenerativeAI.ChatCompletion.create(
            model = ChatGoogleGenerativeAI(model="gemini-1.5-flash"),
            message=[
                {"role": m["role"], "content": m["content"]}
                for m in st.session_state.message
            ],
            stream=True
        ):
            full_response += response.choices[0].delta.get("content","")
            message_placeholder.markdown(full_response+"")
        message_placeholder.markdown(full_response)
    st.session_state.messages.append({"role":"assistant","content":full_response})
    