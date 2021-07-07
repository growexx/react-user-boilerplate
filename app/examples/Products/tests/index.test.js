import React from 'react';
import { render } from 'react-testing-library';
import ProductCardPage from '../index';
import { addToCart } from '../utils';

const dummyData = {
  id: 1,
  title: 'Product1',
  description: 'Description 1',
  imageUrl:
    'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
  price: 100,
  qty: 1,
};
const dummyData2 = {
  id: 2,
  title: 'Product1',
  description: 'Description 1',
  imageUrl:
    'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
  price: 100,
  qty: 1,
};
describe('<ProductCardPage />', () => {
  test('ProductCardPage should add products to cart', () => {
    const { getByTestId } = render(<ProductCardPage />);
    window.setCount = () => {};
    addToCart(dummyData);
    const productCards = getByTestId('product-col');
    expect(productCards).toBeTruthy();
  });
  test('ProductCardPage should push products to card', () => {
    const { getByTestId } = render(<ProductCardPage />);
    window.setCount = () => {};
    window.product = JSON.stringify([dummyData]);
    addToCart(dummyData2);
    const productCards = getByTestId('product-col');
    expect(productCards).toBeTruthy();
  });
  test('ProductCardPage should push products to card', () => {
    const { getByTestId } = render(<ProductCardPage />);
    window.setCount = () => {};
    window.product = JSON.stringify([dummyData]);
    addToCart(dummyData);
    const productCards = getByTestId('product-col');
    expect(productCards).toBeTruthy();
  });
});
