# Express.js with TypeScript and MongoDB Proof-of-Concept

A TypeScript + Express.js REST API and MongoDB Atlas proof-of-concept for http post “Contact” submission. This project uses a service-based directory layout and splits each HTTP action into its own controller.

## Project Structure

```
src
 ┣ config
 ┃ ┗ mongodb.ts
 ┣ controllers
 ┃ ┣ contact
 ┃ ┃ ┣ getAllContactsController.ts
 ┃ ┃ ┗ postContactController.ts
 ┃ ┗ contactController.ts
 ┣ models
 ┃ ┗ contact
 ┃ ┃ ┗ contact.ts
 ┣ routes
 ┃ ┗ contactRoutes.ts
 ┗ index.ts
 .env
 .gitignore
 package.json
 tsconfig.json
 README.md
```

## Environment variables

``` 
MONGODB_URI=
MONGODB_DB_NAME=
PORT=8080
```

## API Reference

Health Check: GET /
Returns a simple “up and running” message.
```
curl http://localhost:8080/
# → "Welcome to the API – everything is up and running!"
```

## Create a Contact
POST /api/v1/contacts
```
{
  "fullName":    "Jane Doe",
  "emailAddress":"jane@example.com",
  "organization":"Acme Corp",        // optional
  "phoneNumber": "+1234567890",      // optional
  "message":     "Hello, world!"
}
```

Success Response (201):
```
{
  "id":          "60f1a2b3c4d5e6f7g8h9i0j",
  "fullName":    "Jane Doe",
  "emailAddress":"jane@example.com",
  "organization":"Acme Corp",
  "phoneNumber": "+1234567890",
  "createdAt":   "2025-05-04T12:34:56.789Z",
  "updatedAt":   "2025-05-04T12:34:56.789Z",
  "message":     "Thank you! We've received your message and will get back to you shortly."
}
```