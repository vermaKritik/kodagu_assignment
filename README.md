# Ecommerce API
## Note: Postman Documentation of all the apis are there in [Postman Collections](./ecommerce.postman_collection.json) 
[Docker Image](https://hub.docker.com/r/kritikverma2002/ecommerce)
# APIS 
```js 
API BASE "{{IP}}/api/v1"
```

## Health Check 
```js 
GET "/health-check"
```
## Auth
```js 
POST "/signup"

POST "/login"

POST "/sendotp"

GET "/refresh"

POST "/forgotpassword"

PATCH "/resetpassword/:token"

GET "/logout"

PATCH "/update-email"

GET "/email-verify/:token"

PATCH "/update-password"
```

## User 
```js
GET "/me"

PATCH "/me"
```

## How To run 
install Docker Desktop
```
docker-compose up
```

---
---