from flask import Flask, redirect
from flask_cors import CORS
from flask_graphql import GraphQLView
from api.schema import schema
app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return redirect('/graphql', code=302)

app.add_url_rule('/graphql', view_func=GraphQLView.as_view(
    'graphql',
    schema=schema,
    graphiql=True,
))

if __name__ == '__main__':
    app.run(port=3001, debug=True)