import { graphql, type FragmentOf } from "@/graphql";

const ErrorFragment = graphql(`
  fragment ErrorFragment on Error {
    field
    message
  }
`);

export type TError = FragmentOf<typeof ErrorFragment>;

const RecommendationFragment = graphql(`
  fragment RecommendationFragment on Recommendation {
    name
    similarity
  }
`);

export type TRecommendation = FragmentOf<typeof RecommendationFragment>;

const RecommendationResponse = graphql(
  `
    fragment RecommendationResponse on RecommendationResponse {
      error {
        ...TError
      }
      recommendations {
        ...TRecommendation
      }
    }
  `,
  [ErrorFragment, RecommendationFragment]
);

export type TRecommendationResponse = FragmentOf<typeof RecommendationResponse>;
export const RecommendationQuery = graphql(
  `
    query Recommendation($input: RecommendationInput!) {
      recommendation(input: $input) {
        ...TRecommendationResponse
      }
    }
  `,
  [RecommendationResponse]
);
