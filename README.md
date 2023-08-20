# Streamify

### Project Description:

Streamify is an interactive live streaming platform designed to connect content creators, streamers, and viewers in real-time. The platform offers a seamless experience for both broadcasters and viewers, allowing users to share their passions, interact with their audience, and build a community around live streaming content. Whether it's tutorials, events, or any other form of live content, Streamify provides the tools and features to make live streaming engaging and enjoyable.

### Purpose:

The purpose of Streamify is to provide a platform for individuals, influencers, and businesses to engage with their audience through live streaming. The project aims to facilitate real-time interaction, entertainment, and education, bringing people together through shared interests and live experiences.

### Key Goals and Objectives:

    -Empower content creators to easily start live streams and connect with their followers.
    -Offer viewers an immersive experience by enabling real-time chats, reactions, and engagement.
    -Create a platform that encourages creativity, learning, and entertainment through live streaming.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributors](#contributors)
- [Demo](#demo)

## Features

1.User Registration and Authentication:

    -Allow users to create accounts and log in securely.
    -Implement authentication mechanisms like email verification, password reset, and two-factor authentication for enhanced security.

2.Live Streaming:

    -Enable users to broadcast live video streams from their devices.
    -Provide options to start, pause, and resume streams.
    -Allow viewers to watch live streams in real-time.

3.Viewership Interaction:

    -Implement live chat functionality for viewers to interact with the streamer and other viewers.
    -Allow streamers to see and respond to viewer comments in real-time.

## Technologies Used

**Technologies, Languages, Frameworks, and Libraries Used:**

1. **Frontend:**

   - **React:** A popular JavaScript library for building user interfaces.
   - **React Router:** For managing navigation and routing within the application.
   - **Material-UI:** A UI component library for creating modern and responsive user interfaces.
   - **Axios:** A promise-based HTTP client for making API requests.
   - **react-icons:** Library for adding icons to components.
   - **react-toastify:** For displaying toast notifications.

2. **Backend:**

   - **Node.js:** A JavaScript runtime for building server-side applications.
   - **Express:** A lightweight web application framework for Node.js.
   - **MongoDB:** A NoSQL database for storing user data, chats, and more.
   - **Mongoose:** An Object Data Modeling (ODM) library for MongoDB.
   - **jsonwebtoken:** For handling user authentication and authorization.
   - **bcryptjs:** For hashing and securing user passwords.
   - **cors:** Middleware for enabling CORS in the Express app.

3. **WebRTC (Real-Time Communication):**

   - **wrtc:** A WebRTC implementation for Node.js, enabling real-time audio and video streaming.

4. **Socket.io (Real-Time Bidirectional Communication ):**
   
   - **socket.io:**  a JavaScript library that enables real-time, bidirectional communication between web clients (such as browsers) and servers allowing              features like live chat to be made with this technology

5. **Deployment and Hosting:**

   - **Vercel:** For deploying the frontend of the application.

6. **Other Tools and Technologies:**

   - **Git:** For version control and collaboration.
   - **GitHub:** For hosting and managing the project repository.
   - **npm (Node Package Manager):** For installing and managing project dependencies.
   - **dotenv:** For managing environment variables.
   - **Postman:** For testing API endpoints during development.
   - **VS Code:** An integrated development environment for coding and debugging.

## Getting Started

Clone the repository using the `git clone` command

```
git clone https://github.com/sukritmalpani/Broadcast.git

```

Enter the client folder and install the dependencies

```
cd client
npm i
```

Enter the server folder and install the dependencies

```
cd ..
cd server
npm i
```

Start the server and client build

```
nodemon
cd ..
cd client
npm start
```

**And You are good to go!**

### Usage

Here's a guide on how to use your live streaming website once it's set up:

**1. User Registration and Login:**

- Open the application in your web browser.
- Click on the "Register" link to create a new user account by providing your name, email, and password.
- Once registered, you can log in using your email and password.

**2. Publisher: Starting a Live Stream:**

- After logging in, click the "Start" button on the dashboard to start your live stream.
- Your camera feed will be displayed in the video area.
- Viewers can watch your stream by clicking on View Stream.

**3. Viewer: Watching a Live Stream:**

- Visitors or other users can access the live streams by navigating to Viewer Route and clicking on View Stream.
- They will see the video feed of the ongoing live stream.

**4. Interacting with Live Chats:**

- Beside the live stream video, there's a chat section where viewers can interact.
- Viewers can send text messages that will be displayed in real-time to all viewers.
- The messages are associated with the sender's name.

**5. Admin Control:**

- Administrators can access dashboard route managing incoming Publisher Requests.
- Admins might have the ability to perform other administrative tasks.

## Contributors

- [Sukrit Malpani](https://github.com/sukritmalpani)
- [Asim Ahmed](https://github.com/mohammedasimahmed)
- [Harsh Kumar Singh](https://github.com/Harshs0891)

# Demo

- [Streamify](https://streamify-official.vercel.app)
  `Please note that only frontend of the website has been deployed and hence you will not be able to enjoy the features and faciliies of streaming and chatting.It has been provided only for demo purposes.To enjoy the full benefits our team requests you to install the project following the steps provided above`
