import React, { useState } from 'react';
import {
  Card,
  Avatar,
  Button,
  Carousel,
  Input,
  Row,
  Col,
  Typography,
  Divider,
} from 'antd';
import {
  ShoppingCartOutlined,
  DollarCircleOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';

const { Meta } = Card;
const { Text, Title } = Typography;

const ProductCard = ({ data, onClick }) => {
  const { id, title, description, imageUrl, price, qty } = data || {};
  const [counter, setCounter] = useState(qty);
  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);

  if (counter <= 1) {
    decrementCounter = () => setCounter(1);
  }

  return (
    <Card
      id={id}
      cover={
        <Carousel dots={false} arrows>
          <img alt={title} src={imageUrl} />

          <img alt={title} src={imageUrl} />

          <img alt={title} src={imageUrl} />

          <img alt={title} src={imageUrl} />
        </Carousel>
      }
      actions={[
        <Button
          block
          size="large"
          type="primary"
          onClick={() =>
            onClick({ ...data, qty: counter, price: counter * data.price })
          }
        >
          <div className="u-d-flex u-justify-content-center u-align-items-center">
            <ShoppingCartOutlined className="u-mr-2 u-font-size-xlg" />
            Add To Cart
          </div>
        </Button>,
      ]}
    >
      <Meta
        avatar={<Avatar src={imageUrl} />}
        title={
          <div className="u-d-flex u-align-items-center u-justify-content-between">
            {title}
            <div className="u-d-flex u-align-items-center">
              <DollarCircleOutlined className="u-mr-1" />
              {price}
            </div>
          </div>
        }
        description={description}
      />

      <Row>
        <Col span={4} />
        <Col span={20}>
          <Divider />
          <div className="u-d-flex u-align-items-center u-mt-4 u-justify-content-between">
            <Text type="secondary">Product Quantity:</Text>
            <div className="u-d-flex u-align-items-center">
              <Button
                type="primary"
                size="small"
                icon={<MinusOutlined />}
                onClick={decrementCounter}
                className="lh-6"
              />
              <Input
                value={counter}
                size="small"
                style={{ width: 35, textAlign: 'center' }}
              />
              <Button
                type="primary"
                onClick={incrementCounter}
                size="small"
                icon={<PlusOutlined />}
                className="lh-6"
              />
            </div>
          </div>
        </Col>
        <Col span={4} className="u-mt-5" />
        <Col span={20} className="u-mt-5 ">
          <div className="u-d-flex u-justify-content-between">
            <Text type="secondary">Total:</Text>
            <Title level={5} className="u-d-flex u-align-items-center u-mt-0">
              <DollarCircleOutlined className="u-mr-1" />
              {price * counter}
            </Title>
          </div>
        </Col>
      </Row>
    </Card>
  );
};
ProductCard.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
};
export default ProductCard;
