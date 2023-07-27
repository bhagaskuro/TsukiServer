# Tsuki App Server

Tsuki is an application to post foods. This app has :

- RESTful endpoint for asset's CRUD operation
- JSON formatted response

&nbsp;

## RESTful endpoints

List of available endpoints:

Before Auth :

- [`POST /register`](#post-register)
- [`POST /login`](#post-login)

Cuisines :

- [`GET /cuisines`](#get-cuisines)
- [`GET /cuisines/:id`](#get-cuisinesid)
- [`POST /cuisines`](#post-cuisines)
- [`DELETE /cuisines/:id`](#delete-cuisinesid)

Category :

- [`GET /categories`](#get-categories)

Customer :

- [`POST /pub/register`](#post-pubregister)

- [`GET /pub`](#get-pub)
- [`GET /pub/detail/:id`](#get-pubdetailid)
- [`GET /pub/cart`](#get-cart)
- [`POST /pub/cart/:id`](#post-pubcartid)
- [`PATCH /pub/paid`](#patch-pubpaid)
- [`POST /pub/generateToken`](#post-pubgeneratetoken)

  &nbsp;

## POST /register

Request:

_Request Body_

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email address"
}
OR
{
  "message": "Email address already in use"
}
OR
{
  "message": "password cannot be empty"
}
OR
{
  "message": "Password must be at least 5 characters"
}
```

&nbsp;

## POST /login

Request:

_Request Body_

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "email": "string",
  "role": "string",
  "username": "string",
  "id": INTEGER
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "password cannot be empty"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Email/Password invalid"
}
```

&nbsp;

## GET /cuisines

> Get all data from table Cuisines

_Request Body_

```
not needed
```

_headers_

```json
{
  "access_token": "string"
}
```

_Response (200)_

```json
[
    {
        "id": 1,
        "name": "Omurice",
        "description": "Nasi goreng dengan balutan telur dan saus",
        "price": 30000,
        "imgUrl": "http://dummyimage.com/164x100.png/5fa2dd/ffffff",
        "authorId": 1,
        "categoryId": 1,
        "User": {
            "username": "bhagaskuro",
            "email": "user2@gmail.com"
        },
        "Category": {
            "id": 1,
            "name": "indonesian"
        }
    },
    ...
]
```

&nbsp;

## GET /cuisines/:id

> Get data from table Cuisines by id

_Request Params_

```json
{
  "id": INTEGER
}
```

_headers_

```json
{
  "access_token": "string"
}
```

_Response (200)_

```json
{
  "cuisine": {
    "id": 2,
    "name": "Omurice",
    "description": "Nasi goreng dengan balutan telur dan saus",
    "price": 30000,
    "imgUrl": "http://dummyimage.com/164x100.png/5fa2dd/ffffff",
    "authorId": 3,
    "categoryId": 2,
    "User": {
      "username": "nindyalite",
      "email": "user2@gmail.com"
    },
    "Category": {
      "id": 2,
      "name": "Japanese"
    }
  }
}
```

&nbsp;

## POST /cuisines/

> Insert new data into table Cuisines

_Request Body_

```json
{
  "name": "STRING",
  "description": "STRING",
  "price": INTEGER,
  "imgUrl": "STRING",
  "categoryId": INTEGER
}
```

_headers_

```json
{
  "access_token": "string"
}
```

_Response (201 - Created)_

```json
{
  "name": "STRING",
  "description": "STRING",
  "price": INTEGER,
  "imgUrl": "STRING",
  "categoryId": INTEGER,
  "authorId": INTEGER,
  "updatedAt": DATE,
  "createdAt": DATE
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name cannot be null"
}
OR
{
  "message": "Description cannot be null"
}
OR
{
  "message": "Price cannot be null"
}
OR
{
  "message": "Image URL cannot be null"
}
```

&nbsp;

## DELETE /cuisines/:id

> Delete data from table Cuisines

_Request Params_

```json
{
  "id": INTEGER
}
```

_headers_

```json
{
  "access_token": "string"
}
```

&nbsp;

## GET /categories

> Fetch data from table Categories

_Request Body_

```
not needed
```

_headers_

```json
{
  "access_token": "string"
}
```

_Response (200)_

```json
[
    {
        "id": 5,
        "name": "Western",
        "createdAt": "2023-05-21T14:16:18.933Z",
        "updatedAt": "2023-05-21T14:16:18.933Z"
    },
    {
        "id": 4,
        "name": "Chinese",
        "createdAt": "2023-05-21T14:16:18.933Z",
        "updatedAt": "2023-05-21T14:16:18.933Z"
    },
  ...
]
```

&nbsp;

## POST /pub/register

Request:

_Request Body_

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email address"
}
OR
{
  "message": "Email address already in use"
}
OR
{
  "message": "password cannot be empty"
}
OR
{
  "message": "Password must be at least 5 characters"
}
```

&nbsp;

## GET /pub

> Get all data from table Cuisines

_Request Body_

```
not needed
```

_headers_

```json
not needed
```

_Response (200)_

```json
{
    "totalPage": 3,
    "currentPage": 1,
    "data": [
        {
            "id": 13,
            "name": "Sushi Roll",
            "description": "Makanan khas jepang yang digulung dan diisi dengan berbagai isian",
            "price": 35000,
            "imgUrl": "http://dummyimage.com/164x100.png/5fa2dd/ffffff",
            "categoryId": 2,
            "status": "Active",
            "Category": {
                "id": 2,
                "name": "Japanese"
            }
        },
        {
            "id": 12,
            "name": "Omurice",
            "description": "Nasi goreng dengan balutan telur dan saus",
            "price": 30000,
            "imgUrl": "http://dummyimage.com/164x100.png/5fa2dd/ffffff",
            "categoryId": 1,
            "status": "Active",
            "Category": {
                "id": 1,
                "name": "indonesian"
            }
        },
        ...
    ]
}
```

&nbsp;

## GET /pub/detail/:id

> Get detail data from table Cuisines

_Request Body_

```
not needed
```

_headers_

```json
{
  "access_token": "string"
}
```

_Response (200)_

```json
{
    "id": 6,
    "name": "Pizza Frenzy",
    "description": "anggep aja pizza frenzy, soalnya toppingnya ngawur.. untung ga pake nanas",
    "price": 35000,
    "imgUrl": "https://news.ralali.com/wp-content/uploads/2022/11/franchise-pizza.jpg",
    "categoryId": 5,
    "Category": {
        "id": 5,
        "name": "Western"
    },
    "qr": SVG FILE
}
```

&nbsp;

## POST /pub/cart/:id

Request:

_Request Body_

```json
not needed
```

_headers_

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "data updated"
}
```

&nbsp;

## GET /cart

> Get all data from table Cart

_Request Body_

```
not needed
```

_headers_

```json
{
  "access_token": "string"
}
```

_Response (200)_

```json
[
    {
        "id": 12,
        "userId": 1,
        "cuisineId": 6,
        "total": 3,
        "status": "incomplete",
        "cuisine": {
            "id": 6,
            "name": "Pizza Frenzy",
            "description": "anggep aja pizza frenzy, soalnya toppingnya ngawur.. untung ga pake nanas",
            "price": 35000,
            "imgUrl": "https://news.ralali.com/wp-content/uploads/2022/11/franchise-pizza.jpg",
            "authorId": 1,
            "categoryId": 5
        }
    },
    ...
]
```

&nbsp;

## PATCH /pub/paid

Request:

_Request Body_

```json
not needed
```

_headers_

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Invoice has been paid"
}
```

&nbsp;

## POST /pub/generateToken

Request:

_Request Body_

```json
{
  ammount: integer
}
```

_headers_

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "token": "168caee1-a98b-4472-9872-d7c0947dfae8",
  "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/168caee1-a98b-4472-9872-d7c0947dfae8"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Error"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

_Response (500 - Internal Server)_

```json
{
  "message": "Internal Server Error"
}
```
