# NEWS AGRREGATOR RESTful API

# This project involves building a RESTful API using TypeScript and Express.js for a RESTful API that allows users to fetch news articles from multiple sources based on their preferences.

## Technologies Used

- NodeJS
- Typescript
- Express.js
- npm packages

## Endpoints

- `POST /register`: Register a new user.
- `POST /login`: Log in a user.
- `GET /preferences`: Retrieve the news preferences for the logged-in user.
- `PUT /preferences`: Update the news preferences for the logged-in user.
- `GET /news`: Fetch news articles based on the logged-in user's preferences.

## Setup Instructions

1. Clone the repository https://github.com/etee/news-aggregator-api.git
2. Run command `npm install` by changing the directory
3. Install Redis client https://redis.io/docs/install/install-redis/
4. Start Redis in your local environment
5. Create a .env folder at the root of the directory, by replicating the content of .env.example
6. Run `npm run dev`

> [!NOTE]
> API's used to fetch NEWS are: https://worldnewsapi.com/, https://newsdata.io/. Generate API keys for yourself on these websites. Following prefernces can be set for these API endpoints ( Refer to attached Postman requests for preferences API):

- For categories: "business", "domestic", "education", "entertainment", "health", "lifestyle", "politics", "science", "sports", "technology", "tourism", "world"
- For countries: "au", "at", "ca", "de", "fr", "in", "jp", "my", "nz", "pk", "sg", "lk", "ua", "gb", "us"
- For lanugauge: "en", "fr", "de", "es", "hi"
