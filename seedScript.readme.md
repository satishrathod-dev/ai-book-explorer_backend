# Seed Books Script

This script seeds the MongoDB database with book data from a CSV file.

## Usage

Run the following command to execute the script:

node [seedBooks.js](http://_vscodecontentref_/0)


-- Ensure the CSV file (book-details (1).csv) is in the same directory as the script.

## Prerequisites
- MongoDB connection string must be set in the .env file as MONGO_URI.

- Install dependencies using npm install.
Features

- Reads and validates book data from a CSV file.

- Skips invalid rows and avoids duplicate entries.

- Logs the number of successfully added books.