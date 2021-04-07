/**
 *
 * FileUpload
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import formattedMessages from './messages';
const { Dragger } = Upload;

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      // eslint-disable-next-line no-console
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(
        <FormattedMessage
          {...formattedMessages.uploadSuccess}
          values={{
            filename: info.file.name,
          }}
        />,
      );
    } else if (status === 'error') {
      message.error(
        <FormattedMessage
          {...formattedMessages.uploadError}
          values={{
            filename: info.file.name,
          }}
        />,
      );
    }
  },
};

function FileUpload() {
  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
    </Dragger>
  );
}

FileUpload.propTypes = {};

export default FileUpload;
