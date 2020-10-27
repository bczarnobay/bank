# BankApp

In this project it is possible to simulate few bank operations such as *deposit*, *payment*, *withdrawn*. It is also possible to create a new account to make transactions.

- [Installation and execution](#installation-and-execution)
- [API](#api)
  * [Requirements](#requirements)
  * [Curl](#curl)
    + [POST /v1/accounts/](#post--v1-accounts-)
    + [POST /v1/accounts/:id/transactions/](#post--v1-accounts--id-transactions-)
    + [GET /v1/accounts/:id/](#get--v1-accounts--id-)
    + [GET /v1/accounts/](#get--v1-accounts-)
    + [GET /v1/accounts/:id/transactions/](#get--v1-accounts--id-transactions-)
- [Client](#client)

## Installation and execution

To setup the project you can follow the next steps:
1. Clone this repository into your machine.
2. Go to folder ***client*** and run ***npm install***
3. Go to folder ***server*** and run ***npm install***

This application uses ports 3000 and 3333, make sure you have them available when starting the application.
To execute both applications you can follow the next steps:
1. To start the backend server, go to folder ***server*** and run ***npm run start***
2. To start the web client, go to folder ***client*** and run ***npm start***

The database used is already configured.

## API

Technologies used:
* Typescript
* Node 12+
* Jest
* MongoDB

Project structure:
```bash 
├───controllers     - responsible for route management
├───models
│   ├───interfaces  - types definition
│   └───schemas     - schema definition
├───repositories    - reponsible for accessing collections
├───services        - responsible for the business logic
└───utils           - helper functions used in the project
```
### Requirements
The project consists of two main domains, accounts and transactions.

You can create and acccount and you will receive a 6 digit id to make transactions
You can request a summary of your account
You can list all accounts in the database

You can make a withdrawn, providing a valid account id. If you have insufficent balance, your account status will be set to OVERDRAWN.
You can make payments, providing a valid account id and a 20 digit barcode.
You can make a deposit, providing a valid account id
You can list all transactions made for the account provided.

### Curl

If you want to test the API without using the front end, you can find requests example below:

#### POST /v1/accounts/ 
```
curl --location --request POST 'localhost:3333/v1/accounts/'
```

Response: 
```json
{
  "account": "returns new accountId"
}
```

#### POST /v1/accounts/:id/transactions/
```
curl --location --request POST 'localhost:3333/v1/accounts/<ACCOUNT_ID>/transactions/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "amount": 11,
    "type": "Deposit"
}'
```

Response:
```json
{
  "accountId": "accountId",
  "createdAt": "account creation date",
  "currentBalance": "account balance after transaction",
  "status": "account status"
}
```

#### GET /v1/accounts/:id/
```
curl --location --request GET 'localhost:3333/v1/accounts/<ACCOUNT_ID>'
```

Response:
```json
{
  "accountId": "accountId",
  "createdAt": "account creation date",
  "currentBalance": "account balance after transaction",
  "status": "account status"
}
```

#### GET /v1/accounts/
```
curl --location --request GET 'localhost:3333/v1/accounts/'
```

Response:
```json
{
  "results" : [
    {
      "accountId": "accountId",
      "createdAt": "account creation date",
      "currentBalance": "account balance after transaction",
      "status": "account status"
    }
  ],
  "total": "total of entries"
}
```

#### GET /v1/accounts/:id/transactions/
```
curl --location --request GET 'localhost:3333/v1/accounts/<ACCOUNT_ID>/transactions/?limit=1&offset=2' 
```

Response:
```json
{
  "results" : [
    {
      "createdAt": "transaction creation date",
      "amount": "transaction amount",
      "type": "transaction type",
      "barcode": "payment barcode"
    }
  ],
  "total": "total of entries"
}
```

## Client

Technologies used:
* React

Project created used create-react-app to help interact with API functions
