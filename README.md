### Cocktailer

`Cocktailer` is a mobile app designed to help users discover new cocktails and get personalized recommendations based on their preferences. The app provides a seamless experience without requiring user accounts, while ensuring content is suitable for users aged 18 and above.

<p align="center">
  <a href="https://github.com/crispengari/cocktailer/actions/workflows/ci.yml">
    <img src="https://github.com/crispengari/cocktailer/actions/workflows/ci.yml/badge.svg" alt="CI Status">
  </a>
  <a href="https://github.com/crispengari/cocktailer/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/cocktailer.svg?maxAge=2592000" alt="License">
  </a>
  <a href="https://typescriptlang.org/">
    <img src="https://img.shields.io/badge/language-typescript-blue.svg" alt="Language: TypeScript">
  </a>
  <a href="https://www.python.org/">
    <img src="https://img.shields.io/badge/language-python-blue.svg" alt="Language: Python">
  </a>
</p>

### Framework

The following image shows the framework for the `cocktailer` app.

<p align="center">
<img src="/images/framework.png" alt="android" width="100%"/>
</p>

### Key Features:

1. **Browse Cocktails**: Users can explore a wide variety of cocktails, including classic recipes and modern drinks.
2. **Like Your Favorites**: Users can like their favorite cocktails to help Cocktailer understand their preferences.
3. **Get Recommendations**: Using a machine learning algorithm, the app suggests related cocktails based on the user’s liked drinks.
4. **No Authentication Required**: Cocktailer does not require users to create an account, offering full access to its features immediately.
5. **Age Restriction**: Designed for users aged 18+.

### Screenshots

The basic app preview looks as follows.

#### `android`

<p align="center">
<img src="/images/android/0.jpeg" alt="android" width="200"/>
<img src="/images/android/1.jpeg" alt="android" width="200"/>
<img src="/images/android/2.jpeg" alt="android" width="200"/>
<img src="/images/android/3.jpeg" alt="android" width="200"/>
<img src="/images/android/4.jpeg" alt="android" width="200"/>
<img src="/images/android/5.jpeg" alt="android" width="200"/>
<img src="/images/android/6.jpeg" alt="android" width="200"/>
</p>

#### `ios`

<p align="center">
<img src="/images/ios/0.jpeg" alt="ios" width="200"/>
<img src="/images/ios/1.jpeg" alt="ios" width="200"/>
<img src="/images/ios/2.jpeg" alt="ios" width="200"/>
<img src="/images/ios/3.jpeg" alt="ios" width="200"/>
<img src="/images/ios/4.jpeg" alt="ios" width="200"/>
<img src="/images/ios/5.jpeg" alt="ios" width="200"/>
<img src="/images/ios/6.jpeg" alt="ios" width="200"/>
</p>

#### `apk`

You can download the `apk` file [here](/apk/cocktailer.apk).

### AI Part of the App

The AI recommendation system is powered by a **machine learning server** that analyzes user interactions with the app. Here's how the system works:

1. **Data Collection**: Each time a user "likes" a cocktail, the server logs that interaction.
2. **Model**: The machine learning model on the server processes the user’s cocktail preferences and finds patterns in the type of cocktails the user tends to like.
3. **Recommendations**: The model suggests new cocktails based on the top-liked one, ensuring a personalized experience for every user.

The machine learning server is hosted separately and communicates with the app to deliver these recommendations in real-time. The server base url is: https://cocktailer.onrender.com/graphql

### Stack and Algorithm:

- **Framework**: Flask for server-side logic.
- **Model**: A content-based recommendation system using cosine similarity to match liked cocktails with others in the dataset.
- **Data**: A file database of various cocktails, including ingredients, categories, and preparation methods.

### Cocktailer App - Backend and Frontend Integration

#### GraphQL-Flask Server

The **Cocktailer** app uses a **Flask** backend, serving a **GraphQL API** to handle data interactions efficiently. This architecture allows flexible querying and mutation operations, making it easier to retrieve or modify specific data such as cocktail details, likes, and personalized recommendations.

#### Key Components:

1. **Flask**: A lightweight Python web framework used to serve the GraphQL API.
2. **GraphQL**: A powerful query language that allows the app to request only the data it needs.
3. **Graphene**: A Python library that simplifies the creation of GraphQL APIs in Flask.
4. **Machine Learning Integration**: The Flask server hosts the machine learning model, which processes user preferences to suggest cocktails based on their liked ones.

#### API Functionality:

- **Queries**: Users can query for a list of cocktails, details of specific cocktails, and their liked status.
- **Mutations**: Users can like/unlike a cocktail, which updates the server with their preferences.
- **Machine Learning**: Personalized recommendations are generated based on the user's liked cocktails, providing tailored suggestions using content-based filtering.

#### Benefits:

- **Efficiency**: GraphQL enables the client to fetch only the data required, reducing the amount of unnecessary information transferred between the server and the app.
- **Scalability**: The Flask-GraphQL setup can easily be expanded to include more features such as user data, additional drink categories, or recommendation models.

#### Frontend Integration with [`urql`](https://commerce.nearform.com/open-source/urql/) and [`graphql.tada`](https://gql-tada.0no.co/)

The **Cocktailer** app frontend uses **[`urql`](https://commerce.nearform.com/open-source/urql/)** and **[`graphql.tada`](https://gql-tada.0no.co/)** to interact with the GraphQL API hosted on the Flask server. These tools simplify sending queries and mutations from the frontend to the backend, making the data flow seamless.

#### Key Components:

1. **[`urql`](https://commerce.nearform.com/open-source/urql/)**: A lightweight GraphQL client for handling queries and mutations between the app and the server. It allows efficient data fetching, caching, and subscription to updates.
2. **[`graphql.tada`](https://gql-tada.0no.co/)**: A library that helps in parsing and writing GraphQL queries on the frontend, ensuring smooth communication with the server.

#### How It Works:

- **[`urql`](https://commerce.nearform.com/open-source/urql/)** connects to the Flask-based GraphQL server and sends queries for retrieving data such as the cocktail list, cocktail details, and user preferences.
- **[`graphql.tada`](https://gql-tada.0no.co/)** is used to define queries and mutations in the frontend, such as fetching cocktail data or liking/unliking a cocktail.
- When a user interacts with the app (e.g., liking a cocktail), a **mutation** is sent to the Flask server to update the backend with their preferences.
- The **recommendation system** triggers when fetching personalized cocktail suggestions, which are based on the user’s liked drinks.

#### Benefits:

- **Real-time updates**: [`urql`](https://commerce.nearform.com/open-source/urql/) facilitates efficient data fetching and cache management, ensuring the app gets fresh data when required.
- **Modular design**: Both [`urql`](https://commerce.nearform.com/open-source/urql/) and [`graphql.tada`](https://gql-tada.0no.co/) are lightweight and easy to integrate, making the frontend more maintainable and scalable.

### Notebooks

You can access the notebook for the recommendation algorithm at [01_COCKTAIL_RECOMMANTIONS.ipynb](https://github.com/CrispenGari/recommentation-algorithms/blob/main/00_ML/02_COCKTAIL_RECOMMANTIONS/01_COCKTAIL_RECOMMANTIONS.ipynb)

### License

`Cocktailer` is licensed under the **MIT License**. See the full license below:

```
MIT License

Copyright (c) 2024 crispengari

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```
