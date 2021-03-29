/**
 *
 * InfiniteLoader
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Tabs } from 'antd';
import LoadMoreDemo from './LoadMoreDemo';
import ListWithPagination from './ListWithPagination';

function InfiniteLoader() {
  const { TabPane } = Tabs;
  function callback(key) {
    // eslint-disable-next-line no-console
    console.log(key);
  }
  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Load More" key="1">
          <LoadMoreDemo />
        </TabPane>
        <TabPane tab="List With Pagination" key="2">
          <ListWithPagination />
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
}

InfiniteLoader.propTypes = {};

export default InfiniteLoader;
