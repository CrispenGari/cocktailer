class TestAlgorithm:
    def test_recommendation(self):
        from graphene.test import Client
        from api.schema import Query
        import graphene

        gschema = graphene.Schema(query=Query)
        client = Client(gschema)
        executed = client.execute(
            """
            {
            recommendation(input:{n: 10, name: "Mimosa"}){
                error{
                message
                }
                recommendations{
                name
                }
            }
            }

        """
        )
        recommendations = executed.get("data").get('recommendation').get('recommendations')
        assert len(recommendations) == 9
        assert recommendations[0] ==  {
          "name": "French 75"
        }
        assert executed.get("data").get('recommendation').get('error') is  None

    def test_recommendation_with_error(self):
        from graphene.test import Client
        from api.schema import Query
        import graphene

        gschema = graphene.Schema(query=Query)
        client = Client(gschema)
        executed = client.execute(
            """
            {
            recommendation(input:{n: 10, name: "mimosa"}){
                error{
                message
                }
                recommendations{
                name
                }
            }
            }

        """
        )
        recommendations = executed.get("data").get('recommendation').get('recommendations')
        assert len(recommendations) == 0
        assert executed.get("data").get('recommendation').get('error') ==  {
        "message": "Something went wrong on the server."
      }
        
    def test_recommendation_with_n_5(self):
        from graphene.test import Client
        from api.schema import Query
        import graphene

        gschema = graphene.Schema(query=Query)
        client = Client(gschema)
        executed = client.execute(
            """
            {
            recommendation(input:{n: 5, name: "Mimosa"}){
                error{
                message
                }
                recommendations{
                name
                }
            }
            }

        """
        )
        recommendations = executed.get("data").get('recommendation').get('recommendations')
        assert len(recommendations) == 4
       