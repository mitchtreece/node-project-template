# Doplerr API

The Doplerr API. Hooray!

## Authentication

All endpoints (except for _/auth_) require an access token to be provided for the **Authorization** request header field.

### /auth (POST)
Verifies a user/pass combo and returns a auth token if successful.
<br>**Note**: The body of the request must contain email & password params.
```
http://website.com/auth
```

## Users

### /users (GET)
Returns an array of users stored in the database.
```
http://website.com/users
```

### /users/me (POST)
Returns the current user for a given access token.
```
http://website.com/users/me
```

### /users/add (POST)
Adds a user to the database.
<br>**Note**: The body of the request must contain: firstName. lastName, username, email & password params.
```
http://website.com/users/add
```

### /users/remove (POST)
Removes a user from the database.
<br>**Note**: The body of the request must contain a userId param.
```
http://website.com/users/remove
```
