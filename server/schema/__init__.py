import graphene
import os
from graphene import ObjectType, String, Schema
from algorithms import Recommender

file_name = os.path.join(os.getcwd(), "files", "cocktails_ingredients.csv")

class Recommendation(ObjectType):
    name = graphene.String(required=True)
    similarity = graphene.Float(required=True)


class Error(ObjectType):
    field = graphene.String(required=True)
    message = graphene.String(required=True)


class RecommendationResponse(ObjectType):
    error = graphene.Field(Error, required=False)
    recommendations = graphene.List(Recommendation, required=True)


class RecommendationInput(graphene.InputObjectType):
    n = graphene.Int(required=False, default_value=11)
    name = graphene.String(required=True)


class Query(ObjectType):
    hello = String(name=String(default_value="world"))
    goodbye = String()
    recommendation = graphene.Field(
        RecommendationResponse, input=graphene.NonNull(RecommendationInput)
    )

    def resolve_hello(root, info, name):
        return f"Hello {name}!"

    def resolve_goodbye(root, info):
        return "See ya!"

    def resolve_recommendation(root, info, input):
        try:
            n = input.get("n")
            name = input.get("name")
            recommender = Recommender(file_name=file_name)
            reco = recommender.get_recommendations_based_on_ingredients(
                name=name, n=n if n else 11
            )
            recommendations = [
                Recommendation(name=name, similarity=similarity)
                for (name, similarity) in reco[1:]
            ]
            return RecommendationResponse(error=None, recommendations=recommendations)
        except Exception:
            return RecommendationResponse(
                error=Error(
                    field="server", message="Something went wrong on the server."
                ),
                recommendations=[],
            )
schema = Schema(query=Query)
