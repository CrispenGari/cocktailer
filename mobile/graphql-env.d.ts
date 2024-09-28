/* eslint-disable */
/* prettier-ignore */

export type introspection_types = {
    'Boolean': unknown;
    'Error': { kind: 'OBJECT'; name: 'Error'; fields: { 'field': { name: 'field'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'message': { name: 'message'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
    'Float': unknown;
    'Int': unknown;
    'Query': { kind: 'OBJECT'; name: 'Query'; fields: { 'goodbye': { name: 'goodbye'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'hello': { name: 'hello'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'recommendation': { name: 'recommendation'; type: { kind: 'OBJECT'; name: 'RecommendationResponse'; ofType: null; } }; }; };
    'Recommendation': { kind: 'OBJECT'; name: 'Recommendation'; fields: { 'name': { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'similarity': { name: 'similarity'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; }; };
    'RecommendationInput': { kind: 'INPUT_OBJECT'; name: 'RecommendationInput'; isOneOf: false; inputFields: [{ name: 'n'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; defaultValue: "11" }, { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }]; };
    'RecommendationResponse': { kind: 'OBJECT'; name: 'RecommendationResponse'; fields: { 'error': { name: 'error'; type: { kind: 'OBJECT'; name: 'Error'; ofType: null; } }; 'recommendations': { name: 'recommendations'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Recommendation'; ofType: null; }; }; } }; }; };
    'String': unknown;
};

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  name: never;
  query: 'Query';
  mutation: never;
  subscription: never;
  types: introspection_types;
};

import * as gqlTada from 'gql.tada';

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}