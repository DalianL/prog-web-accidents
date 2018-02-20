# Projet Programmable Web Client / Server

Members :
	- Matthieu Barzellino
	- Loïc Dalian
	- Maxime Dejeux
	- Ahmed Fezai

## Server Installation

1. Clone the repository https://github.com/dl100463/prog-web-accidents (Server and DB)
2. run `npm install` at the root
3. run `mongod --dbpath=./data` in the Mongo folder
4. In the same folder run node accidents.js Accidents.JSON to populate the database

## Client Installation

1. Clone the repository https://github.com/dl100463/prog-web-accidents-client (Client)
2. run `npm install` at the root with sudo if needed
3. run `npm install -g ionic@latest` with sudo if needed 
4. run `npm install -g cordova` with sudo if needed

## Usage 

1. Go to the Server folder and run node server.js to start the server
2. Enter the right adress of the server in the client in the src/providers/rest/rest.ts folder
3. Run the Ionic client in the client repository for :
	- browser (simulating a mobile app) : ionic serve -l
	- android : ionic cordova run android
	- iOs (requires a MAC) : ionic cordova run ios
4. Be warned by the app when accidents happened near your position !

## Tests

1. run `npm install -g mocha` at the root in this repository
2. run `mocha` to run all the tests
