📚 Express Book Reviews API

A RESTful Book Review API built with Node.js, Express, JWT, Sessions, and Axios.

This project was developed as part of the IBM Skills Network final lab.

🚀 Features

User Registration & Login

JWT-based session authentication

Add / Update / Delete book reviews

Get books by:

ISBN

Author

Title

Async routes implemented using Axios (async/await)

🛠 Tech Stack

Node.js

Express.js

express-session

jsonwebtoken

Axios

⚙️ Setup
git clone https://github.com/<your-username>/expressBookReviews.git
cd expressBookReviews
npm install
node index.js

Server runs at:

http://localhost:5000
📡 Main Endpoints
Public

GET /

GET /isbn/:isbn

GET /author/:author

GET /title/:title

Auth

POST /register

POST /customer/login

Protected

PUT /customer/auth/review/:isbn?review=...

DELETE /customer/auth/review/:isbn

👨‍💻 Author

VarunRKdev
https://github.com/VarunRKdev
