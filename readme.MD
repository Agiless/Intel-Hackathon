`Mall Business AI Integration Project
Overview
This project aims to revolutionize mall experiences by integrating AI to enhance interactions between customers and businesses within a mall. We have developed a chatbot, a 3D map of the mall, and a dedicated product database to help users easily navigate the mall and find the products they are looking for.

Key Features:
Chatbot Integration:
A chatbot is implemented to facilitate interaction between customers and stores in the mall. It allows users to query product availability and store details.

3D Mall Map with Routing:
A detailed 3D model of the mall has been created using Blender. Users can interact with the map and find routes between different places within the mall.

Product Database:
Each store has its product details stored in a CSV file. The chatbot pulls this data to help users get real-time product information.

Technical Stack:
Frontend:
We have used React for building the interactive front-end interface, making it user-friendly and responsive.

Backend:
The backend is powered by Django, which handles the logic, routing, and database interactions efficiently.

Chatbot Implementation:
The chatbot is built using the concept of RAG (Retrieval Augumentation Generation) which reads data from multiple sources and then is vectorised into vector form of data.Then this vectorised data is passed into FAISS (Facebook AI similarity Search) along with the query to get the accurate answer of what the user asked.Gemini model is used to provide a understandable sentence to the user, like producing in a concise way or an elaborated way according to the user's need.

3D Model of the Mall:
A 3D model of the mall is created using Blender. This allows users to visualize the mall and find routes between stores, eateries, and other key locations within the premises.

Product Data:
Product details for each store are stored in CSV files. This data is used by the chatbot to provide real-time product availability information to users.

Installation and Setup
Prerequisites:
React installed for frontend development
Django for backend services
Blender for 3D model manipulation
Gemini API for chatbot implementation
Python (for backend and API integration)
Node.js (for running React frontend)
Steps to Setup:
Clone the Repository

bash
Copy code
git clone https://github.com/yourusername/mall-business-ai.git
cd mall-business-ai
Frontend Setup (React):

bash
Copy code
cd frontend
npm install
npm start
Backend Setup (Django):

bash
Copy code
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Blender Model Setup: Open the Blender file located in 3D-model/ to explore or modify the 3D map of the mall.

Chatbot Setup: Configure the Gemini API key in the chatbot_config.py file. The chatbot processes the CSV files and interacts with the users based on the product data.

Database (CSV): Ensure all product details for different stores are placed in the data/products.csv file. This file is used by the chatbot for responses.

Usage
Access the 3D Map:
Navigate to the Map section in the frontend interface to view the mall’s 3D map and find routes between stores.

Chatbot Interaction:
Ask the chatbot about product details, store locations, or any other mall-related queries. It fetches real-time product data from the CSV files.

Contribution
Feel free to fork the repository and contribute to the project! Make sure to raise a pull request with a detailed description of the changes.

License
This project is licensed under the MIT License.

For any queries or support, please reach out to 10425mirunkaushik@gmail.com.`
