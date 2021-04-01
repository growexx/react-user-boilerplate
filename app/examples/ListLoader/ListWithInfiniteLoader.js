/* eslint-disable no-plusplus */
/**
 *
 * Demo with List having Infinite Loader.
 *
 */

import React from 'react';
import { List, message, Avatar, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import request from 'utils/request';
import { FormattedMessage } from 'react-intl';
import { API_ENDPOINTS } from 'containers/constant';
import { ListWithInfiniteLoader as StyledList } from './StyledList';
import messages from './messages';

class ListWithInfiniteLoader extends React.Component {
  state = {
    data: [],
    list: [],
    loading: false,
    hasMore: true,
  };

  componentDidMount() {
    this.fetchData(res => {
      this.setState({
        data: res.results,
        list: res.results,
        loading: false,
      });
    });
  }

  fetchData = callback => {
    request(API_ENDPOINTS.LIST, {
      method: 'GET',
    }).then(res => callback(res));
  };

  handleInfiniteOnLoad = () => {
    const { data } = this.state;
    this.setState({
      loading: true,
      list: data.concat(
        [...new Array(3)].map(() => ({ loading: true, name: {} })),
      ),
    });
    if (data.length > 14) {
      message.warning(<FormattedMessage {...messages.listLoaded} />);
      this.setState({
        hasMore: false,
        loading: false,
        list: data,
      });
      return;
    }
    this.fetchData(res => {
      const listData = data.concat(res.results);
      this.setState({
        data: listData,
        list: listData,
        loading: false,
      });
    });
  };

  render() {
    return (
      <StyledList>
        <div className="demo-infinite-container">
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow
          >
            <List
              dataSource={this.state.list}
              renderItem={item => (
                <List.Item key={item.id}>
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                      avatar={<Avatar src={API_ENDPOINTS.LIST_AVATAR} />}
                      title={item.name.last}
                      description={item.email}
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </StyledList>
    );
  }
}

export default ListWithInfiniteLoader;
