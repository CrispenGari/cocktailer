

class TestHelloQueries:
    def test_hello(self):
        from graphene.test import Client
        from api.schema import Query
        import graphene

        gschema = graphene.Schema(query=Query)
        client = Client(gschema)
        executed = client.execute("""
            {
            hello(name:"Peorld")
            }
        """)
        assert executed == {"data": {"hello": "Hello Peorld!"}}

    def test_hello_world(self):
        from graphene.test import Client
        from api.schema import Query
        import graphene

        gschema = graphene.Schema(query=Query)
        client = Client(gschema)
        executed = client.execute("""
            {
            hello
            }
        """)
        assert executed == {"data": {"hello": "Hello world!"}}

    def test_goodbye(self):
        from graphene.test import Client
        from api.schema import Query
        import graphene

        gschema = graphene.Schema(query=Query)
        client = Client(gschema)
        executed = client.execute("""
            {
            goodbye
            }
        """)
        assert executed == {"data": {"goodbye": "See ya!"}}
