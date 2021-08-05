import styled from 'styled-components';

export const StyledFeaturePage = styled.div`
  h2 {
    color: @primary-color;
  }
  table {
    margin-bottom: 10px;
    border: 1px solid @primary-color;
    th {
      font-size: @font-size-lg;
      color: @primary-color;
    }
    tr {
      border-bottom: 1px solid @grey;
    }
    td {
      border-right: 1px solid @grey;
      padding: 10px;
    }
  }
`;
