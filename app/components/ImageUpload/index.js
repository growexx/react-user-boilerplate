/**
 *
 * ImageUpload
 *
 */

import React from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import 'antd/es/modal/style';
import 'antd/es/slider/style';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

class ImageUpload extends React.Component {
  state = {
    fileList: [
      //   {
      //     uid: '-1',
      //     name: 'image.png',
      //     status: 'done',
      //     url:
      //       'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      //   },
    ],
  };

  onChange = ({ fileList: newFileList }) => {
    this.setState({
      fileList: newFileList,
    });
  };

  onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  render() {
    return (
      <ImgCrop rotate>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={this.state.fileList}
          onChange={this.onChange}
          onPreview={this.onPreview}
          //   className="avatar-uploader"
          maxCount={1}
        >
          {this.state.fileList.length < 5 && '+ Upload'}
        </Upload>
      </ImgCrop>
    );
  }
}

ImageUpload.propTypes = {};

export default ImageUpload;
