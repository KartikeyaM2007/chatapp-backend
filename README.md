live on :  https://chatapp-backend-kappa-amber.vercel.app/


💬 Real-Time Chat Application (Socket.IO)

This is a real-time web-based chat application built using Node.js, Express, Socket.IO, and vanilla JavaScript.
It allows multiple users to join chat rooms, send messages instantly, share their live location, and see active users in real time.

The project focuses on real-time communication, event-driven architecture, and frontend–backend synchronization.

🚀 Features

🔴 Real-time messaging using Socket.IO

👥 Multiple chat rooms support

📍 Live location sharing (Google Maps link)

📜 Auto-scroll chat window for new messages

👤 Active users list updated in real time

⏰ Message timestamps

🛑 Form & button state management (disable/enable while sending)

📱 Responsive layout using Flexbox

🛠️ Tech Stack
Frontend

HTML5

CSS3 (Flexbox layout)

Vanilla JavaScript

Mustache.js (templating)

Backend

Node.js

Express.js

Socket.IO

⚙️ How It Works

Users enter a username and room name to join a chat.

Socket.IO establishes a real-time WebSocket connection.

Messages are broadcast instantly to all users in the same room.

Location sharing sends a Google Maps link to the chat.

The sidebar dynamically updates with current room users.

Auto-scroll ensures the latest messages are always visible.

📂 Project Structure
/public
 ├── index.html
 ├── chat.html
 ├── css/
 └── js/chat.js
/server
 ├── index.js
 └── utils/

▶️ How to Run Locally
# Install dependencies
npm install

# Start the server
npm run dev


Then open:

http://localhost:3000

🎯 Learning Outcomes

Understanding WebSockets & real-time communication

Working with Socket.IO events and acknowledgements

Managing DOM updates & auto-scroll logic

Handling client-server synchronization

Building a production-style chat UI

📌 Future Improvements

Typing indicator

Message read receipts

User online/offline status

Private chats

Authentication system

React / Next.js frontend

👨‍💻 Author

Built as a learning project to understand real-time systems and frontend–backend interaction using Socket.IO.
