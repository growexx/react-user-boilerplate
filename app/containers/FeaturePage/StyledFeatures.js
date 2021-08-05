import styled from 'styled-components';

export const StyledFeaturePage = styled.div`
  height: 620px;
  overflow: hidden;
  div {
    overflow: auto;
    height: calc(100vh - 120px);
    padding: 10px;
  }
  h1 {
    color: @primary-color;
  }
  h2,
  ol {
    display: none;
  }
  table {
    overflow: hidden;
    border: 2px solid @primary-color;
    th {
      font-size: @font-size-lg;
      color: @primary-color;
      display: none;
    }
    tr {
      border-bottom: 2px solid @grey;
    }
    td {
      border-right: 2px solid @grey;
    }
    td {
      padding: 10px;
      font-size: 15px;
    }
  }
`;
