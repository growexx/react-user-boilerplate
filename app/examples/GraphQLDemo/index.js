/* eslint-disable react-hooks/rules-of-hooks */
/**
 *
 * GraphQLDemo
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Table } from 'antd';
import { useQuery } from '@apollo/client';
import { TABLE_COLUMNS } from './constants';
import { GET_RATES } from '../../graphql/getRates.query';
const GraphQLDemo = () => {
  const getDataSource = () => {
    const { loading, error, data } = useQuery(GET_RATES);
    const dataArray =
      data &&
      data.rates.map(({ currency, rate, name }, index) => ({
        key: index,
        name,
        currency,
        rate,
      }));
    return {
      loading,
      error,
      data: data && dataArray.slice(0, 20),
    };
  };

  return (
    <div>
      <Helmet>
        <title>GraphQLDemo</title>
        <meta name="description" content="Description of GraphQLDemo" />
      </Helmet>
      <Table
        data-testid="DataTable"
        pagination={false}
        columns={TABLE_COLUMNS}
        dataSource={getDataSource().data}
        loading={getDataSource().loading}
      />
    </div>
  );
};

export default GraphQLDemo;
