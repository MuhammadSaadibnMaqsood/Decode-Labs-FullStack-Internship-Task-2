# Intership task 2 Backend API

This is a simple Express.js backend API for managing users. It uses an in-memory data store, so data is reset when the server restarts.

## Overview
This API demonstrates basic RESTful service design with:
- GET `/`
- GET `/users`
- GET `/users/:id`
- POST `/users`
- JSON request validation
- semantic status responses

## Project Structure
- `index.js` — creates the Express app, enables JSON parsing, defines the root route, registers `/users` routes, and handles global errors and `404` responses.
- `controllers/userController.js` — contains the user data, input validation, and all controller logic for listing users, fetching one user by ID, and creating a new user.
- `routes/userRoutes.js` — defines the route mappings for the user endpoints.
- `package.json` — defines the project metadata, scripts, and `express` dependency.

## Setup
1. Open a terminal in `task-2`
2. Run `npm install`
3. Start the server with `npm start`

The API listens on port `3000` by default.

## Endpoints

### GET /
Returns basic server status and available endpoints.

### GET /users
Returns all users.

Response example:
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "firstName": "Ava",
      "lastName": "Patel",
      "email": "ava.patel@example.com",
      "role": "developer"
    }
  ]
}
```

### GET /users/:id
Returns a single user by ID.

Response example:
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "firstName": "Ava",
    "lastName": "Patel",
    "email": "ava.patel@example.com",
    "role": "developer"
  }
}
```

If the ID is invalid or the user is not found, the server returns an error response.

### POST /users
Creates a new user after validating the request body.

Required JSON payload:
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "role": "designer"
}
```

Successful response example:
```json
{
  "status": "created",
  "data": {
    "id": 3,
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "role": "designer"
  }
}
```

If validation fails, the server returns `400 Bad Request`.

## Validation Rules
The app validates that:
- The request body is a JSON object.
- `firstName`, `lastName`, `email`, and `role` are present.
- `firstName`, `lastName`, and `role` are non-empty strings.
- `email` is in a valid email format.

## Runtime Behavior
- Default port: `3000`
- Uses `express.json()` for JSON body parsing.
- Includes custom error handling for invalid JSON payloads.
- Uses an in-memory `users` array as storage.

## Scripts
- `npm start` — starts the server using `node index.js`
- `npm run dev` — starts the server with `nodemon`

## Dependencies
- `express` — web framework for building the API

## Notes
- This implementation uses an in-memory store, so data is not persisted after the server restarts.
- The root endpoint `/` returns a simple status message and available routes.
- If you want, the code can be further expanded with better separation, models, database storage, and tests.
