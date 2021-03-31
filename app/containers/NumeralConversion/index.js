/**
 *
 * NumeralConversion
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Input, Table } from 'antd';
import numeral from 'numeral';
import messages from './messages';
import {
  CREATE_COLUMNS,
  FORMAT_COLUMNS,
  NUMBERS_FORMAT,
  CURRENCY_FORMAT,
  BYTES_FORMAT,
  TIME_FORMAT,
  EXPONENTIAL_FORMAT,
  PERCENTAGES_FORMAT,
} from './constants';
const { Search } = Input;
class NumeralConversion extends React.Component {
  state = {
    value: 0,
  };

  render() {
    const createData = () => {
      const rows = [
        {
          key: '1',
          input: this.state.value,
          value: numeral(this.state.value).value(),
        },
      ];
      return rows;
    };
    const numbersData = () => {
      const rows = NUMBERS_FORMAT.map((number, index) => ({
        key: index,
        number: this.state.value,
        format: number,
        string: numeral(this.state.value).format(number),
      }));
      return rows;
    };
    const currencyData = () => {
      const rows = CURRENCY_FORMAT.map((number, index) => ({
        key: index,
        number: this.state.value,
        format: number,
        string: numeral(this.state.value).format(number),
      }));
      return rows;
    };
    const bytesData = () => {
      const rows = BYTES_FORMAT.map((number, index) => ({
        key: index,
        number: this.state.value,
        format: number,
        string: numeral(this.state.value).format(number),
      }));
      return rows;
    };
    const percentagesData = () => {
      const rows = PERCENTAGES_FORMAT.map((number, index) => ({
        key: index,
        number: this.state.value,
        format: number,
        string: numeral(this.state.value).format(number),
      }));
      return rows;
    };
    const timeData = () => {
      const rows = TIME_FORMAT.map((number, index) => ({
        key: index,
        number: this.state.value,
        format: number,
        string: numeral(this.state.value).format(number),
      }));
      return rows;
    };
    const exponentialData = () => {
      const rows = EXPONENTIAL_FORMAT.map((number, index) => ({
        key: index,
        number: this.state.value,
        format: number,
        string: numeral(this.state.value).format(number),
      }));
      return rows;
    };
    const onSearch = value => this.setState({ value });
    return (
      <div>
        <Helmet>
          <title>NumeralConversion</title>
          <meta name="description" content="Description of NumeralConversion" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <Search
          placeholder="Enter number to convert"
          onSearch={onSearch}
          enterButton="GO"
          onChange={event => {
            this.setState({
              value: event.target.value,
            });
          }}
          value={this.state.value}
        />
        <FormattedMessage {...messages.createHeader} />
        <br />
        <FormattedMessage {...messages.createMessage} />
        <Table
          pagination={false}
          columns={CREATE_COLUMNS}
          dataSource={createData()}
        />
        <FormattedMessage {...messages.formatHeader} />
        <br />
        <FormattedMessage {...messages.formatMessage} />
        <br />
        <br />
        <FormattedMessage {...messages.number} />
        <Table
          pagination={false}
          columns={FORMAT_COLUMNS}
          dataSource={numbersData()}
        />
        <br />
        <FormattedMessage {...messages.currency} />
        <Table
          pagination={false}
          columns={FORMAT_COLUMNS}
          dataSource={currencyData()}
        />
        <br />
        <FormattedMessage {...messages.bytes} />
        <Table
          pagination={false}
          columns={FORMAT_COLUMNS}
          dataSource={bytesData()}
        />
        <br />
        <FormattedMessage {...messages.percentages} />
        <Table
          pagination={false}
          columns={FORMAT_COLUMNS}
          dataSource={percentagesData()}
        />
        <br />
        <FormattedMessage {...messages.time} />
        <Table
          pagination={false}
          columns={FORMAT_COLUMNS}
          dataSource={timeData()}
        />
        <br />
        <FormattedMessage {...messages.exponential} />
        <Table
          pagination={false}
          columns={FORMAT_COLUMNS}
          dataSource={exponentialData()}
        />
      </div>
    );
  }
}

export default NumeralConversion;
