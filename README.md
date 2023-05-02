run with : npm run start

PATH:

POST /auth/register

body
{
    "username": string,
    "password": string,
    "fullname": string
}
response
{
    "data": {
        "user_id": number
    },
    "msg": string
}

POST /auth/login

body
{
    "username": string,
    "password": string
}
response
{
    "data": {
        "token": string
    },
    "msg": string
}

---

GET /user

headers
token:string (jwt from api /auth/login)
response
{
    "data": {
        "user_id": number,
        "username": string,
        "password": string,
        "fullname": string
    },
    "msg": string
}

GET /user/order/history

headers
token:string (jwt from api /auth/login)
response
{
    "data": {
        "order_id": number,
        "user_id": number,
        "product_id": number,
        "product_name": string,
        "status": string
    }[],
    "msg": string
}

---

GET /product

headers
token:string (jwt from api /auth/login)
response
{
    "data": {
        "order_id": number,
        "user_id": number,
        "product_id": number,
        "product_name": string,
        "status": string
    }[],
    "msg": string
}

GET /product/one

headers
token:string (jwt from api /auth/login)
query
product_id
response
{
    "data": {
        "product_id": number,
        "product_name": string
    },
    "msg": string
}

---

POST /order/create

headers
token:string (jwt from api /auth/login)
body
{
    "product_id":number
}
response
{
    "data": {
        "order_id": number
    },
    "msg": string
}


POST /order/cancel

headers
token:string (jwt from api /auth/login)
body
{
    "order_id": number
}
response
{
    "data": {
        "order_id": number
    },
    "msg": string
}


GET /order

headers
token:string (jwt from api /auth/login)
response
{
    "data": {
        "order_id": number,
        "user_id": number,
        "product_id": number,
        "product_name": string,
        "status": string
    }[],
    "msg": string
}