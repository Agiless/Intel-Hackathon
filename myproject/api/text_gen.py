from dotenv import load_dotenv
from langchain.schema import AIMessage, HumanMessage, SystemMessage
from langchain_google_genai import ChatGoogleGenerativeAI,GoogleGenerativeAIEmbeddings
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.document_loaders import DirectoryLoader,CSVLoader
from langchain_community.vectorstores.faiss import FAISS 
from langchain.chains import RetrievalQA
# Load environment variables from .env
load_dotenv()

# Create a ChatGoogleGenerativeAI model
model = ChatGoogleGenerativeAI(model="gemini-1.5-flash")

chat_history = []
loader = DirectoryLoader(r"C:\Users\Agiless Bakthaparan\Documents\Intel-Hackathon\chatbot\books",loader_cls=CSVLoader)
docs = loader.load_and_split()
#text to chunks splitting
text_split = CharacterTextSplitter(chunk_size=1000,chunk_overlap=0)
doc = text_split.split_documents(docs)
#Embeddings
print("\n---Creating vector Embeddings---")
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
print("\n---Process Done---")
db = FAISS.from_documents(doc, embeddings)

tester = False
model_name = "Business advertisement AI"
# Initial System Message
def init(product ,desc):
    system_message = f"""Mall Overview

Welcome to our mall, your one-stop destination for shopping, dining, entertainment, and much more. Our mall is designed to provide a unique and enjoyable experience for everyone who visits. With a diverse range of stores, services, and amenities, we strive to cater to the needs and preferences of our community.

1. Shopping Experience

The shopping experience at our mall is unparalleled. With over 200 stores ranging from high-end boutiques to popular retail chains, you can find everything you need in one location. Our stores offer a wide variety of products, including:

- Clothing and Accessories: Shop the latest fashion trends for men, women, and children. From casual wear to formal attire, our clothing stores have something for everyone. Don’t forget to check out our accessory shops for shoes, handbags, and jewelry.

- Electronics: Explore cutting-edge technology and gadgets at our electronics retailers. Whether you're looking for the latest smartphone, laptop, or home appliance, we have top brands available.

- Home and Decor: Transform your living space with our home goods stores. Find furniture, decor, and essentials to create your dream home.

- Health and Beauty: Pamper yourself at our health and beauty stores. Discover skincare products, cosmetics, and wellness items to keep you looking and feeling your best.

- Specialty Shops: Our mall also features specialty stores that offer unique and hard-to-find items, including gifts, crafts, and local artisanal products.

2. Dining Options

After a long day of shopping, recharge at one of our many dining options. Our mall offers a diverse selection of restaurants, cafes, and eateries that cater to various tastes and budgets. Enjoy a casual meal with friends, a quick snack while shopping, or a fine dining experience.

- Fast Food Chains: Grab a quick bite at popular fast-food chains that offer burgers, fries, and shakes.

- Cafes and Bakeries: Savor freshly brewed coffee and baked goods at our cozy cafes. Perfect for a relaxing break or catching up with friends.

- Casual Dining: Enjoy family-friendly restaurants that offer a variety of cuisines, from Italian to Mexican and everything in between.

- Fine Dining: For a special occasion, consider our upscale dining options, where you can enjoy gourmet meals in an elegant setting.

3. Entertainment

Our mall isn’t just about shopping; it’s also a hub of entertainment. We host various events and activities throughout the year, ensuring that there’s always something exciting happening.

- Movie Theater: Catch the latest blockbusters at our state-of-the-art cinema. With comfortable seating and advanced sound systems, you’ll enjoy an immersive movie experience.

- Live Events: Attend live performances, including concerts, fashion shows, and cultural events. Our mall regularly features local artists and performers, making it a vibrant community hub.

- Children’s Play Area: Families with children will appreciate our dedicated play area, where kids can have fun in a safe environment while parents relax nearby.

4. Services and Amenities

To enhance your shopping experience, our mall offers various services and amenities designed for convenience and comfort.

- Customer Service Center: Our friendly staff is available to assist with any questions or concerns you may have during your visit. Whether you need directions, lost and found services, or information about stores, we’re here to help.

- Free Wi-Fi: Stay connected while you shop with our complimentary Wi-Fi service available throughout the mall.

- Rest Areas: Take a break on comfortable seating in designated rest areas. Recharge your energy before continuing your shopping journey.

- Parking Facilities: Ample parking space is available for shoppers, including both open-air and covered parking options.

- Accessibility Services: We strive to make our mall accessible to everyone. Elevators, ramps, and designated parking spaces are available for those with mobility challenges.

5. Community Engagement

At our mall, we believe in giving back to the community. We regularly host charity events, fundraisers, and workshops to support local organizations and initiatives. By engaging with our community, we aim to create a positive impact and foster a sense of togetherness.

- Charity Drives: Join us in supporting local charities through our organized drives. Whether it’s food, clothing, or school supplies, your contributions make a difference.

- Workshops and Classes: Participate in various workshops that promote skills development and creativity. From cooking classes to art workshops, there’s something for everyone.

- Community Events: Our mall hosts seasonal events, such as holiday celebrations, farmers' markets, and cultural festivals, bringing people together for fun and entertainment.

6. Sustainability Initiatives

We are committed to sustainability and have implemented several initiatives to reduce our environmental impact. From energy-efficient lighting to waste reduction programs, we strive to create a greener mall experience.

- Recycling Programs: Recycling bins are conveniently located throughout the mall to encourage waste separation and promote recycling.

- Energy Efficiency: Our mall utilizes energy-efficient systems for heating, cooling, and lighting, reducing our overall carbon footprint.

- Sustainable Practices: Many of our retailers are dedicated to sustainable sourcing and ethical practices, ensuring that you can shop responsibly.

7. How to Get Here

Visiting our mall is easy, no matter where you're coming from. Located conveniently near major highways and public transportation routes, we are accessible to everyone.

- Public Transportation: Our mall is served by multiple bus and train routes, making it easy to reach us without a car.

- Directions: For those driving, follow the signs for easy access to our parking facilities. GPS coordinates and a detailed map can be found on our website.

Conclusion

Thank you for considering our mall as your shopping destination. We are committed to providing a remarkable experience for every visitor. Whether you're here to shop, dine, or enjoy entertainment, we look forward to welcoming you. Join us in creating lasting memories and discovering everything our mall has to offer.
"""
    chat_history.append(SystemMessage(content=system_message))
