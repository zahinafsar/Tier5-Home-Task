# Prerequisite
1. Nodejs
2. MongoDB
3. npm/yarn

# Install Modules
```bash
# npm
$ npm install

# yarn
$ yarn
```

# Configure Database
### Port
> localhost:27017

### Database name
> tier5hometask

# Run Project
```bash
# npm
$ npm run dev

# yarn
$ yarn dev
```

## Base Url
> http://localhost:9090/api

## Project Structure
```bash
server
│
└── src
    ├── config............(Includes Config Variables)
    ├── controller........(Controls API Requests)
    ├── enum..............(Include Named Constants)
    ├── middleware........(Process Request Data)
    ├── models............(Includes All Data Models and Schema)
    ├── routes............(Include API Endpoints)
    └── Utils.............(Contains Helper Functions)
```

# API Documentation
```js
// Add 100K random user data to database

GET "http://localhost:9090/api/user/dummy-user"
```
```js
// Get top 15 user by usage time

GET "http://localhost:9090/api/user/active-users"
```
```js
// Get users segment by country

GET "http://localhost:9090/api/user/users-country/:country"
```
```js
// Get users segment by gender

GET "http://localhost:9090/api/user/users-gender/:gender"
```
```js
// Get users segment by device

GET "http://localhost:9090/api/user/users-device/:device"
```

```js
// Add dummy app use time data from 2010 to 2019

GET "http://localhost:9090/api/dashboard/dummy-usage"
```
```js
// Get app use time data from 2010 to 2019

GET "http://localhost:9090/api/dashboard/table"
```
```js
// Get all dashboard data

GET "http://localhost:9090/api/dashboard/"
```
```js
// Add and update dashboard data

POST "http://localhost:9090/api/dashboard/"
{
    "_id": string,
    "dashboard": [],
    "name": string,
}
```
```js
// Get single dashboard data

GET "http://localhost:9090/api/dashboard/:id"
```


