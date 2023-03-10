# Project README 🤩
Welcome to my awesome Express.js API project! 🚀 This project retrieves environment variables for a given project name, all while keeping it secure with a secret authentication token 🔒

## Getting started 🏁
To get started with the project, you will need to have Node.js and npm installed on your system. You will also need to create a database and set up the necessary environment variables 🌳

* Clone the project repository to your local machine 🖥️
* Install dependencies by running npm install 💻
* Set up the necessary environment variables by creating a .env file in the project root directory 🤫 The following variables are required:
  * DATABASE_URL: the connection string for your database 📁
  * AUTH_TOKEN: a static authentication token to be used for API requests 🔑
* Run the migration scripts to set up the database tables by running npx prisma migrate dev in the terminal 💻
* Start the server by running npm start 🚀

## API endpoints 🚪
The following API endpoints are available:

### GET /env/:projectName
Retrieves the environment variables for the specified project name 🌳

## Parameters
projectName (required): the name of the project for which to retrieve environment variables 📝
### Headers
Authorization: the authentication token, in the format Bearer {AUTH_TOKEN} 🔒
### Response
200 OK: returns an object containing the environment variables for the specified project 🎉
401 Unauthorized: if the authentication token is missing or invalid 😡
404 Not Found: if no environment variables are found for the specified project 🤷
## GET *
Returns a 404 "Not Found" error for all other API requests 🤔

## Dependencies 📦
This project uses the following dependencies:

* express: web framework for Node.js 🌐
* dotenv: loads environment variables from a .env file 🔍
* @prisma/client: ORM for interacting with the database 💾

## License 📜
This project is licensed under the MIT license 🤝 So, you can use it freely! 💃
