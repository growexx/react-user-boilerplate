import gql from 'graphql-tag';

export const GET_RATES = gql`
  query GetRates {
    rates(currency: "USD") {
      currency
    }
  }
`;
