
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

class Recommender:
    def __init__(self, file_name: str) -> None:
        self.file_name = file_name

    def get_recommendations_based_on_ingredients(self, name: str, n:int = 11)-> list[list]:
        dataframe = pd.read_csv(self.file_name)
        tfidf = TfidfVectorizer(stop_words='english')
        tfidf_matrix = tfidf.fit_transform(dataframe.ingredients)
        cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
        dataframe.drop_duplicates(subset=["cocktail"], inplace=True)
        indices = pd.Series(dataframe.index, index=dataframe['cocktail']).drop_duplicates()
        idx = indices[name]
        sim_scores = list(enumerate(cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[:n]
        sims = [round(float(i[1]), 2) for i in sim_scores]
        recipe_indices = [i[0] for i in sim_scores]
        return list(zip([i for i in dataframe['cocktail'].iloc[recipe_indices]], sims))
