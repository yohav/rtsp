# rtsp
###Tech Stack
Node.js (Express.js, Swagger.js, Passport.js), React, MongoDB
###Build & Run with docker
In the project directory, you can run:
### `docker-compose build`

then run:
### `docker-compose up`

The client should be available at: http://localhost:3000

The api documentation should be available at: http://localhost:3001/api-docs

###Configuration:
Client config file:client\src\config.js

Server config file: server\.env

**If you want to use localhost mongodb instance please change `DATABASE_URL` to `mongodb://localhost:27017`/</b>**

###Build & Run without docker
Go client config and change `serverUrl` to `http://localhost:3000`

Open CMD and run:
##### `cd client`
##### `npm install & npm start`
Open another CMD and run:
##### `cd server`
##### `npm install & npm start`
##### Confirm change of port
The client should be available at: http://localhost:3001

The api documentation should be available at: http://localhost:3000/api-docs 
