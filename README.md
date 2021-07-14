# Chatty Stop API

**Authors:** Dezerey Escanuelas

## LINK TO API

https://capstone-websockets.herokuapp.com/

## TECHNOLOGIES USED

- JavaScript
- Node
- Express
- MongoDB
- Mongoose
- Socket.IO
- JSON Web Tokens
- Postman

## PROJECT SUMMARY

Chatty Stop is an application that allows users to sign in and send messages to other logged in users.

## APPROACH TAKEN

For this project MongoDB was used to store the user's information. Then JSON Web Tokens(JWTs) were used to authenticate the user and allow them to send messages. Socket.IO was used to create a websocket that will allow the messages to be sent instantly to other logged in users without having to run a refresh.

## FUTURE UPDATES

- Show when a person connects/disconnects
- Allow the user to change the color of the message if they want to ask a question
- Add a private chat
- Create user pages
- Add/edit profile pictures
