/**
 *
 * Demo With LoadMore Button and Skeleton Loader
 *
 */

import React from 'react';
import { List, Avatar, Button, Skeleton } from 'antd';
import request from 'utils/request';
import { API_ENDPOINTS } from 'containers/constant';

const count = 3;

class ListWithLoadMore extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  };

  componentDidMount() {
    this.getData(res => {
      this.setState({
        initLoading: false,
        data: res.results,
        list: res.results,
      });
    });
  }

  getData = callback => {
    request(API_ENDPOINTS.LIST, {
      method: 'GET',
    }).then(res => callback(res));
  };

  onLoadMore = () => {
    const { data } = this.state;
    this.setState({
      loading: true,
      list: data.concat(
        [...new Array(count)].map(() => ({ loading: true, name: {} })),
      ),
    });
    this.getData(res => {
      const listData = data.concat(res.results);
      this.setState(
        {
          data: listData,
          list: listData,
          loading: false,
        },
        () => {
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event('resize'));
        },
      );
    });
  };

  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : null;

    return (
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={item => (
          <List.Item>
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
    );
  }
}
ListWithLoadMore.propTypes = {};

export default ListWithLoadMore;
