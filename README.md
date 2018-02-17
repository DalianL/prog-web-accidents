# Projet Programmable Web Client / Server

Members :
	- Matthieu Barzellino
	- Loïc Dalian
	- Maxime Dejeux
	- Ahmed Fezai

## Installation

1. Clone the repository https://github.com/dl100463/prog-web-accidents
2. Extract the client from the Client.zip file (could only be pushed as such because of Ionic's git settings)
3. run `npm install` in the Client/ionic-angular4-client AND root folders
4. run mongod --dbpath=./data in the Mongo folder
5. In the same folder run node accidents.js Accidents.JSON to populate the database

## Usage 

1. Go to the Server folder and run node server.js to start the server
2. Enter the right adress of the server in the client ?
3. Run the Ionic client for :
	- browser (simulating a mobile app) : ionic serve -l
	- android : ionic cordova run android
	- iOs (requires a MAC) : ionic cordova run ios
4. Be warned by the app when accidents happened near your position !
