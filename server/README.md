### server

The **Cocktailer** app uses a **Flask** backend, serving a **GraphQL API** to handle data interactions efficiently. The server is hosted at [https://cocktailer.onrender.com/graphql](https://cocktailer.onrender.com/graphql). This architecture allows flexible querying operations, enabling users to retrieve specific data, such as cocktail details and related suggestions, based on a cocktail name.

### Key Components:

1. **Flask**: A lightweight Python web framework used to serve the GraphQL API.
2. **GraphQL**: A query language that allows the app to request only the data it needs, minimizing unnecessary data transfer.
3. **Graphene**: A Python library that simplifies the creation of GraphQL APIs in Flask.
4. **Machine Learning Integration**: The Flask server hosts a machine learning model, which analyzes user preferences and generates cocktail suggestions based on the one selected.

### API Functionality:

- **Queries**: Users can request information about specific cocktails, including related cocktail suggestions. The suggestions are based on the selected cocktail’s name and are generated using a content-based filtering algorithm powered by the machine learning model.

  The API focuses purely on querying data without any mutation operations (i.e., no data is modified by the user directly).

### Hosted Server:

The server is hosted at:

- **URL**: [https://cocktailer.onrender.com/graphql](https://cocktailer.onrender.com/graphql)

This endpoint allows interaction with the server for querying cocktail data and getting related suggestions based on a selected cocktail name.

### Benefits:

- **Efficiency**: GraphQL ensures that the app requests only the required data, optimizing communication between the client and server.
- **Machine Learning Recommendations**: The server processes user-selected cocktails to provide personalized recommendations based on similar ingredients or characteristics.
