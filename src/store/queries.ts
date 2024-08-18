import { gql } from 'graphql-request';

export const SEARCH_REPOSITORIES_QUERY = gql`
  query SearchRepositories($query: String!, $after: String, $before: String) {
    search(query: $query, type: REPOSITORY, first: 10, after: $after, before: $before) {
      edges {
        node {
          ... on Repository {
            name
            description
            forkCount
            stargazerCount
            primaryLanguage {
              name
            }
            languages(first: 10) {
              nodes {
                name
              }
            }
            updatedAt
            licenseInfo {
              name
            }
          }
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
