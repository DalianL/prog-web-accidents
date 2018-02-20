# Project Programmable Web Client / Server

## Members : <br>
- Matthieu Barzellino <br>
- Loïc Dalian <br>
- Maxime Dejeux <br>
- Ahmed Fezai <br>

## Installation

### Server

1. Clone the repository https://github.com/dl100463/prog-web-accidents
2. Head to the repository root folder with a CLI
3. run `npm install`
4. run `mongod --dbpath=./data` in the Mongo folder
5. In the same folder run `node accidents.js Accidents.JSON` to populate the database

### Client

1. Clone the repository https://github.com/dl100463/prog-web-accidents-client
2. Head to the repository root folder with a CLI
3. run `npm install` with sudo if needed
4. run `npm install -g ionic@latest` with sudo if needed
5. run `npm install -g cordova` with sudo if needed

## Usage 

1. Go to the Server folder and run node server.js to start the server
2. Start the client by following these steps with a CLI, depending on the platform you want to run the app with :
   + *Browser* (simulating the mobile app) :
      - In the client repository, run `ionic serve -l`
   + *Android* :
      - Connect your computer to any WIFI you can have access to
      - Run `ipconfig` anywhere with a CLI to get your IP addresses; memorize or write down the IPv4 address line
      - In the src/providers/rest/rest.ts file, replace the “localhost” part in the urlBase variable (top of the file) with the memorized IP address
      - Connect your Android phone to your computer via USB
      - Connect your Android phone to the same WIFI as your computer
      - Activate localization on your Android phone
      - Run `ionic cordova run android`
   + *iOs* (requires a Mac to launch from) :
      - Do the same as above until the very last line
      - Run `ionic cordova run ios` (not tested as it requires a MAC)
3. Connect as a Normal account or a Manager account with the following credentials :
   + *Normal account* :
      - Username : User
      - Password : pass
   + *Manager account* :
      - Username : Manager
      - Password : pass
4. On start-up make sure to authorize the app to detect your position

## What can be done

### Server

- Can deliver a list of all the accidents in the database
- Can deliver a list of accidents according to a given position
- Can deliver a list of comments for a given accident
- Can add a new accident
- Can delete an accident
- Can add a new comment
- Can delete a comment

### Client

Can connect as a normal account or special account, then for :
1. Normal users :
   + Can visualize their geolocation on a map
   + Can visualize past accidents within a radius of the current location, marked with red markers on the map
   + Can visualize comments for a specific accident by clicking the marker of an accident
   + Can be alerted/notified when entering a dangerous zone
   + Can add a comment for a specific accident
2. Special users (managers) :
   + Can do all that normal users can do
   + Can delete a commentary for a given accident
   + Can add an accident on the map
   + Can delete an accident from the map
   
## What can’t be done

### Server-side

- Can’t update the data
- No authentification (done client-side at the moment)

### Client-side

- Running properly the first time : somehow the application doesn’t function properly the first time the map is loaded even after having tried a few ways to fix it. As such for the client to run properly, it is necessary to connect as any account once and after the map has been loaded, log out with the button at the top of the screen. After having done that once the client will work just fine.
- Having a new or deleted accident display on the map immediately : when adding or deleting an accident with the manager account, the accident doesn’t always update on the map even though the accident data is reloaded. A workaround to that is simply to logout and log back in to see the new accident added or deleted.

## Tests

1. run `npm install -g mocha` at the root in this repository
2. run `mocha` to run all the tests

## Division of labor

- Matthieu Barzellino : Server (Express & Mongodb)
- Loïc Dalian : Client side (Angular 4 & Ionic 3)
- Maxime Dejeux : Server + Tests
- Ahmed Fezai : Data clean-up + Tests
