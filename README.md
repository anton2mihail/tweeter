# Tweeter Project

Tweeter is a simple, single-page Twitter clone. Implementing an express backend, leveraging modular routing and server code, abstracted data handling methods, and persistent data with a mongodb database. Secured against scripting attacks on client side. The frontend is designed to handle mobile interfaces gracefully, it is therefore created with responsive design in mind. The layout changes in each tweet based on the width of the screen viewing it.

          Now Hosted on heroku

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Install mongo db cli, and set up the local db server. Instructions for this can be found at <https://docs.mongodb.com/manual/installation/>
4. After following installation and setup instructions type `mongo` in your terminal, make sure that the following is contained within the output: `connecting to: mongodb://127.0.0.1:27017`, remember this because it is the address to your local mongo server.
5. Now within the mongo cli after the `>` prompt, type `use tweeter` and hit enter. Now exit the mongo cli by hitting 'ctrl + c' or 'command + C' on mac.
6. Now navigate to the directory in which you cloned the repo, and once there start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
7. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above
- Mongo 3.x or above
- body-parser 1.15.2 or above
- Chance 1.0.2 or above
- md5 2.1.0 or above

## Dev-Dependencies
- nodemon 1.9.2 or above

## Screenshots

#### Form to compose a new tweet slides down

![alt text](https://github.com/anton2mihail/tweeter/blob/master/screenshots/tweeter-compose.png "Compose a new tweet")

#### No tweets have been created so this is the start page

![alt text](https://github.com/anton2mihail/tweeter/blob/master/screenshots/tweeter-start.png "No tweets yet")

#### Here are some example tweets

![alt text](https://github.com/anton2mihail/tweeter/blob/master/screenshots/tweeter-tweets.png "Some tweets in the page")

## Upcoming Features
- The ability to like tweets
- Login/Register system where only registered users can post tweets and like them


## Author
Anton Lachmaniucu
