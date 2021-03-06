# Kneedy's Sandwich/Burger shop

###### and maybe croissants ;)

## Live demo
http://kneedys-frontend.herokuapp.com/

## Getting Started

#### Cd into the server folder and do the following

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Run migrations: `npm run knex migrate:latest`

- Check the migrations folder to see what gets created in the DB

5. Run the seed: `npm run knex seed:run`

- Check the seeds file to see what gets seeded in the DB

6. Run the server: `node server.js`

#### after server is running on 8080 cd into the frontend folder and do the following

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
- DB_HOST=
- DB_USER=
- DB_PASS=
- DB_NAME=
- DB_SSL=
- DB_PORT=

3. Install dependencies: `npm i`
4. Run the server: `node server.js`
5. Visit `http://localhost:4040/`
6. You can use our example account to login.
- Username: 123@example.com Password: 123
7. Enjoy!

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- Body Parser 1.18 or above
- Cookie-parser 1.4 or above
- Dotenv 6.1 or above
- Ejs 2.6 or above
- Express 4.16 or above
- Express-session 1.15 or above
- Lokijs 1.5.5 or above
- Node-fetch 2.3 or above
- Node-sass-middleware 0.11 or above
- Passport 0.4 or above
- Passport-local 1.0 or above
