# Flights and Search Service

A microservice for handling flight search and management operations, built with Node.js, Express, and Sequelize.

## Table of Contents

- [Project Setup](#project-setup)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)

## Project Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd FlightsAndSearchService
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=3000
    # SYNC_DB=true  # Uncomment to sync DB models on server start
    ```

4.  **Database Configuration:**
    Create a `config.json` file inside `src/config/` with your database credentials:
    ```json
    {
      "development": {
        "username": "YOUR_DB_USERNAME",
        "password": "YOUR_DB_PASSWORD",
        "database": "Flights_Search_DB_DEV",
        "host": "127.0.0.1",
        "dialect": "mysql"
      }
    }
    ```

5.  **Start the Server:**
    ```bash
    npm start
    ```
    The server will start on `http://localhost:3000` (or the PORT specified in `.env`).

## Database Setup

This project uses **Sequelize** for ORM and **MySQL** as the database.

1.  **Create the Database:**
    ```bash
    npx sequelize db:create
    ```

2.  **Run Migrations:**
    Creates the necessary tables (Airports, Cities, Flights, etc.).
    ```bash
    npx sequelize db:migrate
    ```

3.  **Seed Data (Optional):**
    If seeders are available, you can populate the database with initial data.
    ```bash
    npx sequelize db:seed:all
    ```

## API Documentation

Base URL: `/api/v1`

### City

-   **Create City**
    -   `POST /city`
    -   Body: `{ "name": "City Name" }`
-   **Delete City**
    -   `DELETE /city/:id`
-   **Get City**
    -   `GET /city/:id`
-   **Get All Cities**
    -   `GET /city`
    -   Query Params: `?name=FilterName` (Optional)
-   **Update City**
    -   `PATCH /city/:id`
    -   Body: `{ "name": "New Name" }`

### Flights

-   **Create Flight**
    -   `POST /flights`
    -   Body: `{ "flightNumber": "...", "airplaneId": 1, "departureAirportId": 1, "arrivalAirportId": 2, "arrivalTime": "...", "departureTime": "...", "price": 1000 }`
-   **Get All Flights**
    -   `GET /flights`
    -   Query Params: `?minPrice=X&maxPrice=Y` (Example filters)
-   **Get Flight**
    -   `GET /flights/:id`
-   **Update Flight**
    -   `PATCH /flights/:id`

### Airports

-   **Create Airport**
    -   `POST /airports`
    -   Body: `{ "name": "Airport Name", "cityId": 1, "address": "Address" }`

## Project Structure

```text
src/
├── config/         # Database and Server configuration
├── controllers/    # Handles incoming requests and responses
├── middlewares/    # Request validation logic
├── migrations/     # Database migration files
├── models/         # Sequelize models (Table definitions)
├── repository/     # Data access layer (Interacts with DB)
├── routes/         # API route definitions
├── services/       # Business logic layer
├── utils/          # Utility functions and helper classes
└── index.js        # Entry point of the application
```

