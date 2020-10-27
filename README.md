# BankApp

In this project it is possible to simulate few bank operations such as *deposit*, *payment*, *withdrawn*. It is also possible to create a new account to make transactions.

## Installation

Clone this repository into your machine.

## API

* Technologies used:
** Typescript
** Node 12+
** Jest
** MongoDB

### Curl

If you want to test the API without using the front end, you can find requests example below:

```
curl --location --request POST 'localhost:3333/v1/accounts/'
```

```
curl --location --request POST 'localhost:3333/v1/accounts/<ACCOUNT_ID>/transactions/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "amount": 11,
    "type": "Deposit"
}'
```

```
curl --location --request GET 'localhost:3333/v1/accounts/<ACCOUNT_ID>'
```

```
curl --location --request GET 'localhost:3333/v1/accounts/'
```

```
curl --location --request GET 'localhost:3333/v1/accounts/<ACCOUNT_ID>/transactions/' 
```
## Client

* Technologies used:
** React

Project created used create-react-app to help interact with API functions
