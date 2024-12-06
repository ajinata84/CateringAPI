
# Catering API For Catering Application

## Description

Catering API is a backend service built with Node.js, Express, and Prisma. It provides APIs for managing catering services, orders, and transactions.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ajinata84/CateringAPI.git
   cd CateringAPI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables. Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL="your-database-url"
   JWT_SECRET="your-jwt-secret"
   ```

4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

5. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

## Running the Project

To start the development server, run:
```bash
npm run dev
```

The server will start on `http://localhost:3000`.

## API Documentation

The API documentation is generated using Swagger. You can access it at `http://localhost:3000/api-docs`.

## Project Structure

- `src/`
  - `controllers/`: Contains the controller functions for handling requests.
  - `middleware/`: Contains middleware functions.
  - `models/`: Contains Prisma models.
  - `routes/`: Contains route definitions.
  - `index.ts`: The entry point of the application.

## Scripts

- `npm run dev`: Starts the development server with Nodemon.
- `npm test`: Runs the tests (currently not specified).

## Dependencies

- `express`: Web framework for Node.js.
- `prisma`: ORM for database management.
- `argon2`: Password hashing library.
- `cors`: Middleware for enabling CORS.
- `helmet`: Middleware for securing Express apps.
- `jsonwebtoken`: Library for generating and verifying JWTs.
- `multer`: Middleware for handling multipart/form-data.
- `swagger-jsdoc`: Library for generating Swagger documentation.
- `swagger-ui-express`: Middleware for serving Swagger UI.
- `uuid`: Library for generating UUIDs.
- `zod`: TypeScript-first schema declaration and validation library.

## Dev Dependencies

- `@types/cors`: Type definitions for CORS.
- `@types/express`: Type definitions for Express.
- `@types/jsonwebtoken`: Type definitions for JSON Web Token.
- `@types/multer`: Type definitions for Multer.
- `@types/node`: Type definitions for Node.js.
- `@types/swagger-jsdoc`: Type definitions for Swagger JSDoc.
- `@types/swagger-ui-express`: Type definitions for Swagger UI Express.
- `@types/uuid`: Type definitions for UUID.
- `prisma`: ORM for database management.
- `ts-node`: TypeScript execution environment for Node.js.
- `typescript`: TypeScript language.