# Accounts

POST /login
| Body requires a username and password field
POST /register
| Body requires a username and password field

# Products

GET /products
GET /products/:id
POST /products
| Body requires a description and price field
DELETE /products/:id

# Orders

GET /orders
GET /orders/:id
POST /orders
| Body requires a userId and productId field
DELETE /orders/:id
