import React from 'react';
import { Row, Col } from 'antd';
import products from './product.json';
import ProductCard from '../../components/ProductCard';
import { addToCart } from './utils';

function ProductCardPage() {
  const onClick = product => {
    addToCart(product);
  };
  return (
    <Row gutter={[40, 40]}>
      {products.products.map(product => (
        <Col key={product.id} span={24} md={12} lg={8}>
          <ProductCard data={product} onClick={onClick} />
        </Col>
      ))}
    </Row>
  );
}

export default ProductCardPage;
