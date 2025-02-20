# ReadIt - A Simple Article Management API

This project is a RESTful API for managing articles, built using Node.js, Express, and DynamoDB. It provides endpoints for creating, retrieving, updating, and deleting articles. It also incorporates caching with Redis for improved performance.

ReadIt is a backend API designed for a platform where users can create, read, update, and delete articles. It emphasizes performance through Redis caching and uses DynamoDB for persistent storage.

## Features

- Create articles (protected route)
- Retrieve all articles (with caching)
- Retrieve a single article by ID
- Update articles (protected route)
- Delete articles (protected route)
- User authentication (JWT)
- Redis caching for article retrieval
- Comprehensive error handling

## Technologies Used

- Node.js
- Express.js
- DynamoDB
- Redis
- JWT (JSON Web Tokens)
- bcrypt (for password hashing)
- TypeScript

## Installation

1.  Clone the repository:

    ```bash
    git clone [https://github.com/your-username/readit.git](https://www.google.com/search?q=https://github.com/your-username/readit.git)  # Replace with your repo URL
    ```

2.  Navigate to the project directory:

    ```bash
    cd readit
    ```

3.  Install dependencies:

    ```bash
    yarn install
    ```

## Configuration

1.  Create a `.env` file in the root directory (if using `dotenv`) and add the following environment variables:

    ```
    PORT=3000  # Port for the server
    DATABASE_URL=your_dynamodb_connection_string # or region, accessKeyId, secretAccessKey in case you are not using url
    REDIS_URL=redis://localhost:6379 # URL for your Redis instance
    JWT_SECRET=your_secret_jwt_key # A strong, randomly generated secret for JWT signing
    AWS_REGION=your_aws_region # e.g., us-east-1
    AWS_ACCESS_KEY_ID=your_aws_access_key_id
    AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
    ```

2.  Configure your DynamoDB tables (if not already created). You can use the AWS CLI or the AWS SDK to create the necessary tables ("Users", "Articles"). There is json files inside table db folder for this purpose.

## API Endpoints

(Provide a detailed list of your API endpoints, including HTTP methods, routes, request bodies, and response examples. Use a table format for clarity.)

| Method | Route | Description | Request Body (Example) | Response (Example) 1. `/articles` (GET): Retrieves all articles. 2. `/article` (POST): Creates a new article. 3. `/article/articles` (GET): Retrieves all articles. 4. `/article/:id` (PUT): Updates an article. 5. `/article/:id` (DELETE): Deletes an article.

## Postman

[Postman](https://app.getpostman.com/join-team?invite_code=b86a1ffc978afad53ac5c1dcd0a22442f672d3b30d13dae7139a700a90920cf2&target_code=3eef3befa23fd5226f6a58446c15c86b)
