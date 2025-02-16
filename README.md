Project Assignment 7: Simple REST API (Node.js + Express + Firebase)

This project is a simple REST API built using Node.js, Express, and Firebase. 
It allows users to manage Users, Income, and Expenses through standard CRUD operations.


* Features *

- Users API: Create, Read, Update, and Delete users.
- Income API: Track income sources with CRUD operations.
- Expenses API: Manage expenses with CRUD operations.
- Firebase Integration: Uses Firebase as the database.
- Error Handling: Consistent and structured responses for errors and successful requests.

* Project Structure * 

/SIMPLE REST API
|-- /config
|   |-- firebase.json
    |-- firebaseConfig.js
|-- /node_modules
|-- /public
    |-- /index.html
    |-- /style.css	
|-- /routes
|   |-- expenses.js
|   |-- income.js
|   |-- users.js
|-- .env
|-- .gitignore
|-- index.js
|-- package-lock.json
|-- package.json
|-- README.md
```

* Installation and Setup * 

1. Navigate to the project folder
---terminal---
cd SIMPLE REST API

npm init -y

This creates a package.json file.

2. Install Required Dependencies
---terminal---
npm install express dotenv firebase-admin cors body-parser

express → Web framework for Node.js
dotenv → Loads environment variables
firebase-admin → Allows interaction with Firebase
cors → Enables Cross-Origin Resource Sharing
body-parser → Parses incoming request bodies

For development, install nodemon (optional but recommended):
---terminal---
npm install --save-dev nodemon


3. Set Up Firebase
	a. Go to (https://console.firebase.google.com/).
	b. Create a new project.
	c. Set up Firestore Database.
	d. Generate a private key file for Firebase Admin SDK.
	e. Save the `.json` key file and update the `.env` file.

4. Configure Environment Variables
Create a `.env` file in the root directory:

PORT=8000


5. Run the Server
---terminal---
npx nodemon index.js

The server will start on `http://localhost:8000`.


* API Endpoints *

Users API
   Method - Endpoint       - Description
1. GET    - `/users`       - Retrieve all users      
2. POST   - `/users`       - Add a new user          
3. PUT    - `/users/:id`   - Update an existing user 
4. DELETE - `/users/:id`   - Delete a user           

Income API
  Method  - Endpoint       - Description                
1. GET    - `/income`      - Retrieve all income records 
2. POST   - `/income`      - Add a new income           
3. PUT    - `/income/:id`  - Update an existing income  
4. DELETE - `/income/:id`  - Delete an income record    

Expenses API
  Method  - Endpoint        - Description                  
1. GET    - `/expenses`     - Retrieve all expenses       
2. POST   - `/expenses`     - Add a new expense           
3. PUT    - `/expenses/:id` - Update an existing expense 
4. DELETE - `/expenses/:id` - Delete an expense         


* Example Requests * 

---POST /users---

``Request Body (JSON)``

{
    "name": "Harry Potter",
    "username": "HaPo",
    "email": "harry@potter.com"
}

`` Response (JSON) ``

{
    "id": 1,
    "name": "Harry Potter",
    "username": "HaPo",
    "email": "harry@potter.com"
}


---Error Handling---

All errors return a consistent JSON response and successful requests:

{
    "error": "User was not found"
}

---
{
    "message": "New user has been created successfuly"
}
---

* Styling * 

The project has additional files: index.html and style.css, to create a more user-friendly web browser interface providing general information about features.

* Conclusion * 

This Simple REST API project demonstrates the core principles of backend development using Node.js, Express, and Firebase. 
It provides a structured and efficient way to manage Users, Income, and Expenses with full CRUD functionality. 
The project follows best practices in API design, error handling, and structured data management, making it a solid foundation for future enhancements.