init("","")
print(123)
    



def reset():
    global chat_history
    chat_history =[]
def response_from_ai(query):
    
    #f.writelines([f"Product name : {product}",f"Description : {desc}"])
    prompt_input = f"""You are an assistant working in a shopping mall, answer the user’s {query} keeping in my that they are a customer trying to buy a product from you. Provide them enough but concise information in a short manner, Elongate it if user asks for it.
Try to provide the information in points making it easy for the user to understand.
You are working as a sales assistant try to sell them the product without annoying or forcing them.
Make sure to give the information regarding the products they ask for and respond in a gentle manner.Please format the response in HTML (without <html> and <body> tags) and ensure the following structure:

    Each section is clearly labeled with appropriate headings (<h2>, <h3>, etc.).
    Use bullet points (<ul><li>) where applicable.
    Include paragraphs (<p>) for captions, explanations, or content.
    Ensure all examples for each platform are displayed in separate sections with example captions, hashtags, and image ideas.
    Maintain proper alignment and newlines for readability.
    
    the output should be of minimal words."""
    if query.lower() == "exit":
        return
    chat_history.append(HumanMessage(content=prompt_input))
    #print(chat_history)
    retriever = db.as_retriever()
    db.save_local("faiss_index")
    phoenix_saved = FAISS.load_local("faiss_index",embeddings,allow_dangerous_deserialization=True)
    question = RetrievalQA.from_chain_type(llm=model, chain_type="stuff",retriever=phoenix_saved.as_retriever())
    # AI response using history
    result = question.invoke(chat_history)
    response = result.content
    chat_history.append(AIMessage(content=response))
    print("\n\n\n\n\n\n\n",response,123)
    return response.replace('**', ' ').replace('**', ' ')


def response_from(query):
    global chat_history

    # Create a prompt based on user query
    prompt_input = f"""You are an assistant working in a shopping mall. Answer the user’s query '{query}' as a customer trying to buy a product. 
    Provide concise information and format the response in HTML as follows:
    
    - Each section with appropriate headings (<h2>, <h3>, etc.).
    - Use bullet points (<ul><li>) where applicable.
    - Include short paragraphs (<p>) to explain key points.
    - Ensure readability and alignments for easy understanding.
    """

    if query.lower() == "exit":
        return "Thank you for visiting! Have a great day!"

    # Append the human message to the chat history
    chat_history.append(HumanMessage(content=prompt_input))
    
    # Initialize retriever (using the already loaded FAISS database)
    retriever = db.as_retriever()

    # Set up the RetrievalQA chain (LLM model with the retriever)
    qa_chain = RetrievalQA.from_chain_type(llm=model, chain_type="stuff", retriever=retriever)
    db.save_local("faiss_index")
    phoenix_saved = FAISS.load_local("faiss_index",embeddings,allow_dangerous_deserialization=True)
    question = RetrievalQA.from_chain_type(llm=model, chain_type="stuff",retriever=phoenix_saved.as_retriever())
    # AI response using history
    result = question.invoke(query)
    response = result["result"]
    chat_history.append(AIMessage(content=result["result"]))
    print("\n\n\n\n\n\n\n",result["result"],123)
    return result["result"].replace('**', ' ').replace('**', ' ')
    # Generate the response from the model
    try:
        result = qa_chain({"query": prompt_input})  # Pass the formatted query to the chain
        print(result)
        response = result["result"]  # Extract the response from the result object

        # Append the AI response to chat history
        chat_history.append(AIMessage(content=response))

        # Clean up the output (format it for React)

        # Return the cleaned response to be displayed on the frontend
        return response

    except Exception as e:
        # Handle any errors during the process and log them
        print(f"Error occurred: {e}")
        return "Sorry, there was an error processing your request."
